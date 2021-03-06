import { Component, OnInit } from '@angular/core';
import {toUnicode} from 'punycode';
import {ScreenDisplayService} from '../../screen-display.service';
declare var echarts: any;

@Component({
  selector: 'app-p-repair-bar',
  templateUrl: './p-repair-bar.component.html',
  styleUrls: ['./p-repair-bar.component.css']
})
export class PRepairBarComponent implements OnInit {
  private bar_option_repair: any;
  private current_city = null;
  constructor(private service: ScreenDisplayService) { }

  ngOnInit() {
    this.service.GetRepairDist(this.current_city).then(r => {
      const data = this.change_bar_data(r.value_list, r.class_list);
      this.bar_option_repair={
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            var tar;
            if (params[1].value != '-') {
              tar = params[1];
            }
            else {
              tar = params[0];
            }
            return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
          }
        },
        grid:{left:'20%'},
        xAxis: {
          type : 'category',
          splitLine: {show: false},
          data : data.class_list
        },
        yAxis: {
          name: '人数',
          type : 'value',
          nameTextStyle:{color:'#95ffff'},
          axisLabel:{color:'#95ffff'}
        },
        series: [
          {
            name:'统计',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              normal: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)'
              },
              emphasis: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)'
              }
            },
            data: data.under_data
          },
          {
            name: '人数',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: false,
                position: 'top',
                color:'#95ffff'
              }
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#83bff6'},
                    {offset: 0.5, color: '#188df0'},
                    {offset: 1, color: '#188df0'}
                  ]
                )
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#2378f7'},
                    {offset: 0.7, color: '#2378f7'},
                    {offset: 1, color: '#83bff6'}
                  ]
                )
              }
            },
            data: data.data
          },
        ]
      };
    });
  }
  change_bar_data(data, class_data): any {
    let temp = 0
    const under_data: Array<Number> = [0];
    for (const i of data) {
      temp = temp + i;
      under_data.push(temp);
    }
    under_data.reverse();
    data.push(under_data[0]);
    data.reverse();
    under_data[0]= 0;
    class_data.push(toUnicode('总数'));
    class_data.reverse();
    return {'class_list':class_data,'under_data':under_data,'data':data}
  }

}
