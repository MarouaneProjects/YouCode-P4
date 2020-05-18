import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const currentAdmin = this.authenticationService.currentAdminValue;
        if (currentAdmin && currentAdmin.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentAdmin.token}`
                }
            });
        }

        return next.handle(request);
    }
}
