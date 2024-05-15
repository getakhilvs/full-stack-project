import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-adminproductlist',
  templateUrl: './adminproductlist.component.html',
  styleUrls: ['./adminproductlist.component.css']
})
export class AdminproductlistComponent implements OnInit {
  productList: any[] = []; //for ngonit
  imageArray : any[] = []; //for storing image data thats coming in arrays
  receivedData: any;
  employeeId!:number;
  totalPoints!:number;
  totalDebitPoints!:number;
  currentMerchName!:String;
  currentMerchCost!:number;
  currentMerchId!:number;
  chunkedProducts: any[][] | null = []; 

  constructor(private productService: ProductService,private commonService:CommonService,private snackBar:MatSnackBar, private router:Router) {}

  ngOnInit() {
    this.fetchProductList();

    this.commonService.getData().subscribe(data => {
      this.receivedData = data;
      console.log("receivedData", this.receivedData);
      this.totalPoints=this.receivedData.employeeTotalPoints;
      this.totalDebitPoints=this.receivedData.employeeTotalDebitPoints;
    });

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
  fetchProductList(): void {
    this.productService.getProductList().subscribe(
      (response) => {
        console.log('response', response);
        this.productList = response;
        this.chunkProducts();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  deleteProduct(merchId:number){
    this.productService.deleteProduct(merchId).subscribe(
      (response) => {
        this.openSnackBar('Product Deleted Successfully','success-snackbar');
        this.productList =[];
        this.fetchProductList();
      },
      (error) => {
        this.openSnackBar('Error ', 'error-snackbar');
      }
    );
  }
  editProduct(product: any) {
    this.productService.setSelectedProduct(product);
    this.router.navigate(['editproducts']);
  }
  openSnackBar(message: string, panelClass: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.panelClass = [panelClass];
    config.horizontalPosition = 'center';

    this.snackBar.open(message, 'Close', config);
  }
}
