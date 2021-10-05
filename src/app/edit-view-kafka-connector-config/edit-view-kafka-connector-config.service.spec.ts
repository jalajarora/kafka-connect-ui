import { TestBed } from '@angular/core/testing';

import { EditViewKafkaConnectorConfigService } from './edit-view-kafka-connector-config.service';

describe('EditViewKafkaConnectorConfigService', () => {
  let service: EditViewKafkaConnectorConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditViewKafkaConnectorConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
