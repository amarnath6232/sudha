import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SampleService } from 'app/Services/sample.service';
import { Toaster } from './../share/global'
import { AuthenticationService } from 'app/Services/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  spin = false;
  LoginForm: FormGroup;
  toaster: Toaster = new Toaster();

  constructor(private fb: FormBuilder,
    private sample: SampleService,
    private router: Router,
    private auth: AuthenticationService) { }

  ngOnInit() {
    this.LoginValidations();
  }
  LoginValidations() {
    this.LoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    });
  }

  get f() {
    return this.LoginForm.controls;
  }


  onSignIn() {
    this.spin = true;
    console.log(this.LoginForm.controls['email'].value);
    console.log(this.LoginForm.controls['password'].value);
    if (!this.LoginForm.invalid) {
      this.auth.authenticate(this.LoginForm.controls['email'].value, this.LoginForm.controls['password'].value).subscribe(
        (res) => {
          if(res){
            this.toaster.success("log In successfull");
            this.router.navigate(['/dashboard']);
          }
        },
        (err) => {
          this.spin = false;
          console.log(err);
          if (err.status == 403) {
            this.toaster.warning("Invalid email or password.");
          }
        }
      )
    }
  }

}
