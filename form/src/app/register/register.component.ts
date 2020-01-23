import { Component } from '@angular/core'
import { AuthenticateService, regPayload } from '../authentication.service'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    registerForm: FormGroup;
    submitted: false;
    img: any;


    ngOnInit() {

        this.registerForm = this.fb.group({
            first_name: ['', [Validators.required, Validators.minLength(4)]],
            last_name: ['', [Validators.required, Validators.minLength(4)]],
            email: ['', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+[.]{1}[a-z]{2,}$')]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            img: ['']
        });
    }


    selectImg(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.img = file;

        }
    }

    get f() { return this.registerForm.controls; }

    credentials: regPayload = {
        _id: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        img: ''
    }

    constructor(private auth: AuthenticateService, private router: Router, private fb: FormBuilder) { }
    register() {
        this.auth.upload(this.img).subscribe(data => {
            this.credentials = this.registerForm.value;
            this.credentials.img = data.filename;
            this.auth.register(this.credentials).subscribe(
                () => {
                    // this.router.navigateByUrl('/home')
                    console.log('11111', this.credentials);
                },
                err => {
                    console.error(err)
                }
            )
            alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value.email, null, 4));
        }, err => { });
    }


    onReset() {
        this.submitted = false;
        this.registerForm.reset();
        console.log("Form Cancel!")
    }
}