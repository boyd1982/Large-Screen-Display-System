import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {templateJitUrl} from "@angular/compiler";
import {optionsData} from "../../../shared/data/dropdowns";
declare var echarts:any;
@Component({
  selector: 'app-repaircar-timeline',
  templateUrl: './repaircar-timeline.component.html',
  styleUrls: ['./repaircar-timeline.component.css']
})
export class RepaircarTimelineComponent implements OnInit {
  dataFormatter(obj){
    let dataSeries=[]
    let temp:any;
    for (const key of Object.keys(obj)){
      temp = {name:key, value:obj[key]}
      dataSeries.push(temp)
    }
    return dataSeries
  }
  constructor(private http:HttpClient) { }
  dataCartype : {[city:string]:any}={};//定义空的字典
  dataOiltype:any;
  cityList:Array<string>;
  Option:any;
  optionData:Array<any>=[];

  ngOnInit() {
    this.cityList=["沈阳","大连","鞍山","抚顺","本溪","丹东","锦州","营口","阜新","辽阳","盘锦","铁岭","朝阳","葫芦岛","省检修"]

    this.http.get('http://localhost:5000/repaircar/count/cartype/').subscribe(res=>{
      for (const item of this.cityList){
        this.optionData.push({
          xAxis: [
            {
              'type':'category',
              'axisLabel':{'interval':0,'rotate':40},
              'data':res['cartypeList'][item],
              splitLine: {show: false}
            }
          ],
          title:{
            text:item+'抢修车辆',
            left:'center',
            textStyle:{
              color:'#fff',
              fontSize:20
            }
          },
          series:[
            {data:res['data'][item]},

          ]
        })
      }
      this.Option = {
        baseOption: {
          timeline: {
            // y: 0,
            axisType: 'category',
            // realtime: false,
            // loop: false,
            autoPlay: true,
            // currentIndex: 2,
            playInterval: 2000,
            // controlStyle: {
            //     position: 'left'
            // },
            data: this.cityList,
            label: {
              color:'white',
              // formatter : function(s) {
              //   return (new Date(s)).getFullYear();
              // }
            },
            itemStyle:{
              color:'lightblue'
            },

          },
          title: {
            subtext: '车辆类型一览表',
            textStyle:{
              color:'#fff',
              fontSize:20
            }
          },
          tooltip: {},
          // legend: {
          //   x: 'right',
          //   data: ['应急抢修车'],
          //   selected: {
          //     '抚顺': false, '盘锦': false, '葫芦岛': false
          //   }
          // },
          calculable : true,
          grid: {
            show:false,
            top: 80,
            bottom: 100
          },
          xAxis: [
            {
              'type':'category',
              'axisLabel':{'interval':0,color:'white'},
              'data':this.cityList,
              splitLine: {show: false}
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '应急抢修车（辆）',
              // max: 53500
              nameTextStyle:{
                color:'#fff'
              },
              max: 50,
              axisLabel:{
                color:'#fff'
              },
             splitLine:{
               lineStyle: {
                 color: ['#fff'],
                 opacity:0.06
               }
             }
            }
          ],
          series: [
            {name: '应急抢修车', type: 'bar',barWidth:10,barGap:0,itemStyle:{normal: {
              barBorderRadius: [5, 5, 0, 0],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 1, color: 'rgba(127, 128, 225, 0.7)'
              },{
                offset: 0.9, color: 'rgba(72, 73, 181, 0.7)'
              },{
                offset: 0.31, color: 'rgba(0, 208, 208, 0.7)'
              },{
                offset: 0.15, color: 'rgba(0, 208, 208, 0.7)'
              }, {
                offset: 0, color: 'rgba(104, 253, 255, 0.7)'
              }], false),
            },}},
          ]
        },
        options:this.optionData
      };
    })



  }

}
