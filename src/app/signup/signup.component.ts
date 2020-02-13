import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { SampleService } from 'app/Services/sample.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  spin = false;
  ErrMsg = '';
  signupForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(16), Validators.pattern('^[a-zA-z]+([\s][a-zA-Z]+)*$')]],
    designation: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(16), Validators.pattern('^[a-zA-z]+([\s][a-zA-Z]+)*$')]],
    email: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40), Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
    phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    dob: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
    private sam: SampleService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  get f() {
    return this.signupForm.controls;
  }
  signup() {
    this.spin = true;
    this.sam.Security(this.signupForm.value).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/signIn'])
      },
      (err) => {
        this.spin = false;
        console.log(err);
        if (err.status == 500)
          /*  this.ErrMsg = "Back end server is not responding"; */
          alert("Server is not responding")

      }
    )

  }
}
