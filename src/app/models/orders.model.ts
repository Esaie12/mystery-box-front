export interface OrderTracking {
  id:number,
  reference: string;
  /*category: string;
  status: string;
  date_ordered: string;
  delivery_date: string;
  recipient_address: string;
  amount: number;
  history?: { step: string; date: string; note: string }[];*/
}

export interface OrdersResponse {
  orders: Order[];
}

export interface Order {
  id: number;
  reference: string;

  // Recipient info
  recipient_name: string;
  recipient_sex: 'Femme' | 'Homme' | 'Autre';
  phone: string;
  address: string;

  // Message
  message?: string | null;
  anonymous: boolean;

  // Delivery
  delivery_date: string;
  delivery_instructions?: string | null;

  // Relations
  category_id?: number | null;
  category: {
    id: number;
    title: string;
    icon: string;
  };
  amount: number;

  // Items liés avec produit
  items?: {
    id: number; 
    quantity: number;
    product: {
      id: number;
      name: string;
      icon?: string | null;
      category_id?: number | null;
      price?: number;
    };
  }[];

  status: {
    id: number;
    title: string;    // ex: "En livraison"
    emoji: string;   // ex: "🚚"
    message: string; // ex: "Votre commande est en cours de livraison"
  };

  created_at: string;
  updated_at: string;
}

export interface OrderStatusStat {
  status: string;
  emoji: string;
  count: number;
}

export interface OrdersStatsResponse {
  total_orders: number;
  orders_by_status: OrderStatusStat[];
  revenue: number;
}

export interface AdminOrder {
  id: number;
  reference: string;
  amount: number;
  created_at: string;

  recipient_name: string;
  recipient_sex: 'Femme' | 'Homme' | 'Autre';
  phone: string;
  address: string;

  // Message
  message?: string | null;
  anonymous: boolean;

  // Delivery
  delivery_date: string;
  delivery_instructions?: string | null;

  user?: {
    id: number;
    name: string;
    phone?:string
  };
 
  category: {
    id: number;
    title: string;
    icon: string;
  };

  status: {
    id: number;
    title: string;
    emoji: string;
  };
}

export interface AdminOrdersListResponse {
  orders: Order[];
}

