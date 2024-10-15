import { IProduct } from "./IProduct";

export interface IPagination{
currentPage: number;
  totalPages: number;
  totalElements: number;
  content: IProduct[];
  last: boolean;
}