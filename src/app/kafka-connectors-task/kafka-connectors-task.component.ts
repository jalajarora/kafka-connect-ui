import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTableDataSource} from "@angular/material/table";
import {KafkaConnectorsListService} from "../kafka-connectors-list/kafka-connectors-list.service";
import {KafkaConnectorsTaskService} from "./kafka-connectors-task.service";
import {ConfirmationComponent} from "../confirmation/confirmation.component";
import {MatSnackBar} from "@angular/material/snack-bar";


export interface DialogData {
  connectorName: string;
}


@Component({
  selector: 'app-kafka-connectors-task',
  templateUrl: './kafka-connectors-task.component.html',
  styleUrls: ['./kafka-connectors-task.component.css']
})
export class KafkaConnectorsTaskComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | any

  public dataSource: any;
  public displayedColumns: any;
  public ELEMENT_DATA: any;
  public finalConnectorName: string;

  constructor(
    public dialogRef: MatDialogRef<KafkaConnectorsTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private kafka: KafkaConnectorsListService,
    private kafkaTask: KafkaConnectorsTaskService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.taskInformation(this.data.connectorName);
  }

  taskInformation(connectorName: any) {
    this.finalConnectorName = connectorName;

    this.kafka.getKafkaConnectorStatus(connectorName).subscribe((resp:any) => {
      this.ELEMENT_DATA = resp.tasks;

      this.displayedColumns = ['id', 'state', 'workerid', 'menu'];
      this.dataSource = new MatTableDataSource(<any>this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
  }

  restartTask(connectorName: string, taskId: number) {
    const TaskDialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        TaskID: taskId,
        connectorName: connectorName,
        confirmationMessage: "Are you sure you want to restart?",
      }
    });
    TaskDialogRef.afterClosed().subscribe(result=> {
      if (result == connectorName) {
        this.kafkaTask.restartTask(connectorName, taskId).subscribe((resp:any) => {
          if (resp.status == 200 || resp.status == 202 || resp.status == 204) {
            this.openSnackBar("The task will be restarted shortly","OK");
          } else if (resp.status == 409) {
            // TODO: It never comes here in this clause, PLEASE CHECK!!!!!! why?.
            this.openSnackBar('Cannot complete request momentarily due to no known leader URL, likely because a rebalance was underway.', 'OK');
          } else {
            this.openSnackBar('Oops, something went wrong', 'OK');
          }
        })
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
