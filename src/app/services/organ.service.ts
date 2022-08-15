import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { BaseService } from "src/app/services/base.service";
import { OrganResponse } from "../models/organ";
import { LocalStorageUtils } from "../utils/localstorage";

@Injectable()
export class OrganService extends BaseService {

    constructor(private http: HttpClient, private storage: LocalStorageUtils) { super(); }

    private token = this.storage.getTokenFromStorage();

    getAll() : Observable<OrganResponse>{

        let response = this.http
            .get(this.UrlService + '/organs/get', this.getHeaderAuthJson(this.token))
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );

        return response;
    }
}