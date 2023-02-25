import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {LoginInfo} from "../models/login-info/login-info";
import {Router} from "@angular/router";
import {AskQuestionComponent} from "../askQuestion/ask-question.component";
import {MainComponent} from "../main/main.component";


@Component({
  selector: 'app-main',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css',
    './assets/bootstrap/css/bootstrap.min.css'
  ]
})
export class SignInComponent implements OnInit {
  autorization() {

  }

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: LoginInfo;
  isSignUpFailed = false;

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

  onSubmit() {
    console.log('test this form');
    console.log(this.form);

    this.loginInfo = new LoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUsername(data.login);
        this.tokenStorage.saveAuthorities(data.roles);
        this.tokenStorage.saveIdUser(data.id.toString());

        this.isSignUpFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();

        if (this.roles.toString() == "ROLE_TEACHER") {
          this.gotoMenuTeacher()
        } else if (this.roles.toString() == "ROLE_PUPIL") {
          this.gotoMenuPupil()
        } else if (this.roles.toString() == "ROLE_DIRECTOR") {
          this.gotoMenuDirector()
        } else {
          this.reloadPage();
        }
      },
      error => {
        console.log(error);
        if(error!=null) {
          MainComponent.sendNotification('Неверные данные', {
              body: 'Введены неверные данные! Проверьте логин и пароль, а после попробуйте снова :)',
              icon: 'icon.jpg',
              dir: 'auto'
            },
            'Операция не выполнена')
          //this.errorMessage = "Введены неверные данные! Проверьте логин и пароль, а после попробуйте снова :)"//error.error.message;
          //this.isSignUpFailed = true;
        }
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  gotoMenuTeacher() {
    this.router.navigate(['/menuTeacher']);
  }

  gotoMenuPupil() {
    this.router.navigate(['/menuStudent']);
  }

  gotoMenuDirector() {
    this.router.navigate(['/menuDirector']);
  }
}
