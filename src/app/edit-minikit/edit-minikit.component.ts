import { Component, OnInit, Input } from '@angular/core';
import { Minikit } from 'app/Model/model';
import { SampleService } from 'app/Services/sample.service';
import { Toaster } from 'app/share/global';

@Component({
  selector: 'app-edit-minikit',
  templateUrl: './edit-minikit.component.html',
  styleUrls: ['./edit-minikit.component.scss']
})
export class EditMinikitComponent implements OnInit {
  @Input() minikit: Minikit;
  toaster: Toaster = new Toaster();

  constructor(private sample: SampleService) { }

  ngOnInit() {
  }

  updateMinikit() {
    this.sample.updateMinikit(this.minikit).subscribe(
      (res) => {
        console.log(res);
        // alert("Minikit updated successfully");
        this.toaster.success("Minikit Updated Successfully");
      },
      (err) => {
        console.log(err);
      }
    )

  }

}
