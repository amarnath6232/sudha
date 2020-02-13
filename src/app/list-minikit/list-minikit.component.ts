import { Component, OnInit, ViewChild } from '@angular/core';
import { Minikit } from 'app/Model/model';
import { SampleService } from 'app/Services/sample.service';
import { element } from 'protractor';
import { Toaster } from 'app/share/global';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list-minikit',
  templateUrl: './list-minikit.component.html',
  styleUrls: ['./list-minikit.component.scss']
})
export class ListMinikitComponent implements OnInit {
  minikit: Minikit[] = [];
  nof;
  village;
  displayedColumns: string[] = ['assessmentYear', 'fld', 'nameOfFarmer', 'village', 'season', 'documentoryEvidence', 'actions'];
  minikitData: Minikit; // update minikit
  delMinikit: Minikit;//delete minikit

  toaster: Toaster = new Toaster();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource = new MatTableDataSource<Minikit>(this.minikit);

  constructor(private sample: SampleService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  getData() {
    this.sample.getMinikit().subscribe(
      (res) => {
        console.log(res);
        this.minikit = res;
        console.log(this.minikit);
        this.dataSource.data = this.route.snapshot.data['minikit'];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  edit(minikit: Minikit) {
    this.minikitData = minikit;
  }

  deleteMinikit(minikit: Minikit) {
    this.delMinikit = minikit;
    this.nof = minikit.nameOfFarmer;
    this.village = minikit.village;
  }

  delete(id) {
    this.sample.deleteminikit(id).subscribe(
      (res) => {
        console.log(res);
        // alert("Minikit deleted");
        this.toaster.success("Minikit Deleted Successfully");
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      }
    )
  }

  onPrint() {
    window.print();
  }

  trackById = (index, element) => {
    console.log(element._id);
    return element._id;
  }


}
