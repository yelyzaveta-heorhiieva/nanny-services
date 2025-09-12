import { NannieCardInterface, OptionType } from "../pages/NanniesPage";

export const optionSwitch = (selectedOption: OptionType | null, data: NannieCardInterface[]) => {
  switch (selectedOption?.value) {
    case 'alphabetAsc':
      return data.toSorted((a, b) => a.name.toLowerCase().localeCompare(b.name.toLocaleLowerCase()));
    case 'alphabetDesc':
            return data.toSorted((a, b) =>
              b.name.toLowerCase().localeCompare(a.name.toLocaleLowerCase()),
            );
    case 'priceLess17':
      return data.filter(item=>item.price_per_hour < 17)
    case 'priceMore17':
       return data.filter((item) => item.price_per_hour >= 17);
    case 'popularityDesc':
       return data.toSorted((a, b) => b.rating - a.rating);
    case 'popularityAsc':
       return data.toSorted((a, b) => a.rating - b.rating );
    case 'all':
       return data.toSorted((a, b) =>
         a.id.toLowerCase().localeCompare(b.id.toLocaleLowerCase()),
       );
    default:
       return data.toSorted((a, b) =>
         a.id.toLowerCase().localeCompare(b.id.toLocaleLowerCase()),
       );
  }
};