import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from 'src/app/order/models';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Input()order!: Order;
  @Output() viewOrder: EventEmitter<Order> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onDetails(): void {
    this.viewOrder.emit(this.order);
  }

}
