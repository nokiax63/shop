import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HightlightDirective } from './directives/hightlight.directive';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HightlightDirective, OrderByPipe],
  imports: [
  ],
  exports: [HightlightDirective, OrderByPipe, CommonModule, FormsModule]
})
export class SharedModule { }
