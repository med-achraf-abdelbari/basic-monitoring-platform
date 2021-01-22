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
  destinationPhone: 7451279340,
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
  emailServiceConfig: {},

  /**
   * Services default list
   */

  services: [
    {
      'name': 'Multi LLC',
      'url': 'https://goprime.monika.com/prime',
      'activeStatusCode': 200
    },
    {
      'name': 'Multi PTY',
      'url': 'https://ozmulti.monika.com/prime',
      'activeStatusCode': 200
    },
    {
      'name': 'Multi UK',
      'url': 'https://connect.monika.com/prime',
      'activeStatusCode': 200
    },
    {
      'name': 'Capital Hospitality',
      'url': 'https://caphosp.monika.com/monika',
      'activeStatusCode': 200
    },
    {
      'name': 'Compass24',
      'url': 'https://compass24.monika.com/monika',
      'activeStatusCode': 200
    },
    {
      'name': 'Facebook Sydney',
      'url': 'https://fb.monika.com/monika',
      'activeStatusCode': 200
    },
    {
      'name': 'Hilton Garden Inn Tabuk',
      'url': 'https://ht.monika.com/monika',
      'activeStatusCode': 200
    },
    {
      'name': 'IKEA',
      'url': 'https://ikea.monika.com/monika',
      'activeStatusCode': 200
    },
    {
      'name': 'Iceland',
      'url': 'https://cloud.monika.com/iceland',
      'activeStatusCode': 200
    },
    {
      'name': 'Meraas',
      'url': 'https://meraas.monika.com/monika',
      'activeStatusCode': 200
    },
    {
      'name': 'SECAmb',
      'url': 'https://secamb.monika.com/monika',
      'activeStatusCode': 200
    },
    {
      'name': 'Southport and Ormskirk',
      'url': 'https://southorms.monika.com/monika',
      'activeStatusCode': 200
    },
    {
      'name': 'The Range',
      'url': 'https://web.monika.com/therange',
      'activeStatusCode': 200
    },
    {
      'name': 'Test Api',
      'url': 'https://dummyapi.io/explorer',
      'activeStatusCode': 200
    }
  ]
};
