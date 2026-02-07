import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { inject } from '@angular/core';

export const comingSoonGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isComingSoonPage = state.url.startsWith('/coming-soon');

  // 🔒 Mode coming soon activé
  if (environment.comingSoon) {

    // Autoriser uniquement la page coming-soon
    if (isComingSoonPage) {
      return true;
    }

    router.navigate(['/coming-soon']);
    return false;
  }

  // 🚀 Mode coming soon désactivé
  if (!environment.comingSoon && isComingSoonPage) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
