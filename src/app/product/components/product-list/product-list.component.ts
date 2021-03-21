import { Component, OnInit } from '@angular/core';
import { IProduct, Product } from '../../models/product';
import * as ProductActions from '../../../core/@ngrx/product/product.action'
import { CommunicationService } from '../../../order/services/communication.service';
import { Router } from '@angular/router';

// @Ngrx
import { Store } from '@ngrx/store';
import { AppState, } from './../../../core/@ngrx/app.state'

// rxjs
import { Observable } from 'rxjs';
import { ProductsState } from 'src/app/core/@ngrx';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productState$!: Observable<ProductsState>;
  productsInCart: Product[] = [];

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private communicationService: CommunicationService) {
  }

  ngOnInit(): void {
    console.log('We have a store! ', this.store);
    this.productState$ = this.store.select('products');
    this.store.dispatch(ProductActions.getProducts());
  }

  onEditProduct(product: any): void {
    const link = ['/edit', product.id];
    this.router.navigate(link);

  }

  onViewProduct(product: any): void {
    const link = ['/details', product.id];
    this.router.navigate(link);
  }

  onBuyProduct(product: any): void {
    this.communicationService.publishData(product);
  }
}
