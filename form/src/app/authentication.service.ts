import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
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
  img: Object
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
      return user.exp > Date.now() / 1000
    } else {
      return false
    }
  }

  public upload(img): Observable<any>{
    var formData= new FormData;
    formData.append('img', img);
    let uplod = this.http.post('/users/upload', formData)
    return uplod;
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