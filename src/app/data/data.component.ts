import { Component, OnInit} from '@angular/core';
import { Chart } from 'chart.js';

import { Data } from '../data';
import { StocksService } from '../stocks.service';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  data: Data[];
  yesterday: Data;
  today: Data;

  chart = [];

  innerWidth: any;
  innerHeight: any;

  maxTime: Date;

  constructor(private stocksService: StocksService) { }

  ngOnInit() {
    this.getData();

    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }

  getData(): void {
    this.stocksService.fetchData()
      .subscribe(
        data => this.data = data,
        error => console.log(error),
        () => (this.showLast2Days(this.data), this.plot())
      );
  }

  showLast2Days(data: Data[]) {
    const l = data.length;

    if (l > 0) {
      this.today = data[l - 1];
    }
    if (l > 2) {
      this.yesterday = data[l - 2];
    }
  }

  showTimeRange(days: number) {
    if (days > 0) {
      this.maxTime = new Date();
      this.maxTime.setDate(this.maxTime.getDate() - days);

      this.plot();
    }
  }

  plot() {
    const x = [];
    const y = [];
    const yd = [];
    for (const d of this.data) {
      if (new Date(d.timehuman) < this.maxTime) {
        continue;
      }
      x.push(this.date(d.timehuman));
      y.push(d.value);
      yd.push(d.diff);
    }

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: x,
        datasets: [
          {
            label: 'Sum',
            yAxisID: 'V',
            data: y,
            borderColor: '#3cba9f',
            fill: false
          },
          {
            label: 'Profit',
            yAxisID: 'D',
            data: yd,
            borderColor: '#ffcc00',
            fill: false
          },
        ]
      },
      options: {
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            id: 'V',
            display: true,
          },
          {
            id: 'D',
            display: true,
          },
        ],
        }
      }
    });
  }

  date(t: string): string {
    const date: Date = new Date(t);
    return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
  }

  calcWidth(): number {
    return this.innerWidth;
  }

  calcHeight(): number {
    return 0.8 * this.innerHeight;
  }
}
