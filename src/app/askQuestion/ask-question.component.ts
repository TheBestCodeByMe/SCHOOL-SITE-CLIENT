import {Component, OnInit} from '@angular/core';
import {QuestionService} from "../models/questions/question.service";
import {Question} from "../models/questions/question";


@Component({
  selector: 'app-main',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css',
    './assetsAskQuestion/bootstrap/css/bootstrap.min.css'
  ]
})
export class AskQuestionComponent implements OnInit {

  question: Question = new Question();
  pass;
  notification;
  result;

  constructor(private questionService: QuestionService) {
  }

  ngOnInit() {
    this.reloadData()
    Notification.requestPermission(function (permission) {
      console.log('Результат запроса прав:', permission);
    });
  }

  reloadData() {
    this.questionService.getPass().subscribe(data => this.pass = data)
  }

  addQuestion() {
    if (this.question.question!=null) {
      this.questionService.createQuestion(this.question)
        .subscribe(data => console.log(data), error => console.log(error));
      this.sendNotification('Вопрос задан!', {
        body: 'Вы задали вопрос ' + this.question.question,
        icon: 'icon.jpg',
        dir: 'auto'
      },
      'Операция выполнена');
      this.question = new Question()
    } else {
      this.sendNotification('Заполните необходимые поля!', {
        body: 'Вы не задали вопрос',
        icon: 'icon.jpg',
        dir: 'auto'
      },
        'Операция не выполнена');
    }
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
