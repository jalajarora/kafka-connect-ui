import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KafkaConnectorsListComponent } from './kafka-connectors-list.component';

describe('KafkaConnectorsListComponent', () => {
  let component: KafkaConnectorsListComponent;
  let fixture: ComponentFixture<KafkaConnectorsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KafkaConnectorsListComponent ]
    })
    .compileComponents();
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
