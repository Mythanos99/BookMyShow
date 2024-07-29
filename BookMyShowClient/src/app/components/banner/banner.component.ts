import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../auth/auth.component';
import { Router } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { LocationService } from 'src/app/sharedservice/location.service';
import { LocationComponent } from '../shared/location/location.component';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  isOffcanvasOpen = false;
  location: string | null = null;
  constructor(public dialog: MatDialog,private router: Router,private locationService:LocationService) {
    this.locationService.cityName$.subscribe(city => {
      this.location = city;
   });
  }

  ngOnInit(): void {}

  toggleOffcanvas(event: Event): void {
    event.stopPropagation();
    this.isOffcanvasOpen = !this.isOffcanvasOpen;
  }

  closeOffcanvas(): void {
    this.isOffcanvasOpen = false;
  }

  promptForCity(): void {
    const dialogRef = this.dialog.open(LocationComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.locationService.setCity(result);
        // Use the city information as needed
      }
    });
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const offcanvas = document.querySelector('.offcanvas') as HTMLElement;
    const menuIcon = document.querySelector('.navbar-toggler-icon') as HTMLElement;
    const isClickInside = offcanvas.contains(target) || menuIcon.contains(target);

    if (!isClickInside) {
      this.closeOffcanvas();
    }
  }
  openAuthDialog() {
    const dialogConfig = this.dialog.open(AuthComponent, {
      width: this.getDialogWidth(),
      height: this.getDialogHeight(),
      maxWidth: '90vw', 
      maxHeight: '90vh', 
      panelClass: 'custom-dialog-container' 
    });
  }
  
  private getDialogWidth(): string {
    if (window.innerWidth <= 600) {
      return '90vw'; 
    } else if (window.innerWidth <= 960) {
      return '70vw'; // 70% of the viewport width for medium screens
    } else {
      return '40vw'; // 50% of the viewport width for larger screens
    }
  }
  
  private getDialogHeight(): string {
    if (window.innerHeight <= 600) {
      return '50vw'; // 80% of the viewport height for small screens
    } else {
      return '40vh'; // 70% of the viewport height for larger screens
    }
  }
  openSearch() {
    this.dialog.open(SearchComponent, {
      width: '80vw',
      height: '80vh',
      panelClass: 'full-screen-dialog'
    });
  }

  
}
