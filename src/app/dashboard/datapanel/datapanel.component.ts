import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service'
import { NgxEchartsService } from 'ngx-echarts';

@Component({
  selector: 'app-datapanel',
  templateUrl: './datapanel.component.html',
  styleUrls: ['./datapanel.component.css']
})
export class DatapanelComponent implements OnInit {
  public bar_chart_sm:any; //柱状图选项
  public map_chart_sm:any;//地图选项
  public map_data:any;//地图数据
  constructor(private dataService:DataService,private es:NgxEchartsService) { }



  ngOnInit() {
    this.bar_chart_sm = {
      color: ['#FFFFFF'],
      xAxis: {
        type: 'category',
        show: false,
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        show: false,
        splitLine: {
          show: false
        }
      },
      series: [{
        data: [120, 200, 150, 80, 70, 110, 130, 90, 70, 110, 180, 160, 80, 90, 50],
        type: 'bar'
      }]
    } //初始化柱状图选项
    this.dataService.getLocalJson().subscribe(
      mapdata=>{
        this.es.registerMap('liaoning', mapdata);//注册地图
        this.map_chart_sm={
          tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>{c} (p / km2)'
          },

          // toolbox: {
          //   show: true,
          //   orient: 'vertical',
          //   left: 'right',
          //   top: 'center',
          //   feature: {
          //     dataView: { readOnly: false },
          //     restore: {},
          //     saveAsImage: {}
          //   }
          // },
          geo:{
            center: [115.97, 29.71]
          },
          visualMap: {
            left:0,
            show:false,
            min: 800,
            max: 50000,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            inRange: {
              color: ['white', 'grey', 'black']
            }
          },
          series: [
            {
              name: '应急数据展示',
              type: 'map',
              mapType: 'liaoning', // map type should be registered
              itemStyle: {
                normal: { label: { show: false } },
                emphasis: { label: { show: true } }
              },
              data: [
                { name: '沈阳市', value: 20057.34 },
                { name: '大连市', value: 15477.48 },
                { name: '鞍山市', value: 31686.1 },
                { name: '抚顺市', value: 6992.6 },
                { name: '本溪市', value: 44045.49 },
                { name: '丹东市', value: 40689.64 },
                { name: '锦州市', value: 37659.78 },
                { name: '营口市', value: 45180.97 },
                { name: '阜新市', value: 55204.26 },
                { name: '辽阳市', value: 21900.9 },
                { name: '盘锦市', value: 4918.26 },
                { name: '铁岭市', value: 5881.84 },
                { name: '朝阳市', value: 4178.01 },
                { name: '葫芦岛市', value: 2227.92 },
              ],

            }
          ]
        }
      }
    );//获取本地地图数据


  }
  onChartClick(event:any){ //返回名为event的json数据
      console.log(event.data.name)
  }
}
