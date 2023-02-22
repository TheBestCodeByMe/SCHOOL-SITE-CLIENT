import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {LoginInfo} from "../models/login-info/login-info";
import {Router} from "@angular/router";
import {AskQuestionComponent} from "../askQuestion/ask-question.component";


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
          this.sendNotification('Неверные данные', {
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


  sendNotification(title, options, result) {
// Проверим, поддерживает ли браузер HTML5 Notifications
    if (!("Notification" in window)) {
      alert('Ваш браузер не поддерживает HTML Notifications, его необходимо обновить.');
    }

// Проверим, есть ли права на отправку уведомлений
    else if (Notification.permission === "granted") {
// Если права есть, отправим уведомление
      var notification = new Notification(title, options);

      function clickFunc() {
        alert(result);
      }

      notification.onclick = clickFunc;
    }

// Если прав нет, пытаемся их получить
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
// Если права успешно получены, отправляем уведомление
        if (permission === "granted") {
          var notification = new Notification(title, options);

        } else {
          alert('Вы запретили показывать уведомления'); // Юзер отклонил наш запрос на показ уведомлений
        }
      });
    } else {
// Пользователь ранее отклонил наш запрос на показ уведомлений
// В этом месте мы можем, но не будем его беспокоить. Уважайте решения своих пользователей.
    }

  }
}
