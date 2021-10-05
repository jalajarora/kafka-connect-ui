import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class KafkaConnectorsListService {
  constructor(
    private http: HttpClient
  ) { }

  public listKafkaConnector() {
    return this.http.get( environment.KAFKA_CONNECT_DOMAIN +  environment.CONNECTORS_ENDPOINT,{
      responseType: 'json',
    })
  }

  public getKafkaConnectorStatus(connectorName: string) {
    return this.http.get(environment.KAFKA_CONNECT_DOMAIN + environment.CONNECTORS_ENDPOINT + "/" + connectorName + environment.STATUS_ENDPOINT)
  }

  public resumeConnector(connectorName: string) {
    return this.http.put(environment.KAFKA_CONNECT_DOMAIN + environment.CONNECTORS_ENDPOINT + "/" + connectorName + environment.RESUME_CONNECTOR_ENDPOINT,null, {
      responseType: 'json',
      observe: 'response'
    })

  }

  public restartConnector(connectorName: string) {
    return this.http.post(environment.KAFKA_CONNECT_DOMAIN + environment.CONNECTORS_ENDPOINT + "/" + connectorName + environment.RESTART_CONNECTOR_ENDPOINT,null, {
      responseType: 'json',
      observe: 'response'
    })
  }

  public pauseConnector(connectorName: string) {
    return this.http.put(environment.KAFKA_CONNECT_DOMAIN + environment.CONNECTORS_ENDPOINT + "/" + connectorName + environment.PAUSE_CONNECTOR_ENDPOINT,null,{
      responseType: 'json',
      observe: 'response'
    })
  }

  public deleteConnector(connectorName: string) {
    return this.http.delete(environment.KAFKA_CONNECT_DOMAIN + environment.CONNECTORS_ENDPOINT + "/" + connectorName, {
      responseType: 'json',
      observe: 'response'
    })
  }
}
