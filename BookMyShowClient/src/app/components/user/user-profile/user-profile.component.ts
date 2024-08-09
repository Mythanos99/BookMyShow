import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup= new FormGroup({});

  user = {
    _id: '66a0a30bea454966838c2793',
    username: 'user1@example.com',
    mobile_no: '1234567890',
    role: 'user',
    address: {
      houseno: '123',
      street: '',
      city: '',
      state: '',
      pincode: '222222'
    },
    personal_details: {
      name: '',
      dob: new Date('2024-07-24T06:45:31.575Z')
    },
    created_at: new Date('2024-07-24T06:45:31.575Z'),
    booking_ids: []
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      username: [{ value: this.user.username, disabled: true }, Validators.required],
      mobile_no: [this.user.mobile_no, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: this.fb.group({
        houseno: [this.user.address.houseno],
        street: [this.user.address.street],
        city: [this.user.address.city],
        state: [this.user.address.state],
        pincode: [this.user.address.pincode, [Validators.pattern('^[0-9]{6}$')]]
      }),
      personal_details: this.fb.group({
        name: [this.user.personal_details.name, Validators.required],
        dob: [this.user.personal_details.dob, Validators.required]
      })
    });
    console.log(this.profileForm.value);
  }
  

  onSubmit() {
    if (this.profileForm.valid) {
      const updatedUser = {
        ...this.user,
        ...this.profileForm.value,
        address: {
          ...this.profileForm.value.address
        },
        personal_details: {
          ...this.profileForm.value.personal_details
        }
      };
      console.log('User profile updated:', updatedUser);
      // Save the updated user profile to the backend here
    }
  }

  onCancel() {
    this.profileForm.reset({
      username: this.user.username,
      mobile_no: this.user.mobile_no,
      address: {
        houseno: this.user.address.houseno,
        street: this.user.address.street,
        city: this.user.address.city,
        state: this.user.address.state,
        pincode: this.user.address.pincode
      },
      personal_details: {
        name: this.user.personal_details.name,
        dob: this.user.personal_details.dob
      }
    });
  }
}
