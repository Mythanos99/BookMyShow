import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CinemaService } from 'src/app/services/cinema/cinema.service';

@Component({
  selector: 'app-list-cinema',
  templateUrl: './list-cinema.component.html',
  styleUrls: ['./list-cinema.component.scss']
})
export class ListCinemaComponent implements OnInit {
  cinemaForm: FormGroup;

  constructor(private fb: FormBuilder, private cinemaService: CinemaService) {
    this.cinemaForm = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      houseNo: ['', Validators.required],
      street: ['', Validators.required],
      area: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]], // Example pattern for a 6-digit pincode
      screens: ['', [Validators.required, Validators.min(1)]],
      foodService: [false, Validators.required] // Default value for the radio buttons
    });
  }

  ngOnInit(): void {}

  get formControls() {
    return this.cinemaForm.controls;
  }

  onSubmit(): void {
    if (this.cinemaForm.valid) {
      const cinemaData = {
        name: this.cinemaForm.get('name')?.value,
        city: this.cinemaForm.get('city')?.value,
        location: {
          houseNo: this.cinemaForm.get('houseNo')?.value,
          street: this.cinemaForm.get('street')?.value,
          area: this.cinemaForm.get('area')?.value,
          pincode: this.cinemaForm.get('pincode')?.value
        },
        screens: this.cinemaForm.get('screens')?.value,
        food_service: this.cinemaForm.get('foodService')?.value==='true'? true : false
      };
      this.cinemaService.AddCinema(cinemaData).subscribe(
        (response: any) => {
          console.log('Cinema added successfully', response);
        },
        (error: any) => {
          console.error('Error adding cinema', error);
        }
      );
    }
  }
}
