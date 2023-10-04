import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.loginStatusChange().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  logOut() {
    this.authService.SignOut();
    this.router.navigate(['/']);
    this.isLoggedIn = false;
  }
}
