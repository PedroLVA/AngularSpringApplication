export interface IProduct {
    id: string;
    name: string;
    price_in_cents: number;
    description: string;
    active: boolean;
    category: string;
    createdAt: Date
}
