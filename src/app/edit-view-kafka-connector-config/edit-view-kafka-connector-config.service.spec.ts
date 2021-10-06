// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { EditViewKafkaConnectorConfigService } from './edit-view-kafka-connector-config.service';
import {HttpClient} from "@angular/common/http";

describe('EditViewKafkaConnectorConfigService', () => {
  let service: EditViewKafkaConnectorConfigService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(EditViewKafkaConnectorConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
