import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import { Routes, RouterModule } from '@angular/router';
import { MyPipe } from './app.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSortModule} from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ClipboardModule} from '@angular/cdk/clipboard';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KafkaConnectorsListComponent } from './kafka-connectors-list/kafka-connectors-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { KafkaConnectorsTaskComponent } from './kafka-connectors-task/kafka-connectors-task.component';
import { NewConnectorsComponent } from './new-connectors/new-connectors.component';
import { CreateNewConnector } from './new-connectors/new-connectors.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { EditViewKafkaConnectorConfigComponent } from './edit-view-kafka-connector-config/edit-view-kafka-connector-config.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'KafkaConnectorsListComponent' },
  {
    path: 'kafka-connectors',
    component: KafkaConnectorsListComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'new-connectors',
    component: NewConnectorsComponent
  },
  {
    path: '**',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent, KafkaConnectorsListComponent, MyPipe, DashboardComponent, KafkaConnectorsTaskComponent, NewConnectorsComponent, CreateNewConnector, ConfirmationComponent, EditViewKafkaConnectorConfigComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    ClipboardModule,
    MatTableModule,
    MatSortModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatBadgeModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTabsModule
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
