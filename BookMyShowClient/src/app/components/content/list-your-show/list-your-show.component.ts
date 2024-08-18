import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BusinessService } from 'src/app/services/business/business.service';
import { AuthServiceService } from 'src/app/sharedservice/auth-service.service';

@Component({
  selector: 'app-list-your-show',
  templateUrl: './list-your-show.component.html',
  styleUrls: ['./list-your-show.component.scss']
})
export class ListYourShowComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isRegistering: boolean = false;

  constructor(private fb: FormBuilder,private businessServce:BusinessService,private authService:AuthService, private router: Router,private sharedAuth:AuthServiceService) { 
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  passwordMatchValidator(form: FormGroup): void {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
    }
  }

  toggleForm(): void {
    this.isRegistering = !this.isRegistering;
  }

  onLoginSubmit(): void {
    if (this.loginForm.valid) {
      // Handle login
      const loginData={username:this.loginForm.get('username')?.value,password:this.loginForm.get('password')?.value}
      this.authService.loginBusiness(loginData).subscribe((response:any)=>{
        console.log('Login successful', response);
        this.loginForm.reset();
        this.loginForm.setErrors(null);
        this.sharedAuth.setBusinessId(response.user.id);
        this.router.navigate(['/list-shows/home']);
    });
  }
  }

  onRegisterSubmit(): void {
    if (this.registerForm.valid) {
      // Handle registration
      console.log('Register Form Data:', this.registerForm.value);
      const registerData={
        name:this.registerForm.get('name')?.value,
        username:this.registerForm.get('username')?.value,
        password:this.registerForm.get('password')?.value
      }
      this.businessServce.AddBusiness(registerData).subscribe((response)=>{
        console.log('Register successful', response);
        this.registerForm.reset();
        this.registerForm.setErrors(null);
        this.isRegistering = false;
      });

    }
  }
}
