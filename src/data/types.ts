type List = {
  [key: string]: ListCategory;
};

// A category in a list can be an object, with keys being subcategories
type ListCategory = {
  groupName: string;
  specific?: string[];
  subcategory?: List;
};