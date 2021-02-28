import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/admin/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  isDirty = true;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const resolvedData: Product = this.route.snapshot.data.resolvedData;
    console.log(resolvedData);
  }
}