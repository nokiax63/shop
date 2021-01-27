import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit  {
  @ViewChild('appTitle') appTitle!: ElementRef;

  name = 'Easy shop';
  title = 'shop';

  ngAfterViewInit(): void {
    this.appTitle.nativeElement.textContent = this.name;
  }
}

