import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-echarts-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsPieComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.primaryLight, colors.warningLight, colors.infoLight, colors.dangerLight, 'aqua', colors.successLight, colors.primaryLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'right',//left
          data: ['NextCloud', 'MailServer', 'Wordpress', 'RocketChat', 'Service1','...'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Countries',
            type: 'pie',
            // radius: '80%',
            // center: ['50%', '50%'],
            radius: '46%',
            center: ['32%', '34%'],
            data: [
              { value: 335, name: 'NextCloud' },
              { value: 310, name: 'MailServer' },
              { value: 234, name: 'Wordpress' },
              { value: 1548, name: 'RocketChat' },
              { value: 1548, name: 'Service1' },
              { value: 135, name: '...' },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            // label: {
            //   normal: {
            //     textStyle: {
            //       color: echarts.textColor,
            //     },
            //   },
            // },
            // labelLine: {
            //   normal: {
            //     lineStyle: {
            //       color: echarts.axisLineColor,
            //     },
            //   },
            // },
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
