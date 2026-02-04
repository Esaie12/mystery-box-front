import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-admin',
  imports: [RouterLink],
  templateUrl: './header-admin.html',
  styleUrl: './header-admin.css',
})
export class HeaderAdmin {

  mobileMenuOpen = false;
  openDropdowns = new Set<string>();

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  toggleDropdown(id: string) {
    if (this.openDropdowns.has(id)) {
      this.openDropdowns.delete(id);
    } else {
      this.openDropdowns.add(id);
    }
  }

  isDropdownOpen(id: string): boolean {
    return this.openDropdowns.has(id);
  }
  
}
