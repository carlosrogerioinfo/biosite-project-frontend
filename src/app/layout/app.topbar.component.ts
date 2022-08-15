import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LocalStorageUtils } from '../utils/localstorage';
import { LayoutService } from "./service/app.layout.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    constructor(public layoutService: LayoutService, private storage: LocalStorageUtils) { }

    logOff(){
        this.storage.clearAllUserDataLocalStorage();
    }
}
