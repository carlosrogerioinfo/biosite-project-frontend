import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { BaseService } from "src/app/services/base.service";
import { LoginRequest } from "../models/login";
import { AuthResponse, UserResponse } from "../models/user";
import { LocalStorageUtils } from "../utils/localstorage";

@Injectable()
export class AuthenticationService extends BaseService {

    constructor(private http: HttpClient, private storage: LocalStorageUtils) { super(); }

    login(request: LoginRequest) : Observable<AuthResponse>{

        let response = this.http
            .post(this.UrlAuthentication + '/authentication/login', request, this.getHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );

        return response;
    }

    info(request: LoginRequest) : Observable<UserResponse>{

        const ctoken = this.storage.getTokenFromStorage();

        let response = this.http
            .post(this.UrlService + '/profile/info', request, this.getHeaderAuthJson(ctoken))
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );

        return response;
    }
}