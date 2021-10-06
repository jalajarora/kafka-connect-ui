// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material/dialog";
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { KafkaConnectorsTaskComponent } from './kafka-connectors-task.component';
import {HttpClient} from "@angular/common/http";

describe('KafkaConnectorsTaskComponent', () => {
  let component: KafkaConnectorsTaskComponent;
  let fixture: ComponentFixture<KafkaConnectorsTaskComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, MatSnackBarModule],
      declarations: [ KafkaConnectorsTaskComponent ],
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
    fixture = TestBed.createComponent(KafkaConnectorsTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
