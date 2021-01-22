// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  configUrl: 'assets/config/globalSettings.json',
  defaultPingDelayTime: 180,
  sendSms: true,
  sendEmail: true,
  destinationEmail: 'med.achraf.abdelbari@gmail.com',
  smsServiceConfig: {
    providerUrl: 'https://ws.textanywhere.net/HTTPRX/SendSMSEx.aspx',
    params: {
      Client_ID: 'RU049555',
      Client_Pass: 'gfcpass',
      Client_Ref: '1118305343072',
      Billing_Ref: 'iceland',
      Connection: '2',
      Originator: 'Monitoring-platform',
      OType: '1',
      DestinationEx: '07541641955',
      SMS_Type: '0',
      Reply_Type: '0'
    },
    port: 80
  },
  emailServiceConfig: {}
};
