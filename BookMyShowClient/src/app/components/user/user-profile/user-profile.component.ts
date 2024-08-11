import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { formattedDob } from 'src/app/utils/util';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  currUser: User = new User('', '', '');
  user_id: string = '';

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.profileForm = this.fb.group({
      username: [{ value: '', disabled: true }, Validators.required],
      mobile_no: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: this.fb.group({
        houseno: [''],
        street: [''],
        city: [''],
        state: [''],
        pincode: ['', [Validators.pattern('^[0-9]{6}$')]]
      }),
      personal_details: this.fb.group({
        name: ['', Validators.required],
        dob: ['', Validators.required]
      })
    });
  }

  ngOnInit(): void {
    this.userService.getUserById('66a0dc4935083e1b6e4a96a6').subscribe(user => {
      this.currUser = user;
      this.populateForm();
    });
  }

  populateForm() {
    

    this.profileForm.setValue({
      username: this.currUser.username,
      mobile_no: this.currUser.mobile_no,
      address: {
        houseno: this.currUser.address.houseno,
        street: this.currUser.address.street,
        city: this.currUser.address.city,
        state: this.currUser.address.state,
        pincode: this.currUser.address.pincode
      },
      personal_details: {
        name: this.currUser.personal_details.name,
        dob: formattedDob(this.currUser.personal_details.dob)
      }
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const updatedUser = {
        ...this.currUser,
        ...this.profileForm.value,
        address: { ...this.profileForm.value.address },
        personal_details: { ...this.profileForm.value.personal_details }
      };
      this.userService.updateUserById('66a0dc4935083e1b6e4a96a6', updatedUser).subscribe(Response => {
        console.log('User Updated:', Response); 
      }); 
      // #FIXME- UserId hardcoded. Show success message if acknowledged true or some error message if not successful.
    }
  }

  onCancel() {
    this.profileForm.reset({
      username: this.currUser.username,
      mobile_no: this.currUser.mobile_no,
      address: {
        houseno: this.currUser.address.houseno,
        street: this.currUser.address.street,
        city: this.currUser.address.city,
        state: this.currUser.address.state,
        pincode: this.currUser.address.pincode
      },
      personal_details: {
        name: this.currUser.personal_details.name,
        dob: formattedDob(this.currUser.personal_details.dob)
      }
    });
  }
}
