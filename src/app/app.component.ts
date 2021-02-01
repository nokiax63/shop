import { AfterViewInit, Component, ElementRef, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { csInstanse, ConstantsService } from './core/services/constants.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    {provide: ConstantsService, useValue: csInstanse }
  ]
})
export class AppComponent implements AfterViewInit, OnInit  {
  @ViewChild('appTitle') appTitle!: ElementRef;

  name = 'Easy shop';
  description = '';
  title = 'shop';

  constructor(
    @Optional() private constantService: ConstantsService){

  }

  ngOnInit(): void {
    this.description = this.constantService.ShopApp.API_URL;
  }

  ngAfterViewInit(): void {
    this.appTitle.nativeElement.textContent = this.constantService ? this.constantService.ShopApp.App : this.name;
  }
}

