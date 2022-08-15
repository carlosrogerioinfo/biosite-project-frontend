import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { BaseService } from "src/app/services/base.service";
import { BiomarkerResponse } from "../models/biomarker";
import { LocalStorageUtils } from "../utils/localstorage";

@Injectable()
export class BiomarkerService extends BaseService {

    constructor(private http: HttpClient, private storage: LocalStorageUtils) { super(); }

    private token = this.storage.getTokenFromStorage();

    get() : Observable<BiomarkerResponse>{

        let response = this.http
            .get(this.UrlService + '/biomarker/get', this.getHeaderAuthJson(this.token))
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );

        return response;
    }

    post(request: BiomarkerResponse) : Observable<BiomarkerResponse>{

        let response = this.http
            .post(this.UrlService + '/biomarker/save', request, this.getHeaderAuthJson(this.token))
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );

        return response;
    }

    put(request: BiomarkerResponse) : Observable<BiomarkerResponse>{

        let response = this.http
            .put(this.UrlService + '/biomarker/put', request, this.getHeaderAuthJson(this.token))
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );

        return response;
    }

    delete(request: BiomarkerResponse) : Observable<BiomarkerResponse>{

        let response = this.http
            .put(this.UrlService + '/biomarker/delete', request, this.getHeaderAuthJson(this.token))
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );

        return response;
    }

}