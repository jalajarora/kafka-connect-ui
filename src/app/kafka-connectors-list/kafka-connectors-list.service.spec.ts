import { TestBed } from '@angular/core/testing';

import { KafkaConnectorsListService } from './kafka-connectors-list.service';

describe('KafkaConnectorsListService', () => {
  let service: KafkaConnectorsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KafkaConnectorsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
