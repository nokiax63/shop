import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent, ProductFormComponent } from './components';

const routes: Routes = [
  {
    path: 'home',
    component: ProductListComponent
  },
  {
    path: 'edit/:productId',
    component: ProductFormComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
