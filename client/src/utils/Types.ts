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

 export interface StatisticsInterface {
    totalItems: number;
    totalSales: number;
    totalNotSold: number;
  }

 export interface ApiResponseStatistics {
    data: StatisticsInterface;
    success: boolean;
  }