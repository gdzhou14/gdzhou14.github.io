// JavaScript source code
function inputdata() {
    //input data into the chart
    data1 = new scanning();

    option1 = Chart1.getOption()
    option1.series[0].data = data1.data_I_reg;
    Chart1.setOption(option1);

}
function initialization() {
    //initialize the data
    //param_nongated
    document.getElementById('param_Vd0').value = "0";
    //param_gated
    document.getElementById('param_W_gated').value = "100";
    document.getElementById('param_L_gated').value = "8";
    // document.getElementById('param_tsc_gated').value = "60";
    document.getElementById('param_tox_gated').value = "10";
    document.getElementById('param_mu_gated').value = "1";
    document.getElementById('param_eox_gated').value = "3.9";
    document.getElementById('param_Vth').value = "0";
    //param_scan
    document.getElementById('param_scanType').value = "0";
    document.getElementById('param_fixed').value = "3";
    document.getElementById('param_scanRange').value = "10";

    data1 = new scanning();
}

function scanning() {
    //param_nongated
    this.Voltage_drain0 = parseFloat(document.getElementById('param_Vd0').value);
    //param_gated
    this.W_gated = parseFloat(document.getElementById('param_W_gated').value);
    this.L_gated = parseFloat(document.getElementById('param_L_gated').value);
    // this.tsc_gated = parseFloat(document.getElementById('param_tsc_gated').value);
    this.tox_gated = parseFloat(document.getElementById('param_tox_gated').value);
    this.mu_gated = parseFloat(document.getElementById('param_mu_gated').value);
    this.eox_gated = parseFloat(document.getElementById('param_eox_gated').value);
    this.Voltage_threshold = parseFloat(document.getElementById('param_Vth').value);
    //param_scan
    this.Voltage_scanType = parseFloat(document.getElementById('param_scanType').value);
    this.Voltage_fixed = parseFloat(document.getElementById('param_fixed').value);
    this.Voltage_scanRange = parseFloat(document.getElementById('param_scanRange').value);

    //param_const


    const e0 = 8.85e-14;

    this.Ci = e0 * this.eox_gated / (this.tox_gated * 1e-7);
    this.WLCU = this.W_gated / this.L_gated * this.Ci * this.mu_gated;
    this.I_saturation = this.WLCU * Math.pow((this.Voltage_fixed - this.Voltage_threshold), 2) / 2;





    this.Voltage_max = this.Voltage_scanRange;
    this.Voltage_step = this.Voltage_max / 200



    this.Voltage_scan = [];
    this.Voltage_gate_minus_threshold = [];
    this.Voltage_drain_minus_drain0 = [];
    this.Voltage_1 = [];
    this.I_drain = [];
    this.I_drain_tot = [];
    this.I_drain_regular = [];
    this.I_max_search = [];
    this.Voltage_drain_sat_search = [];

    this.Voltage_gate_minus_threshold[0] = 0;
    this.Voltage_drain_minus_drain0[0] = 0;

    this.Voltage_1[0] = 0;
    this.I_drain[0] = 0;
    this.I_drain_tot[0] = 0;
    this.I_drain_regular[0] = 0;
    this.I_max_search[0] = this.I_saturation * 10;
    this.Voltage_drain_sat_search[0] = this.Voltage_max * 10;




    if (this.Voltage_scanType) {       //Vd
        this.Voltage_scan[0] = this.Voltage_drain0;
        for (i = 1; i < 200; i++) {
            this.Voltage_scan[i] = this.Voltage_scan[i - 1] + this.Voltage_step;
            this.Voltage_gate_minus_threshold[i] = this.Voltage_fixed - this.Voltage_threshold;
            this.Voltage_drain_minus_drain0[i] = this.Voltage_scan[i] - this.Voltage_drain0;
        }

        for (i = 1; i < 200; i++) {
            this.I_drain_regular[i] = this.WLCU * (this.Voltage_gate_minus_threshold[i] -
                Math.min(this.Voltage_gate_minus_threshold[i], this.Voltage_drain_minus_drain0[i]) / 2)
                * Math.min(this.Voltage_gate_minus_threshold[i], this.Voltage_drain_minus_drain0[i]);
        }
        this.Voltage_drain_sat = Math.min.apply(null, this.Voltage_drain_sat_search);
    } else {                      //Vg
        this.Voltage_scan[0] = this.Voltage_threshold;
        for (i = 1; i < 200; i++) {
            this.Voltage_scan[i] = this.Voltage_scan[i - 1] + this.Voltage_step;
            this.Voltage_gate_minus_threshold[i] = this.Voltage_scan[i] - this.Voltage_threshold;
            this.Voltage_drain_minus_drain0[i] = this.Voltage_fixed - this.Voltage_drain0;
        }

        for (i = 1; i < 200; i++) {
            this.I_drain_regular[i] = this.WLCU * (this.Voltage_gate_minus_threshold[i] -
                Math.min(this.Voltage_gate_minus_threshold[i], this.Voltage_drain_minus_drain0[i]) / 2)
                * Math.min(this.Voltage_gate_minus_threshold[i], this.Voltage_drain_minus_drain0[i]);
        }

    }
    this.data_I_reg = [];
    for (j = 0; j < 200; j++) {
        this.data_I_reg.push([this.Voltage_scan[j], this.I_drain_regular[j] * 1e6])
    }

}

let data1 = new scanning();
let dom1 = document.getElementById("chart1");
let Chart1 = echarts.init(dom1);
let option1 = Chart1.getOption();


option1 = {
    animation: false,
    title: {
        text: 'fig.1 Id-Vscan',
        x: 'center',
        y: 'bottom'
    },
    color: ['blue'],
    legend: {
        data: ['Id_regular'],
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
            dataZoom:{
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
            name: 'Id_regular',
            type: 'line',
            showSymbol: false,
            clip: true,
            itemStyle: {
                normal: {
                    lineStyle: {
                        width: 2,
                    }
                }
            },
            data: data1.data_I_reg,
        },
    ]

};

Chart1.setOption(option1);






