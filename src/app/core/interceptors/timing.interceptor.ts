import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TimingInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        
        console.time('httpResponse');
        return next.handle(request).pipe(event => {
            if (event instanceof HttpResponse) {
                console.timeEnd('httpResponse');
            }
            console.timeLog('httpResponse');
            return event;
        });
    }
}