import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditViewKafkaConnectorConfigService {
  constructor(
    private http: HttpClient,
  ) { }


  public getConnectorInfo(connectorName: string) {
    return this.http.get( environment.KAFKA_CONNECT_DOMAIN +  environment.CONNECTORS_ENDPOINT + "/" + connectorName,{
      responseType: 'json',
    })
  }


  public updateConnectorConfig(connectorName: string, configuration: any) {
    return this.http.put(environment.KAFKA_CONNECT_DOMAIN +
      environment.CONNECTORS_ENDPOINT + "/" +
      connectorName + environment.CONFIG_ENDPOINT, configuration,{
      responseType: 'json',
      observe: 'response'
    })
  }
}
