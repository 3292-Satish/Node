import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
import { } from "@angular/forms";

export interface UserDetails {
  _id: string
  first_name: string
  last_name: string
  email: string
  password: string
  img: string
  exp: number
  iat: number
}

interface TokenResponse {
  token: string
}

export interface regPayload {
  _id: string
  first_name: string
  last_name: string
  email: string
  password: string
  img: string
}

@Injectable()
export class AuthenticateService {
  private token: string;
  // url = "http://localhost:3000";



  constructor(private http: HttpClient, private router: Router) { }
  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token)
    this.token = token
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken')
    }
    return this.token
  }

  onEdit(usr) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', null);
    headers.set('Accept', "multipart/form-data");
    let params = new HttpParams();
    let formData = new FormData();
      formData.append("_id", usr._id),
      formData.append("first_name", usr.first_name),
      formData.append("last_name", usr.last_name),
      formData.append("email", usr.email),
      formData.append("img", usr.img);
    return this.http.put("/users/update", usr, { params, headers });
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } else {
      return null
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if (user) {
      return user.exp > Date.now() / 1000000
      return false
    }
  }

  public upload(img): Observable<any> {
    var formData = new FormData();
    formData.append('img', img);
    return this.http.post('/users/upload', formData)
  }

  public resetPass(email): Observable<any> {
    let headers = new HttpHeaders();
    headers.set('Content-Type', null);
    headers.set('Accept', "multipart/form-data");
    let params = new HttpParams();
    let Email = {'email': email};
      return this.http.post('/users/resetPass', Email, { params, headers});
  }

  public register(user: regPayload): Observable<any> {

    const base = this.http.post(`/users/register`, user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )

    return request
  }

  public login(user: regPayload): Observable<any> {

    const base = this.http.post(`/users/login`, user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )

    return request
  }


  public profile(): Observable<any> {

    return this.http.get(`/users/profile`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('/')
  }
}