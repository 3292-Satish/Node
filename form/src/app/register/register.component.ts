import { Component } from '@angular/core'
import { AuthenticateService, regPayload } from '../authentication.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";



@Component({
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    registerForm: FormGroup;
    submitted: false;
    img: any;
    public imagePath: any;
    imgURL: any;
    public message: string;
    urls = []
    updateUser: any
    update: any
    
   
    
    ngOnInit() {
        this.activate.paramMap.subscribe((params: ParamMap) => {
           this.update = params.get('action');
           if(this.update == "update"){
              this.updateUser = this.auth.getUserDetails();
              console.log(this.updateUser);
            //   this.registerForm.controls['first_name'].setValue(this.updateUser.first_name);
            //   this.registerForm.controls['last_name'].setValue(this.updateUser.last_name);
           }
      })


        this.registerForm = this.fb.group({
            first_name: ['', [Validators.required, Validators.minLength(4)]],
            last_name: ['', [Validators.required, Validators.minLength(4)]],
            email: ['', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+[.]{1}[a-z]{2,}$')]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            img: ['']
        });
        
    }

//  - - - - - - - - - - - for Single File Upload- - - -- - -- -- - - //
    selectImg(event) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            this.img = event.target.files[0];
            //this function displays the selected image
            reader.onload = (event: any) => {
              this.imgURL = event.target.result;
            }
            reader.readAsDataURL(event.target.files[0]);
          }
          let file = event.target.files[0]; // <--- File Object for future use.
          this.imagePath = file;
    }
    // - --  -- - - - - - - - - For Multiple file upload __- - - - - - -- -
    selectImage(event) {
        this.urls = []
        let files= event.target.files;
        if (files) {
            for (let file of files) {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                //this function displays the selected image
                reader.onload = (_event: any) => {
                    this.urls.push(reader.result);
                }
                console.log(this.urls.length)               
            }
            let f = event.target.result; // <--- File Object for future use.
            this.imagePath = f;
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

    constructor(private auth: AuthenticateService, private router: Router, private fb: FormBuilder, private activate : ActivatedRoute) { }
    register() {
        this.auth.upload(this.img).subscribe(data => {
            this.credentials = this.registerForm.value;
            this.credentials.img = data.filename;
            this.auth.register(this.credentials).subscribe(
                (data) => {
                    console.log('11111', data);
                    if(data.Error){
                        alert(data.Error);
                    }else{
                        this.router.navigateByUrl('/login')
                        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value.email, null, 4));
                    }
                },
                err => {
                    console.error(err)
                }
            )
            
        }, err => { });
    }


    onReset() {
        this.submitted = false;
        this.registerForm.reset();
        console.log("Form Cancel!")
    }
}