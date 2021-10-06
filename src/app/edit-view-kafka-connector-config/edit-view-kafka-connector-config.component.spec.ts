// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material/dialog";
import { HttpClient } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { EditViewKafkaConnectorConfigComponent } from './edit-view-kafka-connector-config.component';

describe('EditViewKafkaConnectorConfigComponent', () => {
  let component: EditViewKafkaConnectorConfigComponent;
  let fixture: ComponentFixture<EditViewKafkaConnectorConfigComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditViewKafkaConnectorConfigComponent ],
      imports: [ HttpClientTestingModule, MatSnackBarModule ],
      providers: [{
        provide: MatDialogRef,
        useValue: {}
      },{
        provide: MatDialog,
        useValue: {}
      },{
        provide: MAT_DIALOG_DATA,
        useValue: {} // Add any data you wish to test if it is passed/used correctly
      }]
    })
      .compileComponents();
    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditViewKafkaConnectorConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
