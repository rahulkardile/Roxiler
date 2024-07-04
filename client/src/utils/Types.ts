export interface Product {
    _id: string;
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    sold: boolean;
    dateOfSale: string;
    __v: number;
  }