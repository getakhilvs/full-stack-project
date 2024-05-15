import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-addachievements',
  templateUrl: './addachievements.component.html',
  styleUrls: ['./addachievements.component.css']
})
export class AddachievementsComponent implements OnInit {
  achievementForm!: FormGroup;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private router: Router,private snackBar:MatSnackBar) {}

  ngOnInit(): void {
    this.achievementForm = this.fb.group({
      achievement_name: ['', Validators.required],
      achievement_desc: ['', Validators.required],
      points: ['', Validators.required], 
    });
  }

  onSubmit() {
    if (this.achievementForm.valid) {
      const formData = this.achievementForm.value;
      this.employeeService.addAchievement(formData).subscribe(
        (response: any) => {
          this.openSnackBar('Achievement Added Successfully','success-snackbar');
          this.router.navigate(['admin']);
        },
        (error: any) => {
          this.openSnackBar('Error creating Achievement', 'error-snackbar');
          console.error('Error creating Achievement', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  openSnackBar(message: string, panelClass: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.panelClass = [panelClass];
    config.horizontalPosition = 'center';

    this.snackBar.open(message, 'Close', config);
  }
}

