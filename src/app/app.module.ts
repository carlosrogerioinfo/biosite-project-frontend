import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { AuthenticationService } from './services/authentication.service';

import { BiomarkerService } from './services/biomarker.service';
import { OrganService } from './services/organ.service';
import { DropdownUtils } from './utils/dropdown-utils';
import { LocalStorageUtils } from './utils/localstorage';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { NgxUiLoaderModule, NgxUiLoaderConfig } from "ngx-ui-loader";
import { HelperUtils } from './utils/helper';

//NGX-LOADER
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
    "bgsColor": "#53fffd",
    "bgsOpacity": 0.5,
    "bgsPosition": "bottom-right",
    "bgsSize": 60,
    "bgsType": "ball-spin-clockwise",
    "blur": 0,
    "delay": 0,
    "fastFadeOut": true,
    "fgsColor": "#00aeff",
    "fgsPosition": "center-center",
    "fgsSize": 60,
    "fgsType": "ball-spin-clockwise",//"ball-scale-multiple"
    "gap": 24,
    "logoPosition": "center-center",
    "logoSize": 120,
    "logoUrl": "",
    "masterLoaderId": "master",
    "overlayBorderRadius": "0",
    "overlayColor": "rgba(250,250,250,0.8)",
    "pbColor": "#00aeff",
    "pbDirection": "ltr",
    "pbThickness": 3,
    "hasProgressBar": true,
    "text": "",
    "textColor": "#FFFFFF",
    "textPosition": "center-center",
    "maxTime": -1,
    "minTime": 300
};

@NgModule({
    declarations: [
        AppComponent,

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,

        AppLayoutModule,

        //loader
        NgxUiLoaderModule,
        NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)

        ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SpinnerInterceptor,
            multi: true
        },
        BiomarkerService,
        OrganService,
        AuthenticationService,
        LocalStorageUtils,
        HelperUtils,
        DropdownUtils,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
