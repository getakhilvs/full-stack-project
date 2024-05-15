import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{
  receivedData: any;
  receivedData1: any;
  id!:number;
  fname!:String;
  lname!:String;
  age!:number;
  gender!:string;
  phone!:number;
  email!:String;
  position!:String;
  totalPoints!:number;
  totalDebitPoints!:number;
  performanceList: any[] = [];
  topPerformersList: any[] = [];
  productList: any[] = []; 
  imageArray : any[] = [];
  currentMerchName!:String;
  currentMerchCost!:number;
  currentMerchId!:number;
  chunkedProducts: any[][] = [];
  showBuyProductsComponent: boolean = false;
  showEmployeeContents: boolean = true;
  showOrdersComponent:boolean=false;
  showText = false;
  currentButton: string = '';
  constructor(private productService: ProductService,private commonService: CommonService,private router:Router,private employeeService:EmployeeService,private authService:AuthService) {}

  ngOnInit() {
    
    this.commonService.getData().subscribe(data => {
      this.receivedData = JSON.parse(localStorage.getItem('user')!);
      this.id=this.receivedData.employeeId;
    });
    this.employeeService.getEmployeeDetails(this.id).subscribe(
      (response)=>{
      console.log('response ha',response)
      this.receivedData1 = JSON.parse(localStorage.getItem('user')!);
      this.fname= this.receivedData1.employeeFirstName;      ;
      this.lname= this.receivedData1.employeeLastName;
      this.age= this.receivedData1.employeeAge;
      this.phone= this.receivedData1.employeePhone;
      this.gender=this.receivedData1.employeeGender;
      this.email= this.receivedData1.employeeEmail;
      this.position= this.receivedData1.employeePosition;
      this.id=this.receivedData1.employeeId;
      this.totalPoints=this.receivedData1.employeeTotalPoints;
      this.totalDebitPoints=this.receivedData1.employeeTotalDebitPoints;
    });
    this.employeeService.getEmployeePerformance(this.id).subscribe(
      (response) => {
        this.performanceList=response;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
    this.productService.getRecentProductList().subscribe(
      (response) => {
        console.log('response', response)
        this.productList=response
        this.chunkProducts();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  private chunkProducts() {
    const chunkSize = 4;
    for (let i = 0; i < this.productList.length; i += chunkSize) {
      this.chunkedProducts.push(this.productList.slice(i, i + chunkSize));
    }
  }
  toggleBuyProductsCard() {
    this.showEmployeeContents=false
    this.showBuyProductsComponent=true
    this.showOrdersComponent=false
  }
  toggleHomeCard() {
    this.employeeService.getEmployeeDetails(this.id).subscribe(
      (response)=>{
      console.log('response ha',response)
      this.receivedData1=response;
      this.totalPoints=this.receivedData1.employeeTotalPoints;
      this.totalDebitPoints=this.receivedData1.employeeTotalDebitPoints;
    });
    this.showEmployeeContents=true
    this.showBuyProductsComponent=false
    this.showOrdersComponent=false
    
  }
  toggleHistoryCard(){
    this.showEmployeeContents=false
    this.showBuyProductsComponent=false
    this.showOrdersComponent=true
  }
  showTextOnHover(button: string): void {
    this.showText = true;
    this.currentButton = button;
  }

  hideTextOnLeave(button: string): void {
    this.showText = false;
    this.currentButton = '';
  }
  signout(){
    this.authService.logout();
  }
}
 