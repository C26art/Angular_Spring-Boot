import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Product } from '../../models/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products$: Observable <Product[]>;
 

  constructor(private productService: ProductService,
    public dialog: MatDialog, private router: Router,
    private route: ActivatedRoute) {
    this.products$ = this.productService.list()
    .pipe(
      catchError(error => {
        this.OnError('Error Loading Products.');
        return of ([])
      })
    );
  }

  OnError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit (): void {
  }

  onAdd() {
    this.router.navigate(['/new'], {relativeTo: this.route});
  }
}
