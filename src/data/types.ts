export type List = {
  [key: string]: ListCategory;
};

// A category in a list can be an object, with keys being subcategories
export type ListCategory = {
  // groupName NOT optional when list is complete
  groupName?: string;
  specific?: string[];
  subcategories?: List;
};