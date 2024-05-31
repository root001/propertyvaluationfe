import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { appConstants } from '../../core/constants/constant';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObject: Login;

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {
    this.loginObject = new Login();
  }
  

  onLogin() {
  //  debugger;
    /**
     * this.http.post(appConstants.baseUrl+appConstants.loginEndpoint, this.loginObject).subscribe((res:any)=>{
      if(res.result) {
        alert(appConstants.loginSuccessMsg);
        localStorage.setItem('token', res.data.token)
        this.router.navigateByUrl(appConstants.landingPage)
      } else {
        alert(res.message)
      }
    })
     */
    this.snackBar.open(appConstants.loginSuccessMsg, 'close', {
      duration: 3000
    });
    console.log("logging in user");
    this.router.navigateByUrl(appConstants.landingPage);
  }
}

export class Login { 
    User: string;
    Password: string;
    constructor() {
      this.User = '';
      this.Password = '';
    } 
}
