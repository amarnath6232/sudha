import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Minikit } from 'app/Model/model';
import { SampleService } from 'app/Services/sample.service';
import { Router } from '@angular/router';
import { Toaster } from 'app/share/global';

@Component({
  selector: 'app-minikt',
  templateUrl: './minikt.component.html',
  styleUrls: ['./minikt.component.scss']
})
export class MiniktComponent implements OnInit {
  spin = false;
  miniForm: FormGroup;
  toaster: Toaster = new Toaster();
  /*  minikit: Minikit = {
     assessmentYear: null,
     fld: null,
     nameOfFarmer: null,
     village: null,
     season: null,
     documentoryEvidence: null
   } */

  constructor(private fb: FormBuilder,
    private sample: SampleService,
    private router: Router) { }

  ngOnInit() {
    this.minikitValidations();
  }

  minikitValidations() {
    this.miniForm = this.fb.group({
      assessmentYear: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('^[0-9]*$')]],
      fld: ['', [Validators.required]],
      nameOfFarmer: ['', [Validators.required, Validators.pattern('^[a-zA-z]+([\s][a-zA-Z]+)*$')]],
      village: ['', [Validators.required, Validators.pattern('^[a-zA-z]+([\s][a-zA-Z]+)*$')]],
      season: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]],
      documentoryEvidence: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]]

    }

    )
  }

  get f() {
    return this.miniForm.controls;
  }


  minikitData() {
    this.spin = true;
    console.log(this.miniForm.value);
    this.sample.postMinikit(this.miniForm.value).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/list-minikit']);
      },
      (err) => {
        this.spin = false;
        console.log(err);
        if (err.status == 500) {
          // alert("server is not responding");
          this.toaster.error("server is not responding");
        }
      }
    )
  }

  /*   printToCart(miniForm) {
      let popupWinindow
      let innerContents = document.getElementById(this.miniForm.value).innerHTML;
      popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
      popupWinindow.document.open();
      popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
      popupWinindow.document.close();
    } */

  onPrint() {
    window.print();
  }




}
