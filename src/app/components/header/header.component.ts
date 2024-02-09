import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
 constructor(private authService:AuthService,private router:Router){
  
 }
//  logout(): void {
//   this.authService.logout();
//   // Redirect to the login page or perform any other necessary actions after logout
//   this.router.navigate(['/login']);
// }
}
