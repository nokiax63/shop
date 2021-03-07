import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/order/models';
import { OrderService } from 'src/app/order/services';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders!: Observable<Array<Order>>;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orders = this.orderService.getOrders();
  }

  onViewOrder(order: any): void {

  }
}
