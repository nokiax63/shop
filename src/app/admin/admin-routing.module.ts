import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ProductListComponent, ProductFormComponent, ProductComponent, ProductViewComponent, OrderListComponent, OrderComponent } from './components';
import { AdminGuard } from './guards/admin.guard';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { EditResolver } from './guards/edit-resolver.guard';

const routes: Routes = [

    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminGuard],
        children: [
            {
                path: '',
                redirectTo: 'product-list',
                pathMatch: 'full'
            },
            {
                path: 'order-list',
                component: OrderListComponent
            },
            {
                path: 'product-list',
                component: ProductListComponent
            },
            {
                path: 'product-add',
                component: ProductFormComponent
            },
            {
                path: 'product-details/:productId',
                component: ProductViewComponent
            },
            {
                path: 'product-edit/:productId',
                component: ProductFormComponent,
                canDeactivate: [CanDeactivateGuard],
                resolve: { resolvedData: EditResolver }
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
    static components = [
        ProductListComponent,
        ProductFormComponent, 
        ProductViewComponent, 
        ProductComponent,
        OrderComponent
    ];
}
