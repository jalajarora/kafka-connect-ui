import { TestBed } from '@angular/core/testing';

import { NewConnectorsService } from './new-connectors.service';

describe('NewConnectorsService', () => {
  let service: NewConnectorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewConnectorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
