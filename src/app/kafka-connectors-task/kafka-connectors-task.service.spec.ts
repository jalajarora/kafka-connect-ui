// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';

import { KafkaConnectorsTaskService } from './kafka-connectors-task.service';
import {HttpClient} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";

describe('KafkaConnectorsTaskService', () => {
  let service: KafkaConnectorsTaskService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, MatSnackBarModule],

    });
    service = TestBed.inject(KafkaConnectorsTaskService);
    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
