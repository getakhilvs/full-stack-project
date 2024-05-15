import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-editproducts',
  templateUrl: './editproducts.component.html',
  styleUrls: ['./editproducts.component.css']
})
export class EditproductsComponent implements OnInit {
  productForm!:FormGroup;
  base64Image: string | null = null;
  id!:number;
  selectedProduct: any;

    constructor(private fb: FormBuilder,private snackBar:MatSnackBar,private employeeService:EmployeeService, private productService:ProductService, private router: Router) { }

    ngOnInit() {
      this.productForm = this.fb.group({
        merchName: ['', Validators.required],
        merchCategory: ['', Validators.required],
        merchDescription: [null, Validators.required,],
        merchManufacturer: [null, Validators.required],
        merchQuantity: ['', Validators.required],
        merchPoints: [null, Validators.required],
        base64Image: ['', [Validators.required]],
        merchRedemptionConditions: ['', Validators.required],
      });
      const selectedProduct = this.productService.getSelectedProduct();
      
    // Set the form values with the selected product details
    if (selectedProduct) {
      
      this.productForm.patchValue({
        merchName: selectedProduct.merchName,
        merchCategory: selectedProduct.merchCategory,
        merchDescription: selectedProduct.merchDescription,
        merchManufacturer: selectedProduct.merchManufacturer,
        merchQuantity: selectedProduct.merchQuantity,
        merchPoints: selectedProduct.merchPoints,
        base64Image: selectedProduct.base64Image,
      });
      this.id=selectedProduct.merchId
    }
    }

    onFileSelected(event: any): void {
      const file: File = event.target.files[0];
      const reader = new FileReader();
  
        reader.onloadend = () => {
          const base64Image = reader.result as string;
          console.log(base64Image);
          this.productForm.patchValue({
            base64Image
          });
        };
        if (file) {
    
          reader.readAsDataURL(file);
        }
    }

    onSubmit() {
      if (this.productForm.valid) {
        const formData = this.productForm.value;
        this.productService.updateProduct({...formData,merchId:this.id})
          .subscribe(
            (response: any) => {
              if (response === null) {
                this.openSnackBar('Error ', 'error-snackbar');
                console.log("error");
              } else {
                this.openSnackBar('Product updated Successfully','success-snackbar');
                this.router.navigate(['/admin']);
              }
            },
            (error: any) => {
              this.openSnackBar('Error update product ', 'error-snackbar');
              console.error('Error creating Product', error);
            }
          );
      } else {
        console.log('Form is invalid');
      }
    }
    

  
  prepareFormData(): FormData {
    const formData = new FormData();
    formData.append('productCode', this.productForm.get('productCode')?.value);
    formData.append('description', this.productForm.get('description')?.value);
    formData.append('category', this.productForm.get('category')?.value);
    formData.append('manufacturer', this.productForm.get('manufacturer')?.value);
    formData.append('expiryDate', this.productForm.get('expiryDate')?.value);
    formData.append('quantityAvailable', this.productForm.get('quantityAvailable')?.value);
    formData.append('termsAndConditions', this.productForm.get('termsAndConditions')?.value);
    formData.append('featured', this.productForm.get('featured')?.value);
    return formData;
  }
  openSnackBar(message: string, panelClass: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.panelClass = [panelClass];
    config.horizontalPosition = 'center';

    this.snackBar.open(message, 'Close', config);
  }
}
