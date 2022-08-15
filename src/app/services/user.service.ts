import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { BaseService } from "src/app/services/base.service";
import { UserRequest, UserResponse } from "../models/user";

@Injectable()
export class UserServicea extends BaseService {

    constructor(private http: HttpClient) { super(); }

    getToken(request: UserRequest) : Observable<UserResponse>{

        let response = this.http
            .post(this.UrlAuthentication + '/authentication/login', request, this.getHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );

        return response;
    }

}