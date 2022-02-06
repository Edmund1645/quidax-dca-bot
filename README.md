
# Quidax DCA bot

This bot automatically buys crypto on your behalf on [Quidax](https://quidax.com) using their API while you sit back, relax and enjoy a cold one.

![Schreenshot](./screenshot.png)


## What you need
- A Quidax account and your API secret key, get your secret key from **Account Settings > Developer Settings**.
- A Mailgun account ready with your domain & it's secret - *optional* 
## Features

- Scheduling
- Email notifications
- Out of the box support for Heroku deployment



## Usage/Examples

To use this bot, here are the steps you need to take:

- Clone the repo to your machine
    ```bash
    git clone https://github.com/Edmund1645/quidax-dca-bot && cd quidax-dca-bot
    ```
- Install the dependencies using yarn (sorry NPM lovers 🥲 )
    ```bash
    yarn
    ```
- Duplicate the `config.example.ts` and rename the duplicate to `config.ts`. 

    ```bash
    cp config.example.ts config.ts
    ```
    Use [crontab.guru](https://crontab.guru/) to visualize your `order` schedule.
- Deploy to your preferred cloud provider. YGMI 🎉


