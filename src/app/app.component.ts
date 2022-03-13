import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'task-manager';

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.initializeAuth().subscribe();
  }
}
