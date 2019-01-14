// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8000',
  auth0: {
    clientID: 'kC8r2l8yfy398pJuDuAXBudEWe3l7Hlt',
    domain: 'knoweak.auth0.com',
    redirectPath: '/auth-callback',
    audience: 'knoweak-api-localhost'
  }
};
