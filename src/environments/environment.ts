// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  KAFKA_CONNECT_DOMAIN : '',
  CONNECTORS_ENDPOINT : '/connectors',
  STATUS_ENDPOINT : '/status',
  RESUME_CONNECTOR_ENDPOINT : '/resume',
  RESTART_CONNECTOR_ENDPOINT : '/restart',
  PAUSE_CONNECTOR_ENDPOINT : '/pause',
  TASK_ENDPOINT : '/tasks',
  CONFIG_ENDPOINT : '/config',
  CONNECTOR_PLUGIN: '/connector-plugins/',
  VALIDATE_ENDPOINT: '/config/validate'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
