import { Component } from '@angular/core';
import { AuthenticateService } from "./authentication.service";
import { AuthGaurdService } from './auth-gaurd.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth: AuthenticateService){}
}
