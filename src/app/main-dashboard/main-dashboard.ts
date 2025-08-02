import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxEchartsModule, provideEchartsCore } from 'ngx-echarts';
import { AgGridAngular } from 'ag-grid-angular';
import { AllCommunityModule, ModuleRegistry, ColDef, Theme, themeQuartz } from "ag-grid-community";
import { CommonModule } from '@angular/common';
import { BaarierMonitoringFields, ChatMessage, Constants, UnderlyingFields } from '../models/dashboard-models';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.html',
  styleUrl: './main-dashboard.scss',
  standalone: true,
  imports: [NgxEchartsModule, AgGridAngular, CommonModule],
  providers: [provideEchartsCore({
    echarts: () => import('echarts')
  })]
})
export class MainDashboard implements OnInit, AfterViewChecked {
  private primaryFontSize = 20;
  private secondaryFontSize = 14;
  private tertiaryFontSize = 12;
  private textPrimary: string = '#e0e0e0';
  private textSecondary: string = '#bdbdbd';
  private textTertiary: string = '#9e9e9e';
  private agGridHeaderColor: string = '#2c2c6a';
  private agGridBodyColor: string = '#27275b';
  private agGridHoverColor: string = '#ccccde';
  public barchart: any;
  public piechart: any;
  public incomeChart: any;
  public expenseChart: any;
  public lineChart: any;
  public underlyingChart: any;
  public isOverviewSelected: boolean = false;

  //ag-grid variables
  public underlyingData: UnderlyingFields[] = [];
  public underlyingDefs: ColDef<UnderlyingFields>[] = [];
  public barrierMonitoringData: BaarierMonitoringFields[] = [];
  public barrierMonitoringDefs: ColDef<BaarierMonitoringFields>[] = [];
  public defaultColDef: any;
  public myTheme = themeQuartz.withParams({});
  public theme: Theme | "legacy" = this.myTheme;

  public chatMessages: ChatMessage[] = [];
  public sanitizedHtmlContentArray: SafeHtml[] = [];
  @ViewChild('chatContainer') public chatContainer!: ElementRef;
  private table: string = '';

  constructor(private sanitizer: DomSanitizer) {
    ModuleRegistry.registerModules([AllCommunityModule]);
  }

  ngOnInit(): void {

    this.barchart = {
      xAxis: {
        type: 'category',
        data: ['Jun 25, 2025', 'Aug, 25, 2025', 'Sep 25, 2025', 'Oct 27, 2025'],
        axisLabel: {
          color: this.textTertiary
        },
        name: 'Projected Date',
        nameLocation: 'middle',
        nameGap: 35,
        nameTextStyle: {
          color: this.textSecondary,
          fontSize: this.secondaryFontSize
        }
      },
      yAxis: {
        name: 'Coupon (%)',
        nameLocation: 'middle',
        nameGap: 35,
        nameTextStyle: {
          color: this.textSecondary,
          fontSize: this.secondaryFontSize
        },
        type: 'value',
        axisLabel: {
          color: this.textTertiary
        }
      },
      series: [
        {
          data: [120, 59, 150, 50],
          type: 'bar',
          itemStyle: {
            color: '#5470c6',
            borderRadius: [50, 50, 0, 0]
          },
        },
        {

          data: [30, 200, 150, 80],
          type: 'bar',
          itemStyle: {
            color: '#73c0de',
            borderRadius: [50, 50, 0, 0]
          }
        }
      ],
      grid: {
        right: "10px",
        left: "50px",
      },
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

    this.lineChart = {
      xAxis: {
        name: 'Underlying returns %',
        nameLocation: 'middle',
        nameGap: 35,
        nameTextStyle: {
          color: this.textSecondary,
          fontSize: this.secondaryFontSize
        },
        type: 'category',
        data: [10, 20, 30, 40, 50, 50, 60],
        boundaryGap: false,
        axisLabel: {
          color: this.textTertiary,
        }
      },
      yAxis: {
        name: 'Pay off at maturity %',
        nameLocation: 'middle',
        nameGap: 35,
        nameTextStyle: {
          color: this.textSecondary,
          fontSize: this.secondaryFontSize
        },
        type: 'value',
        axisLabel: {
          color: this.textTertiary
        }
      },
      color: ['#5470c6', '#73c0de'],
      series: [
        {
          data: [0, 45, 45, 45, 45, 45, 45],
          type: 'line'
        },
        {
          data: [0, 10, 20, 30, 40, 50, 60],
          type: 'line'
        }
      ],
      grid: {
        right: "10px",
        left: "50px",
      },
    };

    this.underlyingData = [
      { underlyingTicker: '9988 HK Equity', description: 'Alibaba Group Holdings Ltd', currency: 'HKD', lastPrice: 123.30, unadjustedInitialPrice: 118.40, adjustedInitialPrice: 118.40, currentVsadjustedInitialPrice: '1.60%', basket: 'N/A', type: 'Stock', isin: 'KYG017191142' },
    ];

    this.underlyingDefs = [
      { field: "underlyingTicker", headerName: "Underlying Ticker" },
      { field: "description", headerName: "Description" },
      { field: "currency", headerName: "Currency" },
      { field: "lastPrice", headerName: "Last Price($)" },
      { field: "unadjustedInitialPrice", headerName: "Unadjusted Initial Price($)" },
      { field: "adjustedInitialPrice", headerName: "Adjusted Initial Price($)" },
      { field: "currentVsadjustedInitialPrice", headerName: "Current vs Adjusted Initial Price(%)" },
      { field: "basket", headerName: "Basket" },
      { field: "type", headerName: "Type" },
      { field: 'isin', headerName: 'ISIN' }
    ];

    this.defaultColDef = { flex: 1, };

    this.theme = themeQuartz.withParams({
      headerBackgroundColor: this.agGridHeaderColor,
      headerTextColor: this.textPrimary,
      headerFontSize: this.secondaryFontSize,
      backgroundColor: this.agGridBodyColor,
      cellTextColor: this.textTertiary,
      accentColor: this.agGridHoverColor,
    });

    this.barrierMonitoringData = [
      { putStrke: 100, autocall: 0, couponBarrier: 90, digitalCoupon: 5, upsideUpperBarrier: 120, upsideLowerBarrier: 110, downsideBarrier: 80, callStrike: 95, cap: 130, floor: 70 },
      { putStrke: 105, autocall: 0, couponBarrier: 95, digitalCoupon: 6, upsideUpperBarrier: 125, upsideLowerBarrier: 115, downsideBarrier: 85, callStrike: 100, cap: 135, floor: 75 }
    ];

    this.barrierMonitoringDefs = [
      { field: "putStrke", headerName: "Put Strike" },
      { field: "autocall", headerName: "Autocall" },
      { field: "couponBarrier", headerName: "Coupon Barrier" },
      { field: "digitalCoupon", headerName: "Digital Coupon" },
      { field: "upsideUpperBarrier", headerName: "Upside Upper Barrier" },
      { field: "upsideLowerBarrier", headerName: "Upside Lower Barrier" },
      { field: "downsideBarrier", headerName: "Downside Barrier" },
      { field: "callStrike", headerName: "Call Strike" },
      { field: "cap", headerName: "Cap" },
      { field: "floor", headerName: "Floor" }
    ];

    this.underlyingChart = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    };

    const header = Constants.UNDERLYING_HEADER;
    this.table = `<div><table><thead><tr>`;
    for (let i = 0; i < header.length; i++) {
      this.table += `<th><div class="table-header">${header[i]}</div></th>`;
    }
    this.table += `</tr></thead>`;
    const columns = [{
      underlyingTicker: '9988 HK Equity', description: 'Alibaba Group Holdings Ltd',
      currency: 'HKD', lastPrice: 123.30, unadjustedInitialPrice: 118.40,
      adjustedInitialPrice: 118.40, currentVsadjustedInitialPrice: '1.60%', basket: 'N/A',
      type: 'Stock', isin: 'KYG017191142'
    }];
    this.table += `<tbody><tr>`;
    for (let i = 0; i < columns.length; i++) {
      this.table += `<td><div class="table-cells">${columns[i].underlyingTicker}</div></td>`;
      this.table += `<td><div class="table-cells">${columns[i].description}</div></td>`;
      this.table += `<td><div class="table-cells">${columns[i].currency}</div></td>`;
      this.table += `<td><div class="table-cells">${columns[i].unadjustedInitialPrice}</div></td>`;
      this.table += `<td><div class="table-cells">${columns[i].adjustedInitialPrice}</div></td>`;
      this.table += `<td><div class="table-cells">${columns[i].currentVsadjustedInitialPrice}</div></td>`;
      this.table += `<td><div class="table-cells">${columns[i].basket}</div></td>`;
      this.table += `<td><div class="table-cells">${columns[i].type}</div></td>`;
      this.table += `<td><div class="table-cells">${columns[i].isin}</div></td>`;
    }
    this.table += `</tr></tbody></table></div>`;
  }

  public chat(event: any): void {
    if (event.value) {
      const userMessage: ChatMessage = { text: event.value, type: 0 };
      this.chatMessages.push(userMessage);
      let message = event.value;
      const rawHtmlContentArray: any = [`<div class="message-row outgoing">
          <div class="message-bubble outgoing-bubble">
            <p>${message}</p> 
          </div>
        </div>`];
      rawHtmlContentArray.push(`<div class="message-row incoming">
          <div class="message-bubble incoming-bubble">
           ${this.table}
          </div>
        </div>`);
      this.sanitizedHtmlContentArray = rawHtmlContentArray.map((html: any) =>
        this.sanitizer.bypassSecurityTrustHtml(html)
      );
      // this.sanitizedHtmlContent = this.sanitizer.bypassSecurityTrustHtml(this.rawHtmlContent);
    }
  }

  ngAfterViewChecked(): void {
    this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
  }

}
