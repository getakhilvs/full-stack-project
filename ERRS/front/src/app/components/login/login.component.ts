import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login!: FormGroup;

  
  constructor(private authService:AuthService,private fb: FormBuilder, private loginService: LoginService, private router: Router, private commonService : CommonService) { }

  ngOnInit() {
    this.login = this.fb.group({
      email: [null, [Validators.required,Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.login.valid) {
      const formData = this.login.value;
      this.loginService.validateEmployee(formData)
      .subscribe(
        (response:any) => {
          if(response!==null)
          {
            this.authService.login(response);
            this.commonService.setData(response);
          if(response.employeeRole==='employee' )
            {
              this.router.navigate(['/employee']);
            }
          if(response.employeeRole==='admin')
          {
            this.router.navigate(['/admin']);
          }
          }
          else{
            alert("Sorry. Password Mismatch")
          }
          // Handle success (e.g., show a success message)
        },
        (error:any) => {
          this.router.navigate(['/error']);
        }
      );
  } else {
    console.log('Form is invalid');
  }
}
  

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

 
}