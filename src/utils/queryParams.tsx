import { endAt, orderByChild, query, ref, startAt } from "firebase/database";
import { Params } from "../pages/NanniesPage";
import { db } from "../../firebase";

export const nanniesRef = ref(db, 'nannies');

export const queryParams = (params: Params) => {
    let q;
    if (params.startAt !== undefined && params.endAt !== undefined) {
      q = query(
        nanniesRef,
        orderByChild(params.orderBy),
        startAt(params.startAt),
        endAt(params.endAt),
      );
    } else if (params.startAt !== undefined) {
      q = query(
        nanniesRef,
        orderByChild(params.orderBy),
        startAt(params.startAt),
      );
    } else if (params.endAt !== undefined) {
      q = query(nanniesRef, orderByChild(params.orderBy), endAt(params.endAt));
    } else {
      q = query(nanniesRef, orderByChild(params.orderBy));
    }

    return q;
};