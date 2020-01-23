import { Component } from '@angular/core'
import { AuthenticateService, regPayload } from '../authentication.service'
import { Router } from '@angular/router'
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted: false;

  credentials: regPayload = {
    _id: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    img: ''
  }

  constructor(private auth: AuthenticateService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+[.]{1}[a-z]{2,}$')]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });
}
get f() { return this.loginForm.controls; }

  login() {
    this.auth.login(this.credentials).subscribe(
      () => {
        alert("login Successful "+ JSON.stringify(this.loginForm.value.email, null, 4));
        this.router.navigateByUrl('/profile')
      },
      err => {
        console.error(err)
      }
    )
  }

  onReset() {
    this.submitted = false;
    this.loginForm.reset();
    console.log("Form Cancel!")
}
}