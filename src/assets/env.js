(function (window) {
  window["env"] = window["env"] || {};
  window["env"].production = false;
  window["env"].KAFKA_CONNECT_DOMAIN = 'http://localhost:4200';
  window["env"].CONNECTORS_ENDPOINT = '/connectors';
  window["env"].STATUS_ENDPOINT = '/status';
  window["env"].RESUME_CONNECTOR_ENDPOINT = '/resume';
  window["env"].RESTART_CONNECTOR_ENDPOINT = '/restart';
  window["env"].PAUSE_CONNECTOR_ENDPOINT = '/pause';
  window["env"].TASK_ENDPOINT = '/tasks';
  window["env"].CONFIG_ENDPOINT = '/config';
  window["env"].CONNECTOR_PLUGIN= '/connector-plugins/';
  window["env"].VALIDATE_ENDPOINT= '/config/validate';
})(this);



