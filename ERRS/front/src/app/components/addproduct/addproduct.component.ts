import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  productForm!:FormGroup;
  base64Image: string | null = null;
  @Input() showProductForm!: boolean;
  @Output() showProductFormChange = new EventEmitter<boolean>();

    constructor(private fb: FormBuilder,private snackBar:MatSnackBar,private employeeService:EmployeeService, private productService:ProductService, private router: Router) { }

    ngOnInit() {
      
      this.productForm = this.fb.group({
        merchName: ['', Validators.required],
        merchCategory: ['', Validators.required],
        merchSINO:['',Validators.required],
        merchDescription: [null, Validators.required,],
        merchManufacturer: [null, Validators.required],
        merchQuantity: ['', Validators.required],
        merchPoints: [null, Validators.required],
        base64Image: ['', [Validators.required]],
        merchRedemptionConditions: ['', Validators.required],
        
      });
      
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
        this.productService.createProduct(formData)
          .subscribe(
            (response: any) => {
              if (response === null) {
                this.openSnackBar('Product already exists. Please choose a different SINO or update the existing product.','success-snackbar');
                console.log("Product already exists. Please choose a different name or update the existing product.");
              } else {
                this.openSnackBar("Product Added Successfully",'success-snackbar');
                this.router.navigate(['/admin']);
                this.showProductFormChange.emit(false)
              }
            },
            (error: any) => {
              this.openSnackBar('Error creating Product', 'error-snackbar');
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

  
  prepareFormData(): FormData {
    const formData = new FormData();
    formData.append('productCode', this.productForm.get('productCode')?.value);
    formData.append('description', this.productForm.get('description')?.value);
    formData.append('category', this.productForm.get('category')?.value);
    formData.append('manufacturer', this.productForm.get('manufacturer')?.value);
    formData.append('quantityAvailable', this.productForm.get('quantityAvailable')?.value);
    return formData;
  }
}