import { Component, OnInit, ViewChild, AfterViewInit, Pipe} from '@angular/core';
import '@meltwater/flux-web-components';

import { MatSidenav } from '@angular/material/sidenav';


@Pipe({
  name: 'myPipe'
})
export class MyPipe {
  transform(val: any[]) {
    let NAMES = [];
    val.forEach((value) =>{
      NAMES.push(value.id);
    })
    return [NAMES.length];
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  events: string[] = [];
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
  ) {
  }

  title = 'kafka-connect-ui';

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }
}
