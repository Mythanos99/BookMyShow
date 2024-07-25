import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatDialogRef } from '@angular/material/dialog'; // Import MatDialogRef if needed for dialog

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean = false;
  submitted: boolean = false;
  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<LoginComponent> // Inject MatDialogRef if you are using Angular Material dialog
  ) {
    this.myForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Initialization logic if any
  }

  // Getters for form controls
  get f() {
    return this.myForm.controls;
  }

  verify_login(myForm: FormGroup) {
    this.submitted = true;
    if (myForm.valid) {
      console.log(myForm.value);
      this.authService.login(myForm.value).subscribe({
        next: (data) => {
          console.log('Login successful:', data);
          // Close the dialog on successful login
          this.dialogRef.close();
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.invalidLogin = true; // Show error if user does not exist or other issues
        }
      });
    }
  }

  togglePassword() {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    }
  }
}
