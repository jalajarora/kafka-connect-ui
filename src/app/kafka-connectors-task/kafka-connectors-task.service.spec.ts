import { TestBed } from '@angular/core/testing';

import { KafkaConnectorsTaskService } from './kafka-connectors-task.service';

describe('KafkaConnectorsTaskService', () => {
  let service: KafkaConnectorsTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KafkaConnectorsTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
