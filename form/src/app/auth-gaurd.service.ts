import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthenticateService } from "./authentication.service";

@Injectable()
export class AuthGaurdService implements CanActivate{
    constructor(private auth: AuthenticateService, private router: Router) {}
        
    canActivate(){
        if(!this.auth.isLoggedIn()){
            this.router.navigateByUrl('/');
            return false;
        }
        return true;
    }
}