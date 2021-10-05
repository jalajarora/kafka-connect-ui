import {AfterViewInit, Component, OnInit} from '@angular/core';
import {KafkaConnectorsListService} from "../kafka-connectors-list/kafka-connectors-list.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  public connCount: any;
  public pausedConnector = [];
  public failedConnector = [];
  public failedTasks = [];
  public pausedTasks = [];
  public pausedConnectorCount: number = 0;
  public failedConnectorCount: number = 0;
  public pausedTasksCount: number = 0;
  public failedTasksCount: number = 0;
  public spinner = false;

  constructor(
    private kafka: KafkaConnectorsListService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.connectorsCount();
    this.spinner = false;
  }

  ngAfterViewInit() {
  }

  connectorsCount() {
    let connectors = [];
    this.failedConnector = [];
    this.pausedConnector = [];
    this.kafka.listKafkaConnector().subscribe((resp: any[]) => {
      this.connCount = resp.length;
      for (let connector of resp) {
        this.kafka.getKafkaConnectorStatus(connector).subscribe((connectorDetails: any) => {
          connectors.push(connectorDetails);
          if (connectorDetails.connector.state === "PAUSED") {
              this.pausedConnector.push(connectorDetails.name);
              this.pausedConnectorCount = this.pausedConnector.length;
          }

          if(connectorDetails.connector.state === "FAILED") {
                this.failedConnector.push(connectorDetails.name);
                this.failedConnectorCount = this.failedConnector.length;
          }

          // tasks
          connectorDetails.tasks.forEach((element) =>{
            if(element.state === "PAUSED") {
              this.pausedTasks.push({'id': element.id, 'name': connectorDetails.name});
              this.pausedTasksCount = this.pausedTasks.length;
            }
            if(element.state === "FAILED") {
              this.failedTasks.push({'id': element.id, 'name': connectorDetails.name});
              this.failedTasksCount = this.failedTasks.length;
            }
          })
          if(connectors.length == resp.length){
            this.spinner = true;
          }
        });
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
