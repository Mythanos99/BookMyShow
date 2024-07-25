import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { httpError } from 'src/app/services/utils/utils'; // Adjust the path as necessary
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  userExists: boolean = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private userService: UserService, private dialogRef: MatDialogRef<RegisterComponent>) { 
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      mobile_no: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  ngOnInit(): void {
    // Initialization logic if any
  }

  // Getters for form controls
  get f() { return this.registerForm.controls; }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if(!password || !confirmPassword) return;
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
    } else {
      confirmPassword.setErrors(null);
    }
  }

  togglePassword(id: string) {
    const input = document.getElementById(id) as HTMLInputElement;
    if (input) {
      input.type = input.type === 'password' ? 'text' : 'password';
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      // Handle the form submission
      console.log(this.registerForm.value);
      this.userService.register(this.registerForm.value).pipe(
        catchError((error) => {
          const { errorCode, msg } = error;
          if (errorCode === 400) {
            console.log('User already exists');
            this.userExists = true;
          } else {
            console.error('An error occurred:', msg);
            this.errorMessage = msg;
          }
          return of(null); // Return a safe value or empty observable
        })
      ).subscribe((data) => {
        if (data) {
          console.log(data);
          this.dialogRef.close(); // Close the dialog on success
        }
      });
    }
  }
}