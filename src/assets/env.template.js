(function (window) {
  window["env"] = window["env"] || {};
  window["env"].production = "${production}";
  window["env"].KAFKA_CONNECT_DOMAIN = "${KAFKA_CONNECT_DOMAIN}";
  window["env"].CONNECTORS_ENDPOINT = "${CONNECTORS_ENDPOINT}";
  window["env"].STATUS_ENDPOINT = "${STATUS_ENDPOINT}";
  window["env"].RESUME_CONNECTOR_ENDPOINT = "${RESUME_CONNECTOR_ENDPOINT}";
  window["env"].RESTART_CONNECTOR_ENDPOINT = "${RESTART_CONNECTOR_ENDPOINT}";
  window["env"].PAUSE_CONNECTOR_ENDPOINT = "${PAUSE_CONNECTOR_ENDPOINT}";
  window["env"].TASK_ENDPOINT = "${TASK_ENDPOINT}";
  window["env"].CONFIG_ENDPOINT = "${CONFIG_ENDPOINT}";
  window["env"].CONNECTOR_PLUGIN= "${CONNECTOR_PLUGIN}";
  window["env"].VALIDATE_ENDPOINT= "${VALIDATE_ENDPOINT}";
})(this);

