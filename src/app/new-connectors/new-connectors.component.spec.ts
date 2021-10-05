import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConnectorsComponent } from './new-connectors.component';

describe('NewConnectorsComponent', () => {
  let component: NewConnectorsComponent;
  let fixture: ComponentFixture<NewConnectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewConnectorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewConnectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
