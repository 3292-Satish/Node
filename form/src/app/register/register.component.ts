import { Component } from '@angular/core'
import { AuthenticateService, TokenPayload } from '../authentication.service'
import { Router } from '@angular/router'

@Component({
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    credentials: TokenPayload = {
        _id: '',
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    }

    constructor(private auth: AuthenticateService, private router: Router) { }

    register() {
        this.auth.register(this.credentials).subscribe(
            () => {
                this.router.navigateByUrl('/profile')
            },
            err => {
                console.error(err)
            }
        )
    }
}