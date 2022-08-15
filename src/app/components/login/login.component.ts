import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LoginRequest } from 'src/app/models/login';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HelperUtils } from 'src/app/utils/helper';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .p-password input {
            width: 100%;
            padding:1rem;
        }

        :host ::ng-deep .pi-eye{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }

        :host ::ng-deep .pi-eye-slash{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];
    email!: string;
    password!: string;
    errors: any[] = [];

    constructor(
        public layoutService: LayoutService,
        private authentication: AuthenticationService,
        private storage: LocalStorageUtils,
        private router: Router,
        private helper: HelperUtils) {
            this.storage.clearAllUserDataLocalStorage();
        }

    login(){

        if (this.email?.trim() == undefined || this.password?.trim() == undefined){
            this.helper.showNotification('Autenticação', 'E-mail e senha devem ser preenchidos!');
        }else{
            const login = Object.assign( new LoginRequest(), {
                email: this.email,
                password: this.password
            });

            this.authentication.login(login)
            .subscribe(
                success => {
                    this.storage.saveUserToken(success.token);
                    this.getInfoProfile();
                },
                fail => {this.onFail(fail)}
            );
        }
    }

    getInfoProfile(){
        const login = Object.assign( new LoginRequest(), {
            email: this.email,
            password: this.password
        });

        this.authentication.info(login)
        .subscribe(
            success => {this.onSuccess(success)},
            fail => {this.onFail(fail)}
        );
    }

    onSuccess(response: any){
        this.errors = [];
        this.storage.saveAllUserDataLocalStorage(response);
        this.router.navigate(['/']);
    }

    onFail(fail: any){
        this.errors = fail.error.errors;
    }

}
