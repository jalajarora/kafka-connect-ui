import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class KafkaConnectorsTaskService {

  constructor(
    private http: HttpClient,
  ) { }

  public restartTask(connectorName: string, taskId: number) {
    return this.http.post(environment.KAFKA_CONNECT_DOMAIN + environment.CONNECTORS_ENDPOINT + "/" + connectorName + environment.TASK_ENDPOINT + "/" + taskId + environment.RESTART_CONNECTOR_ENDPOINT,null, {
      responseType: 'json',
      observe: 'response'
    })
  }
}
