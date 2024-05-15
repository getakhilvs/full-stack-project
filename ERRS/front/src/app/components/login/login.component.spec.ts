import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router'; 
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let loginService: LoginService;
  let commonService: CommonService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule
      ],
      declarations: [LoginComponent],
      providers: [
        AuthService,
        LoginService,
        CommonService,
        { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    loginService = TestBed.inject(LoginService);
    commonService = TestBed.inject(CommonService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to signup page', () => {
    component.navigateToSignup();
    expect(router.navigate).toHaveBeenCalledWith(['/signup']);
  });

  it('should set form validity', () => {
    let email = component.login.controls['email'];
    let password = component.login.controls['password'];

    expect(email.valid).toBeFalsy();
    expect(password.valid).toBeFalsy();

    email.setValue('akhil.vs@bytestrone.com');
    password.setValue('Akhil@123');

    expect(email.valid).toBeTruthy();
    expect(password.valid).toBeTruthy();
  });

});
