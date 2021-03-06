import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, of } from 'rxjs';
import { Urls} from '../../../shared/model/model.url';
import * as d3 from 'd3';
import {EventEmitterService} from '../event-emitter.service';

declare var echarts: any;

@Component({
  selector: 'app-equipment-circle',
  templateUrl: './equipment-circle.component.html',
  styleUrls: ['./equipment-circle.component.css']
})
export class EquipmentCircleComponent implements OnInit {

  private  urls = Urls;
  private  current_city = '大连';
  private  data = {};
  private  fill = <any>{  };
  private  option: any;
  private  root = <any>{};
  constructor(private http: Http, public emitService: EventEmitterService) { }
  GetAllEquipment(city= null):  any {
    const params = {
      'city': city
    };
    const data = this.http.get(this.urls.GetAllEquipment, {params: params})
      .toPromise()
      .then(response => response.json());
    return data;
  }
  renderItem = function(params, api) {
    const textPosition = 'inside';
    if (api.value(9)) {
      return {
        type: 'circle',
        shape: {
          cx: api.value(6),
          cy: api.value(7) + 10,
          r:  api.value(8)
        },
        z2: api.value(1) * 2,
        style: api.style({
          stroke: '#03a1b3',
          fill:  {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [{
              offset: 0,
              color: '#034e61' // 0% 处的颜色
            }, {
              offset: 0.7,
              color: '#086b87' // 70% 处的颜色
            },
              {
                offset: 1,
                color: '#068ca3' // 100% 处的颜色
              }
            ],
            globalCoord: false // 缺省为 false
          },
          textPosition: textPosition,
          lineWidth: 2
        }),
        styleEmphasis: api.style({
          textPosition: textPosition,
          stroke: '#09c2f6',
          fill:  {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [{
              offset: 0,
              color: '#0a7998' // 0% 处的颜色
            }, {
              offset: 0.7,
              color: '#0b9ec8' // 50% 处的颜色
            }, {
              offset: 1,
              color: '#09c2f6' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
          },
          lineWidth: 1
        })
      };
    } else {
      return {
        type: 'circle',
        shape: {
          cx: api.value(6),
          cy: api.value(7) + 10,
          r:  api.value(8)
        },
        z2: api.value(1) * 2,
        style: api.style({
          stroke: 'rgba(11, 72, 115, 1',
          fill:  'rgba(0, 252, 255, 0.1)',
          textPosition: textPosition,
          lineWidth: 1
        }),
        styleEmphasis: api.style({
          textPosition: textPosition,
          stroke: 'rgba(11, 72, 115, 1)',
          fill:  'rgba(0, 252, 255, 0.1)',
          lineWidth: 3
        })
      };
    }
  };
  ngOnInit() {
    this.GetAllEquipment(this.current_city).then(r => {
      this.data = r;
      console.log(this.data);
      this.root = d3.hierarchy(this.data)                 //
        .sum(function(d) {
          return d.Num;
        })
        .sort(function(a, b) {
          return b.value - a.value;
        })
      d3.pack().size([500 - 2, 400 - 2])
        .padding(4.5)(this.root);
      let maxDepth = 0;
      const nodeAll = this.root.descendants();
      const nodes = nodeAll.filter(function(it) {
        return it.parent;
      })
      const seriesData = nodes.map(function(node) {
        maxDepth = Math.max(maxDepth, node.depth);
        const color1 = '#ffffff';
        node.isLeaf = !node.children || !node.children.length;
        console.log(node.r)
        if (node.depth === 1) {
          return {
            value: [
              node.value,
              node.depth,
              node.data.Name,
              node.data.Num,
              node.data.Unit,
              node.data.Type,
              node.x,
              node.y,
              node.r,
              node.isLeaf
            ],
            label: {
              normal: {
                show: false,
              }
            }
          };
        } else {
          return {
            value: [
              node.value,
              node.depth,
              node.data.Name,
              node.data.Num,
              node.data.Unit,
              node.data.Type,
              node.x,
              node.y,
              node.r,
              node.isLeaf
            ],
            label: {
              normal: {
                show: true,
                color: color1,
                formatter: function(params) {
                  if(params.value[8]>15){
                    return "{type|" + params.value[2] + "}\n{numAll|" + params.value[3] + "}";
                  }else{
                    return "";
                  }
                },
                rich: {
                  type: {
                    fontSize: 4,
                    color: color1
                  },
                  numAll: {
                    fontSize: 10,
                    padding: [5, 0, 5, 0],
                    color: color1
                  },
                }
              }
            }
          };
        }
      });
      this.option = {
        backgroundColor: 'transparent',
        title: {
          text: '应急装备',
          textStyle: {
            color: 'white',
            fontSize: 32,
            fontFamily: '微软雅黑',
            fontWeight: 'normal'
          },
          right: 10,
          bottom: 10
        },

        xAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        tooltip: {
          backgroundColor: 'rgba(50,50,50,0.95)',
          formatter: function(params) {
            if(params.value[9]) {
              const num = ('' + params.value[3]).replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,');
              let result = '<span>' + params.value[2] + '</span><br>' +
                "<span style = 'line-height:30px;font-size : 25px; font-weight:bold;'>" + num + "</span></br>" +
                "<div>" +
                "<div style = 'float : left; padding-right:20px; border-right: solid 1px #4c4a4a;'>" +
                "<span >单位</span></br>" +
                "<span style = 'color : red; '>" + params.value[4] + "</span>" +
                "</div>" +
                "<div style = 'float : right; margin-left:20px;'>" +
                "<span style = 'width : 100px;'>类别</span></br>" +
                "<span style = 'color : red; '>" + params.value[5] + "</span>" +
                "</div></div>";
              return result;
            }
          }
        },
        series: {
          type: 'custom',
          renderItem: this.renderItem,
          data: seriesData,
          top: 10
        }
      };
    });
    this.emitService.eventEmit.subscribe((value: any) => {
      // if(value == "userList") {
      //   // 这里就可以调取接口，刷新userList列表数据
      //   alert("收到了，我立马刷新列表");
      // }
      console.log('material 收到消息 内容为 ' + value);
      this.GetAllEquipment(value).then(r => {
        this.data = r;
        console.log(this.data);
        this.root = d3.hierarchy(this.data)                 //
          .sum(function(d) {
            return d.Num;
          })
          .sort(function(a, b) {
            return b.value - a.value;
          })
        d3.pack().size([500 - 2, 400 - 2])
          .padding(4.5)(this.root);
        let maxDepth = 0;
        const nodeAll = this.root.descendants();
        const nodes = nodeAll.filter(function(it) {
          return it.parent;
        })
        const seriesData = nodes.map(function(node) {
          maxDepth = Math.max(maxDepth, node.depth);
          const color1 = '#ffffff';
          node.isLeaf = !node.children || !node.children.length;
          console.log(node.r)
          if (node.depth === 1) {
            return {
              value: [
                node.value,
                node.depth,
                node.data.Name,
                node.data.Num,
                node.data.Unit,
                node.data.Type,
                node.x,
                node.y,
                node.r,
                node.isLeaf
              ],
              label: {
                normal: {
                  show: false,
                }
              }
            };
          } else {
            return {
              value: [
                node.value,
                node.depth,
                node.data.Name,
                node.data.Num,
                node.data.Unit,
                node.data.Type,
                node.x,
                node.y,
                node.r,
                node.isLeaf
              ],
              label: {
                normal: {
                  show: true,
                  color: color1,
                  formatter: function(params) {
                    if(params.value[8]>15){
                      return "{type|" + params.value[2] + "}\n{numAll|" + params.value[3] + "}";
                    }else{
                      return "";
                    }
                  },
                  rich: {
                    type: {
                      fontSize: 4,
                      color: color1
                    },
                    numAll: {
                      fontSize: 10,
                      padding: [5, 0, 5, 0],
                      color: color1
                    },
                  }
                }
              }
            };
          }
        });
        this.option = {
          backgroundColor: 'transparent',
          title: {
            text: '应急装备',
            textStyle: {
              color: 'white',
              fontSize: 32,
              fontFamily: '微软雅黑',
              fontWeight: 'normal'
            },
            right: 10,
            bottom: 10
          },

          xAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            }
          },
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            }
          },
          tooltip: {
            backgroundColor: 'rgba(50,50,50,0.95)',
            formatter: function(params) {
              if(params.value[9]) {
                const num = ('' + params.value[3]).replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,');
                let result = '<span>' + params.value[2] + '</span><br>' +
                  "<span style = 'line-height:30px;font-size : 25px; font-weight:bold;'>" + num + "</span></br>" +
                  "<div>" +
                  "<div style = 'float : left; padding-right:20px; border-right: solid 1px #4c4a4a;'>" +
                  "<span >单位</span></br>" +
                  "<span style = 'color : red; '>" + params.value[4] + "</span>" +
                  "</div>" +
                  "<div style = 'float : right; margin-left:20px;'>" +
                  "<span style = 'width : 100px;'>类别</span></br>" +
                  "<span style = 'color : red; '>" + params.value[5] + "</span>" +
                  "</div></div>";
                return result;
              }
            }
          },
          series: {
            type: 'custom',
            renderItem: this.renderItem,
            data: seriesData,
            top: 10
          }
        };
      });
    });
  }

}
