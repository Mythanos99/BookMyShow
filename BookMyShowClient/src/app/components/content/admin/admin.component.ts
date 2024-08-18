import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BusinessService } from 'src/app/services/business/business.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['username', 'name', 'mov', 'eve', 'sho', 'cin', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Pagination Variables
  page = 0;
  limit = 10;
  totalItems = 10;

  constructor(private businessService: BusinessService) { }

  ngOnInit(): void {
    this.loadBusinesses();
  }

  loadBusinesses(): void {
    this.businessService.fetchAllAppliedBusiness(this.page, this.limit).subscribe((response: any) => {
      this.dataSource.data = response; // Adjust if response structure is different
      this.dataSource.paginator = this.paginator;
    });
  }

  hasAccess(access: string[], type: string): boolean {
    return access.includes(type);
  }

  toggleAccess(businessId: string, type: string, event: any): void {
    const checked = event.checked;
    // Update the local data without calling the service immediately
    this.dataSource.data = this.dataSource.data.map((business: any) => {
      if (business._id === businessId) {
        const updatedAccess = checked 
          ? [...business.access, type]
          : business.access.filter((accessType: string) => accessType !== type);
        return { ...business, access: updatedAccess };
      }
      return business;
    });
  }

  updateAccess(businessId: string): void {
    const business = this.dataSource.data.find((business: any) => business._id === businessId);
    if (business) {
      this.businessService.updateBusinessAccess(businessId, business.access).subscribe(() => {
        // Optionally handle success, e.g., show a success message
        console.log('Access updated successfully');
      }, error => {
        // Handle error, e.g., show an error message
        console.error('Failed to update access', error);
      });
    }
  }

  // Handle pagination changes
  onPageChange(event: any): void {
    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.loadBusinesses();
  }
}
