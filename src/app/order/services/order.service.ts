import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, publish, refCount, retry } from 'rxjs/operators';
import { Order } from '../models/order';
import { OrdersAPI } from '../order.config';

@Injectable()
export class OrderService {

    constructor(private http: HttpClient,
        @Inject(OrdersAPI) private ordersUrl: string
    ) { }


    getOrders(): Observable<Order[]> {
        return this.http.get<Array<Order>>(this.ordersUrl).pipe(
            retry(3),
            publish(),
            refCount(),
            catchError(this.handleError)
        );
    }


    createOrder(user: Order): Observable<Order> {
        const url = this.ordersUrl;
        const body = JSON.stringify(user);
        const options = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        return this.http
            .post<Order>(url, body, options)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(err: HttpErrorResponse) {
        // A client-side or network error occurred.
        if (err.error instanceof Error) {
            console.error('An error occurred:', err.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
        return throwError('Something bad happened; please try again later.');
    }
}
