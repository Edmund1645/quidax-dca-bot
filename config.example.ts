const config = {
  quidax_secret: process.env.QUIDAX_API_SECRET as string, // required
  mailgun_scret: process.env.MAILGUN_SECRET as string, // optional, if not provided, mailgun will not be used to send notifications
  mailgun_domain: process.env.MAILGUN_DOMAIN as string,
  notifications: {
    from: '',
    to: '',
  },
  orders: [
    {
      asset: 'eth', // what to buy, accepted: btc, ltc, eth, xrp, usdt, dash
      currency: 'ngn', // what to buy with, accepted: ngn, usdt, ghs
      amount: '500', // buy 500 ngn worth of eth
      schedule: '', // buy immediately
    },
    {
      asset: 'btc',
      currency: 'usdt',
      quantity: '0.0001', // buy 0.0001 btc with usdt
      schedule: '00 11 * * *', // buy at 11am every day
    },
  ],
};

export default config;
