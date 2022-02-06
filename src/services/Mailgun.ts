import MailgunJs from 'mailgun.js';
import Client from 'mailgun.js/dist/lib/client';
import formData from 'form-data';
import colors from 'colors';

class MailgunService {
  secret: string;
  domain: string;
  mg: Client;

  constructor(secret: string, domain: string) {
    this.secret = secret;
    this.domain = domain;
    const mailgun = new MailgunJs(formData);
    this.mg = mailgun.client({ username: 'api', key: secret });
  }

  async notify(to: string, from: string, subject: string, message: string) {
    if (this.secret && this.domain) {
      try {
        await this.mg.messages.create(this.domain, {
          to,
          from,
          subject,
          text: message,
        });
      } catch (error) {
        console.log(colors.bgMagenta.white('Failed to send notification email. \n \n'));
        console.log(colors.bgRed.white(JSON.stringify(error)));
      }
    }
  }
}

export default MailgunService;
