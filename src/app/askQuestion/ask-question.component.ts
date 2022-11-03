import {Component, OnInit} from '@angular/core';
import {QuestionService} from "../models/questions/question.service";
import {Question} from "../models/questions/question";


@Component({
  selector: 'app-main',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css',
    './assets/bootstrap/css/bootstrap.min.css'
  ]
})
export class AskQuestionComponent implements OnInit {

  question: Question = new Question();

  constructor(private questionService: QuestionService) {
  }

  ngOnInit() {
  }

  addQuestion() {
    this.questionService.createQuestion(this.question)
      .subscribe(data => console.log(data), error => console.log(error));
  }

}
