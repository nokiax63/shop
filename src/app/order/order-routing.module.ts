import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessOrderComponent } from './components';
import { OrderComponent } from './order.component';

const routes: Routes = [
  {
    path: 'order',
    component: OrderComponent,
    children: [
        {
            path: 'process',
            component: ProcessOrderComponent
        }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class OrderRoutingModule {
    static components = [OrderComponent, ProcessOrderComponent];
  }
