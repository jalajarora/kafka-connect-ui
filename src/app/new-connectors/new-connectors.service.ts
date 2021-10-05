import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewConnectorsService {

  constructor(
    private http: HttpClient,
  ) { }

  public getHeaders = () => {
    return {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    }
  }

  public validateConfig(className: string, configuration: any){
    return this.http.put(environment.KAFKA_CONNECT_DOMAIN + environment.CONNECTOR_PLUGIN + className + environment.VALIDATE_ENDPOINT, configuration,{
      responseType: 'json',
      observe: 'response'
    })
  }

  public postNewConnector(connector){
    return this.http.post(environment.KAFKA_CONNECT_DOMAIN + environment.CONNECTORS_ENDPOINT, connector,{
          responseType: 'json',
          headers: this.getHeaders(),
          observe: 'response'})
  }

  // TODO: May be we need this in future to implement new connectors dynamically.
  // public getConnectorPlugins () {
  //   return this.http.get(environment.KAFKA_CONNECT_DOMAIN + "/connector-plugins/",{
  //     responseType: 'json',
  //     observe: 'response'})
  // }
}
