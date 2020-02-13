import { Component, OnInit, Input } from '@angular/core';
import { signUp } from 'app/Model/model';
import { SampleService } from 'app/Services/sample.service';
import { Toaster } from 'app/share/global';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.scss']
})
export class EditTableComponent implements OnInit {
  @Input() user: signUp;
  toaster: Toaster = new Toaster();
  constructor(private sample: SampleService) { }

  ngOnInit() {
  }

  update() {
    this.sample.updateUser(this.user).subscribe(
      (res) => {
        console.log(res);
       this.toaster.success("User updated Successfully");
      },
      (err) => {
        console.log(err);
      }
    )
  }
}
