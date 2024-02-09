// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from './auth.service';
// import { state } from '@angular/animations';
// import { map } from 'rxjs';

// export function authGuard(authService:AuthService,router:Router) :CanActivateFn {
 
//     return () => {
//         return authService.isAdmin().pipe(
//           map(isAdmin => {
//             if (isAdmin) {
//               return true;
//             } else {
//               router.navigate(['/login']);
//               return false;
//             }
//           })
//         );
//       };
 
// };
