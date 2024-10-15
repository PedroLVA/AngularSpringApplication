export interface IProduct {
    id: string;
    name: string;
    price_in_cents: number;
    description: string;
    category: string;
    active: boolean;
    createdAt: Date
}
