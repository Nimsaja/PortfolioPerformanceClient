import { Component, OnInit, AfterContentInit } from '@angular/core';
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

  constructor(private stocksService: StocksService) { }

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    this.stocksService.fetchData()
      .subscribe(
        data => this.data = data,
        error => console.log(error),
        () => this.showLast2Days(this.data)
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
}
