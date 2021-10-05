import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewConnectorsComponent } from './new-connectors.component';




@NgModule({
  declarations: [NewConnectorsComponent],
  imports: [
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NewConnectorsModule { }
