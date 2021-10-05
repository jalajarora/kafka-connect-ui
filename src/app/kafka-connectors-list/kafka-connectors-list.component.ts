import {AfterViewInit, Component, OnInit, Pipe, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {KafkaConnectorsListService} from "./kafka-connectors-list.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import {MatSnackBar} from "@angular/material/snack-bar";

import {KafkaConnectorsTaskComponent} from '../kafka-connectors-task/kafka-connectors-task.component';
import {ConfirmationComponent} from '../confirmation/confirmation.component';
import {EditViewKafkaConnectorConfigComponent} from '../edit-view-kafka-connector-config/edit-view-kafka-connector-config.component';


import '@meltwater/flux-web-components';

@Component({
  selector: 'app-kafka-connectors-list',
  templateUrl: './kafka-connectors-list.component.html',
  styleUrls: ['./kafka-connectors-list.component.css']
})
export class KafkaConnectorsListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | any
  @ViewChild(MatSort) sort: MatSort;

  public dataSource: any;
  public displayedColumns: any;
  public connectorsCount: any;
  public ELEMENT_DATA: any;

  constructor(
    private kafka: KafkaConnectorsListService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {
  }


  ngAfterViewInit() {
  }

  ngOnInit(): void {
    this.listKafkaConnectors();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  listKafkaConnectors() {
    let sub_array = [];

    this.kafka.listKafkaConnector().subscribe((resp: any[]) => {
      this.connectorsCount = resp.length;
      for (let connector of resp) {
        this.kafka.getKafkaConnectorStatus(connector).subscribe((connectorStatus: any[]) => {
          // TODO: show a message or different component when you receive status 403.
          sub_array.push(connectorStatus);
          this.ELEMENT_DATA = sub_array;
          this.displayedColumns = ['name', 'state', 'tasks', 'menu'];
          this.dataSource = new MatTableDataSource(<any>this.ELEMENT_DATA);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })

      }

    })
  }

  viewConnectorConfig(connectorName: string) {

        const ViewConnectorConfigDialogRef = this.dialog.open(EditViewKafkaConnectorConfigComponent, {
          width:'1200px',
          height: '600px',
          data: {
            connectorName: connectorName,
          }
        });
        ViewConnectorConfigDialogRef.afterClosed().subscribe(result => {
        });

  }

  resumeConnector(connectorName: string) {
    const ConnectorDialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        connectorName: connectorName,
        confirmationMessage: "Are you sure you want to resume?",
      }
    });
    ConnectorDialogRef.afterClosed().subscribe(result => {
      if (result == connectorName) {
        this.kafka.resumeConnector(connectorName).subscribe((resp:any) => {
          if (resp.status == 200 || resp.status == 202) {
            this.openSnackBar("The connector will be resume shortly","OK");
          } else {
            this.openSnackBar('Oops, something went wrong', 'OK');
          }
        })
      }
    });

  }

  pauseConnector(connectorName: string) {
    const ConnectorDialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        connectorName: connectorName,
        confirmationMessage: "Are you sure you want to pause?",
      }
    });
    ConnectorDialogRef.afterClosed().subscribe(result => {
      if (result == connectorName) {
        this.kafka.pauseConnector(connectorName).subscribe((resp:any) => {
          if (resp.status == 200 || resp.status == 202) {
            this.openSnackBar("The connector will be paused shortly","OK");
          } else {
            this.openSnackBar('Oops, something went wrong', 'OK');
          }
        })
      }
    });

  }

  deleteConnector(connectorName: string) {
    let newList = this.ELEMENT_DATA;

    const ConnectorDialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        connectorName: connectorName,
        confirmationMessage: "Are you sure you want to delete?",
      }
    });
    ConnectorDialogRef.afterClosed().subscribe(result => {
      if (result == connectorName) {
        this.kafka.deleteConnector(connectorName).subscribe((resp:any) => {
          if (resp.status == 200 || resp.status == 202 || resp.status == 204) {
            let updatedList = this.removeConnectorFromList(newList,result)
            this.dataSource.data = updatedList;
            this.openSnackBar("The connector is deleted","OK");
          } else {
            this.openSnackBar('Oops, something went wrong', 'OK');
          }
        })
      }
    });

  }
  removeConnectorFromList(list:any, connectorName: string) {
    for(let i = list.length - 1; i >= 0; i--) {
      if(list[i].name === connectorName) {
        list.splice(i, 1);
      }
    }
    return list
  }

  restartConnector(connectorName: string) {
    const ConnectorDialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        connectorName: connectorName,
        confirmationMessage: "Are you sure you want to restart?",
      }
    });
    ConnectorDialogRef.afterClosed().subscribe(result => {
      if (result == connectorName) {
        this.kafka.restartConnector(connectorName).subscribe((resp:any) => {
          if (resp.status == 200 || resp.status == 202 || resp.status == 204) {
            this.openSnackBar("The connector will be restarted shortly","OK");
          } else {
            this.openSnackBar('Oops, something went wrong', 'OK');
          }
        })        }
    });

  }

  openTasks(connectorName: string) {
    const dialogRef = this.dialog.open(KafkaConnectorsTaskComponent, {
      width: '1000px',
      data: {connectorName: connectorName}
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
