import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../_Services/auth.service';

export const userGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)

  const userDetails = authService.getUserDetails();
  if(userDetails && userDetails?.role === "USER" || userDetails?.role === "ADMIN"){
    return true;
  }
  else{
    router.navigate(['/not-authorized']);
    return false;
  }
};
