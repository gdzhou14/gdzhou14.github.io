let dom1 = document.getElementById("chart1");
let Chart1 = echarts.init(dom1);
let option1 = Chart1.getOption();
let dom2 = document.getElementById("chart2");
let Chart2 = echarts.init(dom2);
let option2 = Chart2.getOption();
let dom3 = document.getElementById("chart3");


option1 = {
    animation: false,
    title: {
        text: 'fig.1 Id-Vscan',
        x: 'center',
        y: 'bottom'
    },
    color: ['red', 'blue'],
    legend: {
        data: ['Id', 'Id_regular'],
        textStyle: {
            fontSize: '20',
        }
    },
    grid: {
        top: 40,
        left: 70,
        right: 100,
        bottom: 60
    },
    toolbox: {
        show: true,
        feature: {
            dataZoom: [{
                show: true,
                type: 'inside',
                filterMode: 'none',
                xAxisIndex: [0],
                startValue: -20,
                endValue: 20,

            }, {
                show: true,
                type: 'inside',
                filterMode: 'none',
                yAxisIndex: [0],
                startValue: -20,
                endValue: 20,

            },
            ],
            dataZoom: {
                title: {
                    zoom: 'zoom in',
                    back: 'zoom back',
                },
            },
            restore: { title: 'restore' },
            saveAsImage: { title: 'Save image' },
        }
    },
    xAxis: {
        name: 'Vscan(V)',
        minorTick: {
            show: true
        },
        nameTextStyle: {
            fontSize: '16'
        },
        axisLabel: {
            show: true,
            textStyle: {
                fontSize: '16'
            }
        },
        splitLine: {
            lineStyle: {
                color: '#999'
            }
        },
        minorSplitLine: {
            show: true,
            lineStyle: {
                color: '#ddd'
            }
        }
    },
    yAxis: {
        name: 'Id(μA)',
        minorTick: {
            show: true
        },
        splitLine: {
            lineStyle: {
                color: '#999'
            }
        },
        minorSplitLine: {
            show: true,
            lineStyle: {
                color: '#ddd'
            }
        },
        nameTextStyle: {
            fontSize: '16'
        },
        axisLabel: {
            show: true,
            textStyle: {
                fontSize: '16'
            }
        },

    },

    series: [
        {
            name: 'Id',
            type: 'line',
            showSymbol: false,
            clip: true,
            symbolSize: 3,
            data: NaN,
        },
        {
            name: 'Id_regular',
            type: 'line',
            showSymbol: false,
            clip: true,
            itemStyle: {
                normal: {
                    lineStyle: {
                        width: 2,
                        type: 'dotted'
                    }
                }
            },
            data: NaN,
        },
    ]

};

option2 = {
    animation: false,
    title: {
        text: 'fig.2 V-Vscan',
        x: 'center',
        y: 'bottom'
    },
    color: ['red', 'blue'],
    legend: {
        data: ['V1', 'Vscan\''],
        textStyle: {
            fontSize: '20',
        }
    },
    grid: {
        top: 40,
        left: 70,
        right: 100,
        bottom: 60
    },
    toolbox: {
        show: true,
        feature: {
            dataZoom: [{
                show: true,
                type: 'inside',
                filterMode: 'none',
                xAxisIndex: [0],
                startValue: -20,
                endValue: 20,

            }, {
                show: true,
                type: 'inside',
                filterMode: 'none',
                yAxisIndex: [0],
                startValue: -20,
                endValue: 20,

            },
            ],
            dataZoom: {
                title: {
                    zoom: 'zoom in',
                    back: 'zoom back',
                },
            },
            restore: { title: 'restore' },
            saveAsImage: { title: 'Save image' },
        }
    },
    xAxis: {
        name: 'Vscan(V)',
        minorTick: {
            show: true
        },
        nameTextStyle: {
            fontSize: '16'
        },
        axisLabel: {
            show: true,
            textStyle: {
                fontSize: '16'
            }
        },
        splitLine: {
            lineStyle: {
                color: '#999'
            }
        },
        minorSplitLine: {
            show: true,
            lineStyle: {
                color: '#ddd'
            }
        }
    },
    yAxis: {
        name: 'V(V)',
        minorTick: {
            show: true
        },
        splitLine: {
            lineStyle: {
                color: '#999'
            }
        },
        minorSplitLine: {
            show: true,
            lineStyle: {
                color: '#ddd'
            }
        },
        nameTextStyle: {
            fontSize: '16'
        },
        axisLabel: {
            show: true,
            textStyle: {
                fontSize: '16'
            }
        },
        // max: function (value) { return (Math.ceil(value.max * 1.5)); }
        max: function (value) { return (Math.ceil(value.max)); }
    },

    series: [
        {
            name: 'V1',
            type: 'line',
            showSymbol: false,
            clip: true,
            symbolSize: 3,
            data: NaN,
        },
        {
            name: 'Vscan\'',
            type: 'line',
            showSymbol: false,
            clip: true,
            itemStyle: {
                normal: {
                    lineStyle: {
                        width: 2,
                        type: 'dotted'
                    }
                }
            },
            data: NaN,
        },
    ]

};

let Chart3 = echarts.init(dom3);
let option3 = Chart3.getOption();

option3 = {
    animation: false,
    title: {
        text: 'fig.3 V(x)',
        x: 'center',
        y: 'bottom'
    },
    color: ['red', 'blue', 'orange', 'green'],
    legend: {
        data: ['V(x)-1', 'V(x)-2'],
        textStyle: {
            fontSize: '20',
        }
    },
    grid: {
        top: 40,
        left: 70,
        right: 100,
        bottom: 60
    },
    toolbox: {
        show: true,
        feature: {
            dataZoom: [{
                show: true,
                type: 'inside',
                filterMode: 'none',
                xAxisIndex: [0],
                startValue: -20,
                endValue: 20,

            }, {
                show: true,
                type: 'inside',
                filterMode: 'none',
                yAxisIndex: [0],
                startValue: -20,
                endValue: 20,

            },
            ],
            dataZoom: {
                title: {
                    zoom: 'zoom in',
                    back: 'zoom back',
                },
            },
            restore: { title: 'restore' },
            saveAsImage: { title: 'Save image' },
        }
    },
    xAxis: {
        name: 'x(μm)',
        minorTick: {
            show: true
        },
        nameTextStyle: {
            fontSize: '16'
        },
        axisLabel: {
            show: true,
            textStyle: {
                fontSize: '16'
            }
        },
        splitLine: {
            lineStyle: {
                color: '#999'
            }
        },
        minorSplitLine: {
            show: true,
            lineStyle: {
                color: '#ddd'
            }
        }
    },
    yAxis: {
        name: 'V(V)',
        minorTick: {
            show: true
        },
        splitLine: {
            lineStyle: {
                color: '#999'
            }
        },
        minorSplitLine: {
            show: true,
            lineStyle: {
                color: '#ddd'
            }
        },
        nameTextStyle: {
            fontSize: '16'
        },
        axisLabel: {
            show: true,
            textStyle: {
                fontSize: '16'
            }
        },
        // max: function (value) { return (Math.ceil(value.max * 1.5)); }
        max: function (value) { return (Math.ceil(value.max)); }
    },

    series: [
        {
            name: 'V(x)-1',
            type: 'line',
            showSymbol: false,
            clip: true,
            symbolSize: 3,
            data: NaN
        },
        {
            name: 'V(x)-2',
            type: 'line',
            showSymbol: false,
            clip: true,
            symbolSize: 3,
            data: NaN
        },
        // {
        //     name: 'V(x)-3',
        //     type: 'line',
        //     showSymbol: false,
        //     clip: true,
        //     symbolSize: 3,
        //     data: NaN
        // },

    ]

};
