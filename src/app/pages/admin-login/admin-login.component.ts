import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup,FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  adminForm!: FormGroup;

   
  ngOnInit(): void {
    this.adminForm = this.fb.group({
    
      email: ['',Validators.compose([Validators.required,Validators.email])],
      password: ['',Validators.required]
     

    },
   
    );
}
adminLogin() {
  if (this.adminForm.valid) {
    this.authService.loginUser(this.adminForm.value)
      .subscribe({
        next: (res: any) => {
          console.log('Login response:', res);

          //  'data' is the field containing the user data
          const userData = res.data;

          if (userData && userData.hasOwnProperty('isAdmin') && userData.isAdmin === true) {
            alert("Admin Login is successful");
            this.router.navigate(['course-list']); // Navigate to the course list for admin
            this.adminForm.reset();
          } else {
            alert("You are not authorized as an admin.");
          }
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
