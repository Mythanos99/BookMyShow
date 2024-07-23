import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  isOffcanvasOpen = false;
  isCityDropdownOpen = false;

  constructor() { }

  ngOnInit(): void {}

  toggleOffcanvas(event: Event): void {
    event.stopPropagation();
    this.isOffcanvasOpen = !this.isOffcanvasOpen;
  }

  closeOffcanvas(): void {
    this.isOffcanvasOpen = false;
  }

  toggleCityDropdown(event: Event): void {
    event.stopPropagation();
    this.isCityDropdownOpen = !this.isCityDropdownOpen;
  }

  closeCityDropdown(): void {
    this.isCityDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const offcanvas = document.querySelector('.offcanvas') as HTMLElement;
    const menuIcon = document.querySelector('.navbar-toggler-icon') as HTMLElement;
    const isClickInside = offcanvas.contains(target) || menuIcon.contains(target);

    if (!isClickInside) {
      this.closeOffcanvas();
      this.closeCityDropdown();
    }
  }
}
