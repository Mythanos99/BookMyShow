import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.scss']
})
export class ListEventsComponent implements OnInit {
  eventForm: FormGroup;
  availableLanguages: string[] = ['English', 'Hindi', 'Spanish', 'French'];
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private eventService: EventService) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      duration: [0, Validators.required],
      category: ['', Validators.required],
      image_url: [''],
      city: ['', Validators.required],
      location: ['', Validators.required],
      languages: [[], Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      ticketInfo: this.fb.array([]) // Initialize as FormArray
    });
  }

  ngOnInit(): void {}

  // Getter for languages FormArray
  get languages(): FormArray {
    return this.eventForm.get('languages') as FormArray;
  }

  // Getter for ticketInfo FormArray
  get ticketInfo(): FormArray {
    return this.eventForm.get('ticketInfo') as FormArray;
  }

  // Method to add a new language
  addLanguage(language: string): void {
    if (language) {
      this.languages.push(this.fb.control(language));
    }
  }

  // Method to remove a language
  removeLanguage(index: number): void {
    this.languages.removeAt(index);
  }

  // Method to add a new ticket info
  addTicketInfo(): void {
    const ticket = this.fb.group({
      type: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]]
    });
    this.ticketInfo.push(ticket);
  }

  // Method to remove a ticket info
  removeTicketInfo(index: number): void {
    this.ticketInfo.removeAt(index);
  }

  // Method to handle file selection
  onFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  submit(eventForm: FormGroup): void {
    if (eventForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('name', this.eventForm.get('name')?.value);
      formData.append('description', this.eventForm.get('description')?.value);
      formData.append('duration', this.eventForm.get('duration')?.value);
      formData.append('category', this.eventForm.get('category')?.value);
      formData.append('image_url', this.selectedFile);
      formData.append('city', this.eventForm.get('city')?.value);
      formData.append('location', this.eventForm.get('location')?.value);
  
      // Format date and time
      const dateValue = new Date(this.eventForm.get('date')?.value);
      const formattedDate = dateValue.toISOString().split('T')[0];
      const timeValue = this.eventForm.get('time')?.value;
      const [hours, minutes] = timeValue.split(':');
      const dateTime = new Date(`${formattedDate}T${hours}:${minutes}:00.000Z`).toISOString();
  
      formData.append('date', `${formattedDate}T00:00:00.000Z`);
      formData.append('time', dateTime);
  
      formData.append('languages', JSON.stringify(this.eventForm.get('languages')?.value));
      formData.append('ticketInfo', JSON.stringify(this.eventForm.get('ticketInfo')?.value));
      console.log('Ticket Info:', this.eventForm.get('ticketInfo')?.value);
      this.eventService.addEvent(formData).subscribe(
        response => {
          console.log('Event added successfully:', response);
        },
        error => {
          console.log('Failed to add event:', error);
        }
      );
    } else {
      console.log('Form is invalid or file is missing');
      this.markAllAsTouched(this.eventForm);
    }
  }

  // Method to mark all controls as touched to show validation errors
  markAllAsTouched(formGroup: FormGroup): void {
    formGroup.markAllAsTouched();
  }
}
