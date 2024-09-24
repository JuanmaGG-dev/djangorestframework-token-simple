import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    this.authService.register(this.username, this.password, this.email).subscribe(
      (response) => {
        this.authService.setToken(response.token);
        this.router.navigate(['/profile']);
      },
      (error) => {
        this.errorMessage = "Error en el registro";
      }
    );
  }
}
