import { Component, OnInit } from '@angular/core';
import { DefaultPipe } from './default.pipe';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'unit-testing';
  props = [0, 1, 2, 3];
  isLoginNeeded: boolean = true;
  constructor(private authService: AuthService) {
  }

  needsLogin(): boolean {
    return !this.authService.isAuthenticated();
  }

  ngOnInit() {
    this.authService.isAuthenticatedAsync().then((isAuthenticated: boolean ) => {
      this.isLoginNeeded = !isAuthenticated;
    })
  }
}

