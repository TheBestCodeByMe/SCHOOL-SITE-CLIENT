import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";
import {Router} from "@angular/router";
import {PupilDTO} from "../models/pupilDTO/pupilDTO";
import {DiaryDTOService} from "../models/diaryDTO/diaryDTO.service";
import {PupilDTOService} from "../models/pupilDTO/pupilDTO.service";
import {ChartType, ChartOptions} from 'chart.js';
import {config} from "rxjs";

//import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-main',
  templateUrl: './analytic.component.html',
  styleUrls: ['./analytic.component.css',
    'assetsAnalytic/bootstrap/css/bootstrap.min.css',
  ]
})
export class AnalyticComponent implements OnInit {

  numberAttendance;
  averageGrade;
  pupilDTO: PupilDTO = new PupilDTO;

  data = {
    labels: [
      'Отличники',
      'Хорошисты',
      'Удовлетворительно',
      'Неудовлетворительно'
    ],
    datasets: [{
      label: 'Соотношение успеваемости в классе между учащимися',
      data: [10, 9, 7, 10],
      backgroundColor: [
        'rgb(255, 99, 132, 0.55)',
        'rgb(54, 162, 235, 0.55)',
        'rgb(255, 205, 86, 0.55)',
        'rgba(72,236,236,0.55)'
      ],
      hoverOffset: 4
    }]
  };

  config = {
    type: 'pie',
    data: this.data,
  };

  //labels = Utils.months({count: 7});
  data1 = {
    labels: ['Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь', 'Январь', 'Февраль', 'Март', 'Апрель', 'Май'],
    datasets: [{
      label: 'Средний балл по месяцам',
      data: [65, 59, 80, 81, 56, 55, 40, 73, 30, 74],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(91, 213, 191, 0.2)',
        'rgba(154, 235, 54, 0.2)',
        'rgba(255, 102, 189, 0.2)',
        'rgba(207, 201, 201, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(91, 213, 191)',
        'rgba(154, 235, 54)',
        'rgba(255, 102, 189)',
        'rgba(207, 201, 201)'
      ],
      borderWidth: 1
    }]
  };

  config1 = {
    type: 'bar',
    data: this.data1,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };

  data2 = {
    labels: ['Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь', 'Январь', 'Февраль', 'Март', 'Апрель', 'Май'],
    datasets: [{
      label: 'Посещаемость',
      data: [65, 59, 80, 81, 56, 55, 40, 60, 33],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  config2 = {
    type: 'line',
    data: this.data2,
  };

  constructor(private diaryDTOService: DiaryDTOService,
              private pupilDTOService: PupilDTOService,
              private tokenStorage: TokenStorageService,
              private router: Router) {
    //monkeyPatchChartJsTooltip();
    //monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.diaryDTOService.getAttendance(this.tokenStorage.getIdUser())
      .subscribe(data => {
        this.numberAttendance = data;
      });
    this.pupilDTOService.getPupilDTOByUserId(this.tokenStorage.getIdUser())
      .subscribe(data => {
        this.pupilDTO = data;
      });
    this.diaryDTOService.getAverageGrade(this.tokenStorage.getIdUser())
      .subscribe(data => {
        this.averageGrade = data;
      });
  }

  exit() {
    this.tokenStorage.signOut();
    this.router.navigate(['/main']);
  }

  saveGrades() {
    //this.diaryDTOService.saveGrades(this.tokenStorage.getIdUser());
    this.diaryDTOService.getSaveGrades(this.tokenStorage.getIdUser()).subscribe(data => {
      console.log(data);
    });
  }

  /*
    public pieChartOptions: ChartOptions = {
      responsive: true,
    };
    public pieChartLabels: Label[] = [['SciFi'], ['Drama'], 'Comedy'];
    public pieChartData: SingleDataSet = [30, 50, 20];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartPlugins = [];*/
}
