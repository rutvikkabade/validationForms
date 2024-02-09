import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { confirmPasswordValidator } from 'src/app/validators/confirm-password.validator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent implements OnInit {
  
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  loginForm!: FormGroup;
 
  ngOnInit(): void {
    this.loginForm = this.fb.group({
    
      email: ['',Validators.compose([Validators.required,Validators.email])],
      password: ['',Validators.required]
     

    },
   
    );
}
login() {
  if (this.loginForm.valid) {
    this.authService.loginUser(this.loginForm.value)
      .subscribe({
        next: (res: any) => {
          console.log('Login response:', res);
          alert("Login is successful");
          this.router.navigate(['home']);
          this.loginForm.reset();
        },
        error: (err) => {
          console.log(err);
          this.handleLoginError(err);
        }
      });
  } else {
    alert("Please check your details");
  }
}

private handleLoginError(error: any): void {
  if (error.status === 404) {
    alert("User not found. Please check your email.");
  } else if (error.status === 400) {
    alert("Incorrect password. Please try again.");
  } else {
    alert("Please check your details.");
  }
}

}