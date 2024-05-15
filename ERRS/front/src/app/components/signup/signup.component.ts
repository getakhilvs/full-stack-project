import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router'
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-register',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signup!: FormGroup;
  passwordMismatch: boolean = false;
  constructor(private snackBar:MatSnackBar,private fb: FormBuilder, private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.signup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, this.validateEmailDomain]],
      age: ['', Validators.required],
      position: ['', Validators.required],
      password: ['', Validators.required],
      gender:['',Validators.required],
    });
  }

  onSubmit() {
    if (this.signup.valid) {
      const formData = this.signup.value;
      this.employeeService.createEmployee(formData)
        .subscribe(
          (response: any) => {
            if (response === null) {
              this.openSnackBar("Employee already exists. Please use a different email or login with the existing account.",'error');
              console.log("Employee already exists. Please use a different email or login with the existing account.");
            } else {
              console.log('Employee created successfully', response);
              this.openSnackBar('Employee Registered successfully','success message');
              this.router.navigate(['/login']);
            }
          },
          (error: any) => {
            this.openSnackBar('Error creating Employee','error ');
            console.error('Error creating employee', error);
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
  validateEmailDomain(control: AbstractControl): { [key: string]: any } | null {
    const email = control.value as string; 
    if (email && !email.endsWith('@bytestrone.com')) {
        
        return { invalidDomain: { message: 'Please enter a valid email from the ByteStrone domain.' } };
    }
    return null;
}


}
  

  

