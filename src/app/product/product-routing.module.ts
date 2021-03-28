import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent, ProductFormComponent, ProductViewComponent } from './components';
import { ProductsStatePreloadingGuard, ProductExistsGuard } from './guards';

const routes: Routes = [
  {
    path: 'home',
    component: ProductListComponent,
    canActivate: [ProductsStatePreloadingGuard],
  },
  {
    path: 'details/:productId',
    component: ProductViewComponent,
    canActivate: [ProductExistsGuard]
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
