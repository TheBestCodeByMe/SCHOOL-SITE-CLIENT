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

  constructor(private questionService: QuestionService) {
  }

  ngOnInit() {
      this.reloadData()
  }

  reloadData(){
    console.log(this.pass+"dsdsdsd")
    this.pass = "qwe"
    console.log(this.pass)
    this.questionService.getPass().subscribe(data=>this.pass=data)
    console.log(this.pass)
  }

  addQuestion() {
    this.questionService.createQuestion(this.question)
      .subscribe(data => console.log(data), error => console.log(error));
  }

}
