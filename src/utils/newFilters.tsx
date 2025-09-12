import {
  getDatabase,
  ref,
  query,
  orderByChild,
  startAt,
  endAt,
  limitToFirst,
  limitToLast,
  get,
} from 'firebase/database';


export type Cursor = { value: any; key: string } | null;

const EPS = 1e-9; 

export async function getPage(
  path: string, 
  filter: string,
  cursor: Cursor = null, 
    pageSize = 3,
  favorites: string[] | null = null
) {
  const db = getDatabase();
  const baseRef = ref(db, path);

  let field: string;
  let dir: 'asc' | 'desc';

  let lowerBound: number | undefined = undefined;
  let upperBound: number | undefined = undefined;

  switch (filter) {
    case 'alphabetAsc':
      field = 'name';
      dir = 'asc';
      break;
    case 'alphabetDesc':
      field = 'name';
      dir = 'desc';
      break;
    case 'priceMore17':
      field = 'price_per_hour';
      dir = 'asc';
      lowerBound = 17;
      break; 
    case 'priceLess17':
      field = 'price_per_hour';
      dir = 'desc';
      upperBound = 17 - EPS;
      break; 
    case 'popularityAsc':
      field = 'rating';
      dir = 'asc';
      break;
    case 'popularityDesc':
      field = 'rating';
      dir = 'desc';
      break;
    case 'all':
      field = 'id';
      dir = 'asc';
      break;
    default:
      throw new Error('Unknown filter');
  }

  const constraints: any[] = [orderByChild(field)];

  if (dir === 'asc') {
    if (cursor) {
      constraints.push(startAt(cursor.value, cursor.key));
      constraints.push(limitToFirst(pageSize + 1));
    } else if (lowerBound !== undefined) {
      constraints.push(startAt(lowerBound));
      constraints.push(limitToFirst(pageSize));
    } else if (upperBound !== undefined) {
      constraints.push(endAt(upperBound));
      constraints.push(limitToFirst(pageSize));
    } else {
      constraints.push(limitToFirst(pageSize));
    }

    const q = query(baseRef, ...constraints);
    const snap = await get(q);

    const items: any[] = [];
    snap.forEach((child) => {
      items.push({ id: child.key as string, ...(child.val() as object) });
    });

    const itemsAfter = cursor ? items.slice(1) : items;
    const result = itemsAfter.slice(0, pageSize); 

    const last = result[result.length - 1] ?? null;
    const nextCursor: Cursor = last
      ? { value: (last as any)[field], key: last.id }
      : null;
      const hasMore = result.length === pageSize;
    return { items: result, nextCursor, hasMore };
  } else {
    if (cursor) {
      constraints.push(endAt(cursor.value, cursor.key));
      constraints.push(limitToLast(pageSize + 1));
    } else if (upperBound !== undefined) {
      constraints.push(endAt(upperBound));
      constraints.push(limitToLast(pageSize));
    } else {
      constraints.push(limitToLast(pageSize));
    }

    const q = query(baseRef, ...constraints);
    const snap = await get(q);

    const ascItems: any[] = [];
    snap.forEach((child) => {
      ascItems.push({ id: child.key as string, ...(child.val() as object) });
    });

    if (cursor) ascItems.pop();

    const descItems = ascItems.reverse().slice(0, pageSize);

    const last = descItems[descItems.length - 1] ?? null;
    const nextCursor: Cursor = last
      ? { value: (last as any)[field], key: last.id }
      : null;
    const hasMore = descItems.length === pageSize;

    return { items: descItems, nextCursor, hasMore };
  }
}
