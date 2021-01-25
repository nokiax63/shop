import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from 'src/app/product/models/product';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  // Observable string sources
  private channel = new Subject<Product>();

  // Observable string streams
  public channel$ = this.channel.asObservable();

  // Service message commands
  publishData(data: Product): void {
    this.channel.next(data);
  }
}
