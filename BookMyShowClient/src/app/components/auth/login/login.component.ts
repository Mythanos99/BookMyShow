import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userExists: boolean = false;
  submitted:boolean=false;
  myForm: FormGroup;

  constructor(fb: FormBuilder, private authService: AuthService) {
    this.myForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
  }

  get f() {
    return this.myForm.controls;
  }
  verify_login(myForm: any) {
    if(myForm.valid){
      console.log(myForm.value);
      this.authService.login(myForm.value).subscribe();
    }
  }
  togglepassword() {
    const x = document.getElementById('password');
    if (x && x.getAttribute('type') == 'password') {
      x.setAttribute('type', 'text');
    } else if (x) {
      x.setAttribute('type', 'password');
    }
  }

}
