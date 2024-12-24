export interface SubCategory {
  id: number;
  parent_id: number;
  name: string;
  type: string;
}

export interface Category {
  id: number;
  name: string;
  type: string;
  categories: SubCategory[];
}
