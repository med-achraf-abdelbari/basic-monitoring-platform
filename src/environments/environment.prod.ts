export const environment = {
  production: true,
  configUrl: 'assets/config/globalSettings.json',
  defaultPingDelayTime: 30,
  sendSms: true,
  sendEmail: true,
  destinationEmail: 'med.achraf.abdelbari@gmail.com',
  destinationPhone: 7451279340,
  smsServiceConfig: {
    providerUrl: 'https://ws.textanywhere.net/HTTPRX/SendSMSEx.aspx',
    params: {
      Client_ID: 'RU049555',
      Client_Pass: 'gfcpass',
      Client_Ref: '1118305343072',
      Billing_Ref: 'iceland',
      Connection: '2',
      Originator: 'Monitoring platform',
      OType: '1',
      DestinationEx: '7451279340',
      SMS_Type: '0',
      Body: '',
      Reply_Type: ''
    },
    port: 80
  },
  emailServiceConfig: {}
};
