import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KafkaConnectorsTaskComponent } from './kafka-connectors-task.component';

describe('KafkaConnectorsTaskComponent', () => {
  let component: KafkaConnectorsTaskComponent;
  let fixture: ComponentFixture<KafkaConnectorsTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KafkaConnectorsTaskComponent ]
    })
    .compileComponents();
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
