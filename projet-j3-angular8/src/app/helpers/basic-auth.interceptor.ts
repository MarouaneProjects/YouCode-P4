import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        const currentAdmin = this.authenticationService.currentAdminValue;
        if (currentAdmin && currentAdmin.authdata) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Basic ${currentAdmin.authdata}`
                }
            });
        }

        return next.handle(request);
    }
}