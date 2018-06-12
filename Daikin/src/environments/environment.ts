// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiEndpoint: 'http://192.168.10.192:1050/EDBWebService.asmx/',
  appLanguage: 'TH',
  appIdle: { idle: 60, timeout: 5 ,ping:120},
  imageProfileLink: 'http://192.168.211.8/picture/'
};
