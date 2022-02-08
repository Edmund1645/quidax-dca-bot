import dotenv from 'dotenv';
dotenv.config();
import colors from 'colors';
import cron from 'node-schedule';
import cronstrue from 'cronstrue';

import config from './config';
import QuidaxService from './src/services/Quidax';
import MailgunService from './src/services/Mailgun';

import { IOrder } from './src/@types/Order';

const mailer = new MailgunService(config.mailgun_scret, config.mailgun_domain);

async function placeOrder(order: IOrder) {
  try {
    const { data: response } = await QuidaxService.instantBuy(order.asset, order.currency, order.amount, order.quantity);

    const { data: confirmation } = await QuidaxService.confirmInstandBuy(response.data.id);

    if (confirmation.status === 'success') {
      await mailer.notify(
        config.notifications.to,
        config.notifications.from,
        `Order for ${order.asset}/${order.currency} was completed`,
        JSON.stringify(confirmation.data, undefined, 2)
      );
    }
  } catch (error: any) {
    await mailer.notify(
      config.notifications.to,
      config.notifications.from,
      `Order for ${order.asset}/${order.currency} failed`,
      JSON.stringify(error?.response?.data as string, undefined, 2)
    );
    console.log('could not place order'.red, error.response?.data);
  }
}

async function runBot() {
  console.log(colors.magenta('Starting Bot'));

  for (const order of config.orders) {
    const { asset, currency, amount, quantity, schedule } = order;

    if (amount && quantity) {
      throw new Error('Error: You cannot supply both amount and quantity, you have to pick one... check the docs for the difference');
    }

    if (amount) {
      console.log(
        colors.yellow(`Setting up CRON to buy ${amount} ${currency} worth of ${asset} ${schedule ? cronstrue.toString(schedule, { verbose: true }) : 'Immediately'}`)
      );
    } else {
      console.log(
        colors.yellow(`Setting up CRON to buy ${quantity} ${asset} with ${currency} ${schedule ? cronstrue.toString(schedule, { verbose: true }) : 'Immediately'}`)
      );
    }

    if (!schedule) {
      console.log('no schedule yet');
      await placeOrder(order);
    } else {
      cron.scheduleJob(schedule, async () => await placeOrder(order));
    }
  }
}

runBot();
