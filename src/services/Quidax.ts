import formData from 'form-data';

import { QuidaxAPI } from '../lib/axios';
import { IInstantBuyResponse } from '../@types/InstantBuy';

class QuidaxService {
  static instantBuy(asset: string, currency: string, amount?: string, quantity?: string) {
    const form = new formData();
    form.append('bid', currency.toLowerCase());
    form.append('ask', asset.toLowerCase());
    form.append('type', 'buy');

    // e.g buy NGN 20000 worth of BTC, with NGN
    if (amount) {
      form.append('total', amount);
      form.append('unit', currency.toLowerCase());
    }

    // e.g buy 1 BTC, with NGN
    if (quantity) {
      form.append('total', quantity);
      form.append('unit', asset.toLowerCase());
    }

    return QuidaxAPI.post<IInstantBuyResponse>('/users/me/instant_orders', form, {
      headers: {
        ...form.getHeaders(),
      },
    });
  }

  static async confirmInstandBuy(orderId: string) {
    return QuidaxAPI.post<IInstantBuyResponse>(`/users/me/instant_orders/${orderId}/confirm`);
  }
}
export default QuidaxService;
