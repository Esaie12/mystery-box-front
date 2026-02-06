//Similaire au backend, mais avec des types optionnels pour les champs qui peuvent être absents ou nulls
export interface Product {
  id: number;
  name: string;
  icon?: string | null;
  compatible?: string | null;

  category?: {
    id: number;
    title: string;
    subtitle?: string | null;
    description?: string | null;
    price?: number | null;
    color?: string | null;
    icon?: string | null;
  };
}
