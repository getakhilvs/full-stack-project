import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent implements OnInit{

  displayedColumns: string[] = ['firstName', 'lastName', 'age','gender','position','points'];
  dataSource = new MatTableDataSource<any>();

  constructor(private router: Router, private employeeService: EmployeeService) {}

  ngOnInit() {
    // Load all employee data when the component is initialized
    this.loadAllEmployeeData();
  }

  loadAllEmployeeData() {

    this.employeeService.getEmployeeList().subscribe(
      (employee) => {
        // Update the MatTableDataSource with the fetched data
        this.dataSource.data = employee;
      },
      (error) => {
        console.error('Error fetching employee data', error);
      }
    );
  }
}
