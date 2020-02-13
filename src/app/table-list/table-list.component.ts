import { Component, OnInit, ViewChild } from '@angular/core';
import { signUp } from 'app/Model/model';
import { SampleService } from 'app/Services/sample.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  userData: signUp[] = [];
  name;
  email;
  user: signUp; //Update action
  deluser: signUp; //Delete action
  displayedColumns: string[] = ['name', 'designation', 'email', 'phoneNumber', 'dob', 'actions'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource = new MatTableDataSource<signUp>(this.userData);
  constructor(private sample: SampleService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.EmployeeData();
    /*   this.getdatafromService(); */
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  EmployeeData() {
    this.sample.getUser().subscribe(
      (res) => {
        console.log(res);
        this.userData = res;
        console.log(this.userData);
        this.dataSource.data = this.route.snapshot.data['userData'];
        this.dataSource.paginator = this.paginator;
        console.log(this.paginator);
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  edit(userData: signUp) {
    this.user = userData;
    console.log(userData);

  }


  deleteUser(userData: signUp) {
    this.deluser = userData;
    this.name = userData.name;
    this.email = userData.email
  }
  delete(id) {

    this.sample.deleteUser(id).subscribe(res => {
      console.log(res);
      alert("User deleted");
      this.ngOnInit();
    }, err => {
      console.log(err);
    })

  }

  update() {
    this.sample.updateUser(this.user).subscribe(
      (res) => {
        console.log(res);
        alert("User updated Successfully");
      },
      (err) => {
        console.log(err);
      }
    )
  }


}
