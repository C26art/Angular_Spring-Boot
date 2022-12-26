import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product';
import { delay, first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly API = '/api/products';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Product[]>(this.API)
      .pipe(
        first(),
        delay(1000)
      );
  }

  save(record: Partial<Product>) {
    return this.httpClient.post<Product>(this.API, record).pipe(first());    
  }
}
