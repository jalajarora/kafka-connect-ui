// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: window["env"].production,
  KAFKA_CONNECT_DOMAIN : window["env"].KAFKA_CONNECT_DOMAIN,
  CONNECTORS_ENDPOINT : window["env"].CONNECTORS_ENDPOINT,
  STATUS_ENDPOINT : window["env"].STATUS_ENDPOINT,
  RESUME_CONNECTOR_ENDPOINT : window["env"].RESUME_CONNECTOR_ENDPOINT,
  RESTART_CONNECTOR_ENDPOINT : window["env"].RESTART_CONNECTOR_ENDPOINT,
  PAUSE_CONNECTOR_ENDPOINT : window["env"].PAUSE_CONNECTOR_ENDPOINT,
  TASK_ENDPOINT : window["env"].TASK_ENDPOINT,
  CONFIG_ENDPOINT : window["env"].CONFIG_ENDPOINT,
  CONNECTOR_PLUGIN: window["env"].CONNECTOR_PLUGIN,
  VALIDATE_ENDPOINT: window["env"].VALIDATE_ENDPOINT
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
