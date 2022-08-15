import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { NgxUiLoaderService } from "ngx-ui-loader";


@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

    constructor(private ngxService: NgxUiLoaderService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.ngxService.start();
        return next.handle(req).pipe(
            finalize(() => this.ngxService.stop())
        );
    }

}