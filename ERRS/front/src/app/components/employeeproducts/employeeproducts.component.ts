import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-employeeproducts',
  templateUrl: './employeeproducts.component.html',
  styleUrls: ['./employeeproducts.component.css']
})
export class EmployeeproductsComponent implements OnInit{
  productList: any[] | null = null; 
  imageArray : any[] = []; //for storing image data thats coming in arrays
  receivedData: any;
  employeeId!:number;
  totalPoints!:number;
  totalDebitPoints!:number;
  currentMerchName!:String;
  currentMerchCost!:number;
  currentMerchId!:number;
  chunkedProducts: any[][] | null = []; //to group the orders into 5 rows each,we are going to insert 5 elements 5 elements to this.

  constructor(private snackBar:MatSnackBar,private productService: ProductService,private commonService:CommonService,private router:Router) {}

  ngOnInit() {
    this.fetchProductList();

    this.commonService.getData().subscribe(data => {
      this.receivedData = data;
      console.log("receivedData", this.receivedData);
      this.totalPoints=this.receivedData.employeeTotalPoints;
      this.totalDebitPoints=this.receivedData.employeeTotalDebitPoints;
    });

  }
  fetchProductList() {
    this.productService.getProductList().subscribe(
      (response) => {
        this.productList = response;
        this.chunkProducts();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  handleSubmit(currentMerchName:String, currentMerchCost:number,currentMerchId:number){
    this.currentMerchName=currentMerchName;
    this.currentMerchCost=currentMerchCost;
    this.currentMerchId=currentMerchId
    this.commonService.getData().subscribe(data => {
      this.receivedData = data;
      this.employeeId=this.receivedData.employeeId;
    });
    this.productService.buyProduct(this.currentMerchName, this.currentMerchCost, this.currentMerchId,this.employeeId).subscribe(
      (response) => {
        this.openSnackBar('Successfully bought the product','success-snackbar');
        this.fetchProductList();
      },
      (error) => {
        this.openSnackBar('Error ', 'error-snackbar');
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
  private chunkProducts() {
    this.chunkedProducts = null; 
  
    const chunkSize = 4;
    if (this.productList !== null) {
      for (let i = 0; i < this.productList.length; i += chunkSize) {
        if (this.chunkedProducts === null) {
          this.chunkedProducts = []; 
        }
        if (this.chunkedProducts !== null) {
          this.chunkedProducts.push(this.productList.slice(i, i + chunkSize));
        }
      }
    } else {
      console.error('Product list is null. Unable to chunk products.');
    }
  }
  

}
