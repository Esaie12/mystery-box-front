import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { inject } from '@angular/core';

export const comingSoonGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  // Si le mode coming soon est activé
  if (environment.comingSoon) {

    // Autoriser UNIQUEMENT la page coming-soon
    if (state.url === '/coming-soon') {
      return true;
    }

    // Sinon → redirection
    router.navigate(['/coming-soon']);
    return false;
  }

  
  return true;
};
