export interface Category {
    id: number;          // obligatoire
    title: string;
    subtitle?: string;
    description?: string;
    mystery?: string;
    icon?: string;
    color: string;
    price?: number;
    products: { icon: string; name: string }[];
}
