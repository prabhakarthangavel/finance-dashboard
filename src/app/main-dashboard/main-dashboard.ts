import { Component, OnInit } from '@angular/core';
import { NgxEchartsModule, provideEchartsCore } from 'ngx-echarts';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.html',
  styleUrl: './main-dashboard.scss',
  standalone: true,
  imports: [NgxEchartsModule],
  providers: [provideEchartsCore({
    echarts: () => import('echarts')
  })]
})
export class MainDashboard implements OnInit {
  private textPrimary: string = '#e0e0e0';
  private textSecondary: string = '#bdbdbd';
  private textTertiary: string = '#9e9e9e';
  public barchart: any;
  public piechart: any;
  public incomeChart: any;
  public expenseChart: any;

  ngOnInit(): void {
    this.barchart = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisLabel: {
          color: this.textTertiary
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: this.textTertiary
        },
      },
      grid: {
        right: 0,
        left: "40px"
      },
      series: [

        {
          data: [120, 59, 150, 50, 70, 60, 130],
          type: 'bar',
          itemStyle: {
            color: '#5470c6',
            borderRadius: [50, 50, 0, 0] 
          },
        },
        {

          data: [30, 200, 150, 80, 70, 110, 150],
          type: 'bar',
          itemStyle: {
            color: '#73c0de',
            borderRadius: [50, 50, 0, 0] 
          }
        }
      ]
    };

    this.piechart = {

      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        left: 'center',
        top: 'bottom',
        data: [
          'Data1',
          'Data2',
          'Data3',
          'Data4',
          'Data5',
          'Data6',
          'Data7',
          'Data8'
        ]
      },

      series: [
        {
          name: 'Pie Chart Name',
          type: 'pie',
          label: {
            color: this.textTertiary,
            fontSize: '14px',
          },
          radius: [20, 140],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 5
          },
          data: [
            { value: 30, name: 'Data 1' },
            { value: 28, name: 'Data 2' },
            { value: 26, name: 'Data 3' },
            { value: 24, name: 'Data 4' },
            { value: 22, name: 'Data 5' },
            { value: 20, name: 'Data 6' },
            { value: 18, name: 'Data 7' },
            { value: 15, name: 'Data 8' }
          ]
        }
      ]
    };

    this.incomeChart = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    show: false
  },
  yAxis: {
    type: 'value',
    show: false
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true
    }
  ]
};

  }

}
