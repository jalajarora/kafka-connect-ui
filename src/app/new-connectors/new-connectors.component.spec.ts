import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConnectorsComponent } from './new-connectors.component';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material/dialog";


describe('NewConnectorsComponent', () => {
  let component: NewConnectorsComponent;
  let fixture: ComponentFixture<NewConnectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewConnectorsComponent ],
      providers: [{
        provide: MatDialogRef,
        useValue: {}
      },{
        provide: MatDialog,
        useValue: {}
      },{
        provide: MAT_DIALOG_DATA,
        useValue: {} // Add any data you wish to test if it is passed/used correctly
      }]
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
