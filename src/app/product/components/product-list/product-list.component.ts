import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/product';
import { CommunicationService } from '../../../order/services/communication.service';
import { Router } from '@angular/router';

// @Ngrx
import { Store } from '@ngrx/store';
import * as ProductActions from '../../../core/@ngrx/product/product.action'

// rxjs
import { Observable } from 'rxjs';
import { selectProductsData, selectProductsError } from 'src/app/core/@ngrx';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products$!: Observable<ReadonlyArray<IProduct>>;
  productsError$!: Observable<Error | string>;

  constructor(
    private store: Store,
    private router: Router,
    private communicationService: CommunicationService) {
  }

  ngOnInit(): void {
    this.products$ = this.store.select(selectProductsData);
    this.productsError$ = this.store.select(selectProductsError);
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
