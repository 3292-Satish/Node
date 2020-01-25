
import { Component } from '@angular/core'
import { AuthenticateService, UserDetails } from '../authentication.service'
import { Router } from "@angular/router";

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  details: UserDetails
 

  constructor(private auth: AuthenticateService, private router: Router) {}

  ngOnInit() {
    this.auth.profile().subscribe(
      user => {
        this.details = user
      },
      err => {
        console.error(err)
      }
    )
  }

  userHobby(){
    this.router.navigate(['/hobby'])
  }

  onUpdate(x, y, z){
    let form = new FormData();
   
    let f= {
      "_id": this.details._id,
     "first_name": x.innerHTML,
      "last_name": y.innerHTML,
     "email": z.innerHTML,
      'img': this.details.img
    }
    this.auth.onEdit(f).subscribe(data=>{
      alert(data["status"])
    },err=>{
      console.log("error", err)
    })
  }

//   onDelete(){
//     this.auth.delete(this.dlt).subscribe(()=>{
//       console.log('')
//     });
//   }
onImgErr(event){
  event.target.src='/assets/2.jpg'
}
}