interface Raiting {
   rate: number;
   count: number;
}

export interface Product {
   id: number;
   title: string;
   price: number;
   description: string;
   category: string;
   image: string;
   rating: Raiting;
}

export interface CategoryFilter {
   id: string;
   name: string;
}
