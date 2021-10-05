import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EditViewKafkaConnectorConfigComponent } from './edit-view-kafka-connector-config.component';

describe('EditViewKafkaConnectorConfigComponent', () => {
  let component: EditViewKafkaConnectorConfigComponent;
  let fixture: ComponentFixture<EditViewKafkaConnectorConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditViewKafkaConnectorConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditViewKafkaConnectorConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
