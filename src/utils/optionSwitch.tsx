import { OptionType } from "../pages/NanniesPage";

export const optionSwitch = (selectedOption: OptionType) => {
  switch (selectedOption?.value) {
    case 'fromAtoZ':
      return { orderBy: 'name', order: 'inc' };
    case 'fromZtoA':
      return { orderBy: 'name', order: 'desc' };
    case 'all':
      return { orderBy: 'id', order: 'inc' };
    case 'popular':
      return { orderBy: 'rating', order: 'desc' };
    case 'notPopular':
      return { orderBy: 'rating', order: 'inc' };
    case 'lessPrice':
      return { orderBy: 'price_per_hour', order: 'inc', endAt: 17 };
    case 'greaterPrice':
      return { orderBy: 'price_per_hour', order: 'inc', startAt: 18 };
    default:
      return { orderBy: 'id', order: 'inc' };
  }
};