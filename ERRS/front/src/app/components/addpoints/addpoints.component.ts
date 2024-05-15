import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-addpoints',
  templateUrl: './addpoints.component.html',
  styleUrls: ['./addpoints.component.css']
})

export class AddpointsComponent implements OnInit {
  achievementList: any[] = [];
  employeeList: any[] = [];
  displayedColumns: string[] = ['employeeId', 'employeeFirstName', 'award','point', 'remarks'];
  selectedReward: any;
  selectedPoints: number = 0;
  dataSource!: MatTableDataSource<any>;

  constructor(private employeeService: EmployeeService,private router:Router,private snackBar:MatSnackBar) {}

  ngOnInit() {
    this.employeeService.getEmployeeList().subscribe(
      (response) => {
        this.employeeList = response.map((emp) => ({
          ...emp,
          point: 0,
          award: '',
          remarks: ''
        }));

        
        this.dataSource = new MatTableDataSource<any>(this.employeeList);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

    this.employeeService.getAchievement().subscribe(
      (response) => {
        this.achievementList = response.map((ach) => ({ ...ach }));
      },
      (error) => {
        console.error('Error fetching achievement data:', error);
      }
    );
  }
  
  navigateToAdmin() {
    this.router.navigate(['/admin']);
  }
  onSubmit() {
    const updatedEmployees = this.employeeList
      .filter((emp) => Number(emp.point) > 0)
      .map((emp) => ({
        employeeId: emp.employeeId,
        numberofPoints: emp.point,
        award: emp.award,
        remarks: emp.remarks
      }));

    this.employeeService.addTransactionCredit(updatedEmployees).subscribe(
      (response) => {
        console.log(response);
        this.openSnackBar('Points added successfully','success-snackbar');
        this.navigateToAdmin();
      },
      (error) => {
        console.log('Error:', error);
        this.openSnackBar('Error adding points', 'error-snackbar');
      }
    );
  }
  openSnackBar(message: string, panelClass: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.panelClass = [panelClass];
    config.horizontalPosition = 'center';

    this.snackBar.open(message, 'Close', config);
  }
  onAchievementChange(element: any, rowIndex: number): void {
    const selectedAchievement = this.achievementList.find(achievement => achievement.achievement_name === element.award);
    if (selectedAchievement) {
      this.employeeList[rowIndex].point = selectedAchievement.points; 
    } else {
      this.employeeList[rowIndex].point = null; 
    }
  }
}

