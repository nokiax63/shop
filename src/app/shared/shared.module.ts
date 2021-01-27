import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HightlightDirective } from './directives/hightlight.directive';


@NgModule({
  declarations: [HightlightDirective],
  imports: [
    CommonModule
  ],
  exports: [HightlightDirective]
})
export class SharedModule { }
