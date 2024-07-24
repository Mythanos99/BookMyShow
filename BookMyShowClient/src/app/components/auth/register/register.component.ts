import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    },);
  }

  ngOnInit(): void {
   
  }

  // Getters for form controls
  get f() { return this.registerForm.controls; }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if (password && confirmPassword) {
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
    } else {
      confirmPassword.setErrors(null);
    }
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
    }
  }
}
