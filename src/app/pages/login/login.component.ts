import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { appConstants } from '../../core/constants/constant';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DataServiceService } from '../../core/data-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObject: Login;

  constructor(private router: Router, private snackBar: MatSnackBar, private dataService:DataServiceService) {
    this.loginObject = new Login();
  }
  
  onLogin() {
  //  debugger;
    let postRequest = {
      url: appConstants.baseUrl + appConstants.loginEndpoint,
      data: this.loginObject
    };
    this.dataService.postAPI(postRequest).subscribe(
      (response: any) => {
        if (response) {
          localStorage.setItem('token', response.token)
          this.snackBar.open(appConstants.loginSuccessMsg, 'close', {
            duration: 3000
          });
          this.router.navigateByUrl(appConstants.landingPage);
        }
      },
      error => {
        this.snackBar.open(appConstants.loginErrorMsg, 'close', {
          duration: 3000
        });
      });
  }
}

export class Login { 
    username: string;
    password: string;
    constructor() {
      this.username = '';
      this.password = '';
    } 
}
