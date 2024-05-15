import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  receivedData: any;
  id!:number;
  fname!:String;
  lname!:String;
  age!:number;
  gender!:string;
  email!:String;
  position!:String;
  totalPoints!:number;
  totalDebitPoints!:number;
  performanceList: string[] = [];
  topPerformersList: any[] = [];
  productList: any[] = []; 
  imageArray : any[] = [];
  
  currentMerchName!:String;
  currentMerchCost!:number;
  currentMerchId!:number;
  chunkedProducts: any[][] = [];
  employeeCount!: number;
  showAddProductsComponent: boolean = false;
  showAdminContents: boolean = true;
  showProductsListComponent: boolean = false;
  showEmployeesComponent: boolean = false;
  showAddPointsComponent: boolean = false;
  showRecentActivityComponent: boolean = false;
  showAchivementsComponent:boolean=false;
  showText = false;
  currentButton: string = '';

  constructor(private authService: AuthService,private productService: ProductService,private commonService: CommonService,private employeeService:EmployeeService) {}

  ngOnInit() {
    this.commonService.getData().subscribe(data => {
      console.log(JSON.parse(localStorage.getItem('user')!));
      this.receivedData = JSON.parse(localStorage.getItem('user')!);
      this.fname= this.receivedData.employeeFirstName;      
      this.lname= this.receivedData.employeeLastName;
      this.age= this.receivedData.employeeAge;
      this.email= this.receivedData.employeeEmail;
      this.position= this.receivedData.employeePosition;

      this.id=this.receivedData.employeeId;
      this.gender=this.receivedData.employeeGender;
      this.totalPoints=this.receivedData.employeeTotalPoints;
      this.totalDebitPoints=this.receivedData.employeeTotalDebitPoints;
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

    this.fetchTopPerformers();
    this.employeeService.getTopPerformers().subscribe(
      (response) => {
        this.topPerformersList = response;
        this.employeeCount = this.topPerformersList.length;
      },
      (error) => {
        console.error('Error fetching top performers:', error);
      }
    );
  }
  fetchTopPerformers(): void {
    this.employeeService.getTopPerformers().subscribe(
      (response) => {
        this.topPerformersList = response;
        this.employeeCount = this.topPerformersList.length;
      },
      (error) => {
        console.error('Error fetching top performers:', error);
      }
    );
  }
  toggleAdminCard() {
    this.showAdminContents = true
    this.showAddProductsComponent = false
    this.showProductsListComponent=false
    this.showAddPointsComponent=false
    this.showEmployeesComponent=false
    this.showRecentActivityComponent=false
    this.showAchivementsComponent=false
    this.fetchTopPerformers();
  }
  toggleAddProductsCard() {
    this.showAdminContents = false
    this.showProductsListComponent=false
    this.showAddProductsComponent = true
    this.showAddPointsComponent=false
    this.showEmployeesComponent=false
    this.showRecentActivityComponent=false
    this.showAchivementsComponent=false;
  }
  toggleAddPointsCard() {
    this.showAdminContents = false
    this.showProductsListComponent=false
    this.showAddProductsComponent = false
    this.showAddPointsComponent=true
    this.showEmployeesComponent=false
    this.showRecentActivityComponent=false
    this.showAchivementsComponent=false;
  }
  toggleListProductsCard(){
    this.showAdminContents = false
    this.showProductsListComponent=true
    this.showAddPointsComponent=false
    this.showAddProductsComponent = false
    this.showEmployeesComponent=false
    this.showRecentActivityComponent=false
    this.showAchivementsComponent=false;
  }
  toggleEmployeesCard() {
    this.showAdminContents = false
    this.showAddProductsComponent = false
    this.showEmployeesComponent=true
    this.showAddPointsComponent=false
    this.showProductsListComponent=false
    this.showRecentActivityComponent=false
    this.showAchivementsComponent=false;
  }
  toggleRecentActivityCard() {
    this.showAdminContents = false
    this.showAddProductsComponent = false
    this.showEmployeesComponent=false
    this.showAddPointsComponent=false
    this.showProductsListComponent=false
    this.showRecentActivityComponent=true
    this.showAchivementsComponent=false;
  }
  toggleAddAcheivementsCard(){
    this.showAdminContents = false
    this.showAddProductsComponent = false
    this.showEmployeesComponent=false
    this.showAddPointsComponent=false
    this.showProductsListComponent=false
    this.showRecentActivityComponent=false
    this.showAchivementsComponent=true;
  }
  private chunkProducts() {
    const chunkSize = 4;
    for (let i = 0; i < this.productList.length; i += chunkSize) {
      this.chunkedProducts.push(this.productList.slice(i, i + chunkSize));
    }
  }
  ordinal(num: number): string {
    const suffixes = ['st', 'nd', 'rd'];
    const remainder = num % 100;
    const suffix = suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0];
    return num + suffix;
  }
  showTextOnHover(button: string): void {
    this.showText = true;
    this.currentButton = button;
  }

  hideTextOnLeave(button: string): void {
    this.showText = false;
    this.currentButton = '';
  }
  signout() {
    this.authService.logout();
  }
}

 