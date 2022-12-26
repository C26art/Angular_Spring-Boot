import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/Product';
import { ProductService } from '../../services/product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit{

  formProduct = this.formBuilder.group({
      _id: [''],
      name: [''],
      amount: [''],
      purchasePrice: [''],
      percentage: [''],
      saleValue: [''],
      category: [''],
      supplier: [''],
      corporateName: [''],
      cnpj: [''],
      phone: [''],
  });

  constructor(private formBuilder: NonNullableFormBuilder, private productService: ProductService, private snackBar: MatSnackBar, private location: Location) { }

  ngOnInit(): void {  
      
  }

  onSubmit() {
    this.productService.save(this.formProduct.value)
      .subscribe({
        next: (result: Product) => {
          this.onSuccess()
        },
        error: (err) => {
          this.onError()
          console.error(err)
        }
      });
  }

  onCancel() {   
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Product saved successfully!', '', { duration: 5000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('error saving product.', '', { duration: 5000 });
  }

  
}


  
