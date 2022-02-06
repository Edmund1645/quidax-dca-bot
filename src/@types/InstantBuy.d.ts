export interface IInstantBuyResponse {
  status: string;
  message: string;
  data: {
    id: string;
    reference: null;
    market: {
      id: string;
      base_unit: string;
      quote_unit: string;
    };
    side: string;
    price: {
      unit: string;
      amount: string;
    };
    volume: {
      unit: string;
      amount: string;
    };
    total: {
      unit: string;
      amount: string;
    };
    fee: {
      unit: string;
      amount: string;
    };
    receive: {
      unit: string;
      amount: string;
    };
    status: string;
    created_at: string;
    updated_at: string;
    user: {
      id: string;
      sn: string;
      email: string;
      reference: string | null;
      first_name: string;
      last_name: string;
      display_name: string;
      created_at: string;
      updated_at: string;
    };
  };
}
