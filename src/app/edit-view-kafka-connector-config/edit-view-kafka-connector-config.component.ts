import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {EditViewKafkaConnectorConfigService} from './edit-view-kafka-connector-config.service'
import {MatSnackBar} from "@angular/material/snack-bar";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-edit-view-kafka-connector-config',
  templateUrl: './edit-view-kafka-connector-config.component.html',
  styleUrls: ['./edit-view-kafka-connector-config.component.css']
})



export class EditViewKafkaConnectorConfigComponent implements OnInit {
  public finalConnectorName: string;
  public ConnectorConfig: any;
  public curl: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private connectorConfig: EditViewKafkaConnectorConfigService,
    private _snackBar: MatSnackBar,
  ) {
  }


  ngOnInit(): void {
    this.getConnectorConfig(this.data.connectorName);
    this.finalConnectorName = this.data.connectorName;
  }

  getConnectorConfig(connectorName: string) {
    this.connectorConfig.getConnectorInfo(connectorName).subscribe((info: any) => {
      this.ConnectorConfig = info.config;
      this.createCurlCommand(this.ConnectorConfig);
    });
  }

  updateConfig(connectorName: string, config:any){
    let configuration = JSON.parse(config.value);
    this.connectorConfig.updateConnectorConfig(connectorName,configuration).subscribe((resp:any)=>{
      if(resp.status == 200){
        this.openSnackBar("The connector configuration is updated","OK");
      } else {
        this.openSnackBar('Oops, something went wrong', 'OK');
      }
    })
  }

  createCurlCommand(connectConfig: any){
    let curlCommand = `curl -X PUT \\` + "\n" + environment.KAFKA_CONNECT_DOMAIN +
      environment.CONNECTORS_ENDPOINT + "/" +
      this.finalConnectorName + environment.CONFIG_ENDPOINT + " \\" + "\n" + "-H 'Content-Type: application/json' \\" + "\n" + "-H 'Accept: application/json' \\"
    curlCommand = curlCommand + "\n" + "-d '" + "\n" +  JSON.stringify(connectConfig) + "'" + "\n";
    this.curl=curlCommand;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
