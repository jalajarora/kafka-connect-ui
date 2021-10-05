import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import { MatTabChangeEvent } from '@angular/material/tabs';
import ActiveMQSourceConnector from "../../assets/default-connector-config/ActiveMQSourceConnector.json";
import FileStreamSourceConnector from "../../assets/default-connector-config/FileStreamSourceConnector.json";
import FtpSourceConnector from "../../assets/default-connector-config/FtpSourceConnector.json";
import HTTPSourceConnector from "../../assets/default-connector-config/HTTPSourceConnector.json";
import IbmMQSourceConnector from "../../assets/default-connector-config/IbmMQSourceConnector.json";
import JdbcSourceConnector from "../../assets/default-connector-config/JdbcSourceConnector.json";
import JmsSourceConnector from "../../assets/default-connector-config/JmsSourceConnector.json";
import LoadGenSourceConnector from "../../assets/default-connector-config/LoadGenSourceConnector.json";
import MirrorCheckpointConnector from "../../assets/default-connector-config/MirrorCheckpointConnector.json";
import MirrorHeartbeatConnector from "../../assets/default-connector-config/MirrorHeartbeatConnector.json";
import MirrorSourceConnector from "../../assets/default-connector-config/MirrorSourceConnector.json";
import RssSourceConnector from "../../assets/default-connector-config/RssSourceConnector.json";
import SchemaSourceConnector from "../../assets/default-connector-config/SchemaSourceConnector.json";
import {environment} from "../../environments/environment";

import {NewConnectorsService} from './new-connectors.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {element} from "protractor";

@Component({
  selector: 'app-new-connectors',
  templateUrl: './new-connectors.component.html',
  styleUrls: ['./new-connectors.component.css']
})
export class NewConnectorsComponent implements OnInit {
  public connectorConfig: any;

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  createConnector(newConnectorName: any) {
    let finalConnectorConfig = this.loadConnectorFiles(newConnectorName);
    let curlCommand = this.createCurlCommand(finalConnectorConfig);
    const ViewConnectorConfigDialogRef = this.dialog.open(CreateNewConnector, {
      width:'1200px',
      height: '600px',
      data: {
        NewConnectorName: newConnectorName,
        ConnectorConfig: finalConnectorConfig,
        CurlCommand: curlCommand,
      }
    });
    ViewConnectorConfigDialogRef.afterClosed().subscribe(result => {
    });

  }

  loadConnectorFiles(newConnectorName: any) {
    if(newConnectorName === "FtpSourceConnector") {
      this.connectorConfig = FtpSourceConnector;
    }else if(newConnectorName === "RssSourceConnector") {
      this.connectorConfig = RssSourceConnector;
    }else if(newConnectorName === "HTTPSourceConnector") {
      this.connectorConfig = HTTPSourceConnector;
    }else if(newConnectorName === "LoadGenSourceConnector") {
      this.connectorConfig = LoadGenSourceConnector;
    }else if(newConnectorName === "ActiveMQSourceConnector") {
      this.connectorConfig = ActiveMQSourceConnector;
    }else if(newConnectorName === "IbmMQSourceConnector") {
      this.connectorConfig = IbmMQSourceConnector;
    }else if(newConnectorName === "JmsSourceConnector") {
      this.connectorConfig = JmsSourceConnector;
    }else if(newConnectorName === "MirrorCheckpointConnector") {
      this.connectorConfig = MirrorCheckpointConnector;
    }else if(newConnectorName === "MirrorHeartbeatConnector") {
      this.connectorConfig = MirrorHeartbeatConnector;
    }else if(newConnectorName === "Jdbc") {
      this.connectorConfig = JdbcSourceConnector;
    }else if(newConnectorName === "File") {
      this.connectorConfig = FileStreamSourceConnector;
    }else if(newConnectorName === "Schemas") {
      this.connectorConfig = SchemaSourceConnector;
    }else if(newConnectorName === "MirrorSourceConnector") {
      this.connectorConfig = MirrorSourceConnector;
    }
    return this.connectorConfig;
  }

  createCurlCommand(connectConfig: any) {
    let prepareCurlConfig = {
      "name": connectConfig['name'],
      "config": connectConfig
    }
    let curlCommand = `curl -X POST \\` + "\n" + environment.KAFKA_CONNECT_DOMAIN +
      environment.CONNECTORS_ENDPOINT + "/" +
      " \\" + "\n" + "-H 'Content-Type: application/json' \\" + "\n" + "-H 'Accept: application/json' \\"
    curlCommand = curlCommand + "\n" + "-d '" + "\n" +  JSON.stringify(prepareCurlConfig) + "'" + "\n";
    return curlCommand;
  }

}

@Component({
  selector: 'create-new-connector',
  templateUrl: './create-new-connector.html',
  styleUrls: ['./new-connectors.component.css']
})
export class CreateNewConnector implements OnInit, AfterViewInit{
  public tabIndex: number = 0;
  public finalConnectorConfig: any;
  public validationErrorsAndDefinition = [];
  public saveConfigButton: boolean = true;
  public error: string = '';
  public newProperties: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private newConnectorService: NewConnectorsService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.formatProperties();
  }

  ngAfterViewInit() {
  }

  formatProperties(){
    this.newProperties = '';
    let  result = [],
      i, l = Math.min(Object.keys(this.data.ConnectorConfig).length, Object.values(this.data.ConnectorConfig).length);

    for (i = 0; i < l; i++) {
      result.push(Object.keys(this.data.ConnectorConfig)[i], Object.values(this.data.ConnectorConfig)[i]);
      this.newProperties += Object.keys(this.data.ConnectorConfig)[i] + " = " + Object.values(this.data.ConnectorConfig)[i] + "\n";
    }
  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    this.tabIndex=tabChangeEvent.index;
    this.validationErrorsAndDefinition = [];
    this.saveConfigButton = true;
  }

  extractConfig() {
    let properties = [];
    let found = [];
    let finalProperties = [];
    this.finalConnectorConfig = [];
    this.error = '';
    // Properties TAB
    if(this.tabIndex == 0) {
      // Properties
      let getProperties = document.getElementsByName('properties');

      let newString = getProperties[0].innerText.split("\n");
      newString.forEach((ele) => {
        found = ele.match(/[^=]*$/g);
        if (found[0] == []) {
          let replace = ele.replace(ele,ele+ "");
          finalProperties.push(replace.toString());
        } else {
          finalProperties.push(ele);
        }
      })
      // finalProperties.pop(); //removing last element frm array as it is empty, for later: find out the cause.
      finalProperties.forEach((ele) =>{
        let newString = ele.replace(/\s+/g, '');
        let separateString = newString.split('=')
        separateString.forEach((element) =>{
            properties.push(element);
          })
      })

      let result = [properties]
        .reduce((r, a) => (a.forEach((a, i) => (r[i] = r[i] || []).push(a)), r), [])
        .reduce((a, b) => a.concat(b));
      let obj={};

      for(let i=0; i<result.length-1; i=i+2) {
        obj[result[i]] = result[i+1];
      }
      this.finalConnectorConfig = obj;
    }
    // JSON TAB
    if(this.tabIndex == 1){
      // JSON
      this.finalConnectorConfig = (<HTMLInputElement>document.getElementById('json_config')).value;
      // this.finalConnectorConfig = ConnectorConfig.innerHTML;
      // this.finalConnectorConfig  = JSON.parse(this.finalConnectorConfig);
      try {
        this.finalConnectorConfig  = JSON.parse(this.finalConnectorConfig);
      } catch(e) {
        this.error = e;
      }
    }
    return [this.finalConnectorConfig, this.error];
  }

  validateConfig() {
    this.validationErrorsAndDefinition = [];
    let [extractConfig=[], error] = this.extractConfig();
    if (error != ''){
      this.openSnackBar(error, "OK");
      this.saveConfigButton = true;
    } else if (extractConfig != undefined) {
        if (extractConfig['connector.class'] != undefined){
          this.newConnectorService.validateConfig(extractConfig['connector.class'], extractConfig).subscribe((resp:any)=>{
            resp.body.configs.forEach((element:any) =>{
              if(element.value.errors.length >= 1) {
                this.saveConfigButton = true;
                this.validationErrorsAndDefinition.push({"definition": element.definition.documentation, "error": element.value.errors});
              }
            })
            if(this.validationErrorsAndDefinition.length < 1) {
              this.saveConfigButton = false;
            }
          })
        } else {
          this.openSnackBar("Please provide 'connector.class'", "OK")
          this.saveConfigButton = true;
        }
      } else {
      this.openSnackBar("Could not extract the config", "OK")
    }
  }

  postNewConnector() {
    let [extractConfig, error] = this.extractConfig();
    if (error != '') {
    this.openSnackBar(error,"OK");
    } else if (extractConfig != undefined) {
      let prepareConfig = {
          "name": extractConfig['name'],
          "config": extractConfig
        }
      this.newConnectorService.postNewConnector(prepareConfig).subscribe((response:any)=> {
        if (response.status == 200 || response.status == 201){
          this.openSnackBar("Connector created successfully", "OK");
          this.saveConfigButton = true;
        } else if(response.status == 409){
          this.openSnackBar("The connector already exists with the same name", "OK");
        } else {
          this.openSnackBar("Something went wrong behind the scene!!!", "OK");
        }
      })
    } else {
      this.openSnackBar("Could not extract the config", "OK")
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
