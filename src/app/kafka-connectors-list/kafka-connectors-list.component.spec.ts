// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';


import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatDialogModule} from '@angular/material/dialog';

import { KafkaConnectorsListComponent } from './kafka-connectors-list.component';
import { HttpClient } from '@angular/common/http';


describe('KafkaConnectorsListComponent', () => {
  let component: KafkaConnectorsListComponent;
  let fixture: ComponentFixture<KafkaConnectorsListComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KafkaConnectorsListComponent ],
      imports: [ HttpClientTestingModule, MatDialogModule, MatSnackBarModule]
    })
      .compileComponents();
    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KafkaConnectorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
