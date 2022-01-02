// JavaScript source code
function inputdata() {
    data1 = new scanning();
    // document.getElementById('param_Q_suggested').value = data1.Q0_alphaTest.toPrecision(4);
    option1 = Chart1.getOption()
    option1.series[0].data = data1.data_I_tot;
    Chart1.setOption(option1);
    option2 = Chart2.getOption()
    option2.series[0].data = data1.data_V1;
    option2.series[1].data = data1.data_V2;
    option2.series[2].data = data1.data_V2_V1;
    option2.series[3].data = data1.data_Vscan;
    Chart2.setOption(option2);

}
function initialization() {
    //param_nongated
    document.getElementById('param_W_nongated').value = "100";
    document.getElementById('param_d_nongated').value = "1.2";
    document.getElementById('param_d_nongated2').value = "0.5";
    document.getElementById('param_tsc_nongated').value = "60";
    document.getElementById('param_mu_nongated').value = "10";
    document.getElementById('param_mu_nongated2').value = "10";
    document.getElementById('param_esc_nongated').value = "9";
    document.getElementById('param_alpha').value = "1.5";
    document.getElementById('param_Vd0').value = "0";
    //param_gated
    document.getElementById('param_W_gated').value = "100";
    document.getElementById('param_L_gated').value = "2";
    document.getElementById('param_tox_gated').value = "20";
    document.getElementById('param_mu_gated').value = "10";
    document.getElementById('param_eox_gated').value = "3.9";
    document.getElementById('param_Vth').value = "0.2";
    //param_scan
    document.getElementById('param_scanType').value = "1";
    document.getElementById('param_fixed').value = "5";
    document.getElementById('param_scanRange').value = "10";
    document.getElementById('param_Q0').value = "8e-8";
    document.getElementById('param_Q0_rate').value = "1";
    document.getElementById('param_Rback').value = "1e9"

    data1 = new scanning();
}




function scanning() {
    //param_nongated
    this.W_nongated = parseFloat(document.getElementById('param_W_nongated').value);
    this.d_nongated = parseFloat(document.getElementById('param_d_nongated').value);
    this.d_nongated2 = parseFloat(document.getElementById('param_d_nongated2').value);
    this.tsc_nongated = parseFloat(document.getElementById('param_tsc_nongated').value);
    this.mu_nongated = parseFloat(document.getElementById('param_mu_nongated').value);
    this.mu_nongated2 = parseFloat(document.getElementById('param_mu_nongated2').value);
    // this.n0 = parseFloat(document.getElementById('param_n0').value);
    this.n0 = 1e14;
    this.esc_nongated = parseFloat(document.getElementById('param_esc_nongated').value);
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
    this.alpha = parseFloat(document.getElementById('param_alpha').value);
    // this.Qtest = parseFloat(document.getElementById('param_Qtest').value);
    this.Qtest = 3e-4;
    this.Q0 = parseFloat(document.getElementById('param_Q0').value);
    this.Q0_rate = parseFloat(document.getElementById('param_Q0_rate').value);
    this.Q02 = this.Q0 * this.Q0_rate;
    this.R_back_real = parseFloat(document.getElementById('param_Rback').value);

    //param_const
    this.S = this.W_nongated * 1e-4 * this.tsc_nongated * 1e-7;
    this.beta = 2 * this.alpha - 1;
    this.SUDB = this.S * this.mu_nongated / Math.pow((this.d_nongated * 1e-4), this.beta);
    this.SUDB_2 = this.S * this.mu_nongated2 / Math.pow((this.d_nongated2 * 1e-4), this.beta);
    const e0 = 8.85e-14;

    this.Ci = e0 * this.eox_gated / (this.tox_gated * 1e-7);
    this.WLCU = this.W_gated / this.L_gated * this.Ci * this.mu_gated;
    this.I_saturation = this.WLCU * Math.pow((this.Voltage_fixed - this.Voltage_threshold), 2) / 2;

    this.Q0_alphaTest = this.Qtest / (this.SUDB * Math.pow(10, this.alpha));

    this.gamma12 = this.Q0 * this.SUDB / ((this.mu_gated * this.W_gated * 1e-4) / (this.L_gated * 1e-4) * this.Ci);
    this.gamma32 = this.Q02 * this.SUDB_2 / ((this.mu_gated * this.W_gated * 1e-4) / (this.L_gated * 1e-4) * this.Ci);
    this.gamma31 = this.Q02 * this.SUDB_2 / (this.Q0 * this.SUDB);
    this.sigma = Math.pow(this.gamma31, 1 / this.alpha)
    this.Q001 = 1;
    this.power1 = 0.18;
    this.Q002 = 1;
    this.power2 = 0.18;
    this.R_power = 0;
    this.D_hole = 1;


    this.Voltage_drain_satest = Math.pow((Math.pow(this.Voltage_fixed, 2) / 2 / this.gamma), (1 / this.alpha)) + this.Voltage_drain0;
    this.Voltage_max = this.Voltage_scanRange;
    this.Voltage_step = this.Voltage_max / 200;

    this.a1 = [];
    this.b1 = [];
    this.c1 = [];
    this.bb_4ac1 = [];
    this.a2 = [];
    this.b2 = [];
    this.c2 = [];
    this.bb_4ac2 = [];
    this.Voltage_scan = [];
    this.Voltage_gate_minus_threshold = [];
    this.Voltage_drain_minus_drain0 = [];
    this.Voltage_1 = [];
    this.Voltage_1_sat = [];
    this.Voltage_2 = [];
    this.Voltage_20 = [];
    this.I_drain = [];
    this.I_drain_tot = [];
    this.I_drain_regular = [];
    this.I_max_search = [];
    this.Voltage_drain_sat_search = [];
    this.Q1 = [];
    this.Q2 = [];
    this.gamma12_data = [];
    this.gamma32_data = [];
    this.R_ll = [];

    this.Voltage_gate_minus_threshold[0] = 0;
    this.Voltage_drain_minus_drain0[0] = 0;
    this.a1[0] = 0;
    this.b1[0] = 0;
    this.c1[0] = 0;
    this.bb_4ac1[0] = 0;
    this.a2[0] = 0;
    this.b2[0] = 0;
    this.c2[0] = 0;
    this.bb_4ac2[0] = 0;
    this.Voltage_1[0] = 0;
    this.Voltage_1_sat[0] = 0;
    this.Voltage_2[0] = 0;
    this.Voltage_20[0] = 0;
    this.I_drain[0] = 0;
    this.I_drain_tot[0] = 0;
    this.I_drain_regular[0] = 0;
    this.I_max_search[0] = this.I_saturation * 10;
    this.Voltage_drain_sat_search[0] = this.Voltage_max * 10;
    this.Q1[0] = 0;
    this.Q2[0] = 0;
    this.gamma12_data[0] = 0;
    this.gamma32_data[0] = 0;
    this.R_ll[0] = 0;




    if (this.Voltage_scanType) {       //Vd
        this.Voltage_scan[0] = this.Voltage_drain0;
        for (i = 1; i < 200; i++) {
            this.Voltage_scan[i] = this.Voltage_scan[i - 1] + this.Voltage_step;
            this.Voltage_gate_minus_threshold[i] = this.Voltage_fixed - this.Voltage_threshold;
            this.Voltage_drain_minus_drain0[i] = this.Voltage_scan[i] - this.Voltage_drain0;
            this.Q1[i] = this.Q0 * Math.exp(Math.pow(this.Voltage_gate_minus_threshold[i], this.power1) / this.Q001);
            this.Q2[i] = this.Q02 * Math.exp(Math.pow(this.Voltage_gate_minus_threshold[i], this.power2) / this.Q002);
            this.gamma12_data[i] = this.gamma12 * this.Q1[i] / this.Q0;
            this.gamma32_data[i] = this.gamma32 * this.Q2[i] / this.Q02;
            this.R_ll[i] = this.R_back_real;
        }
        // generate Vscan - Vscan point data
        this.data_Vscan = [];
        for (j = 0; j < 200; j++) {
            this.data_Vscan.push([this.Voltage_scan[j + 1], this.Voltage_scan[j + 1] - this.Voltage_drain0])
        }
    } else {                      //Vg
        this.Voltage_scan[0] = this.Voltage_threshold;
        for (i = 1; i < 200; i++) {
            this.Voltage_scan[i] = this.Voltage_scan[i - 1] + this.Voltage_step;
            this.Voltage_gate_minus_threshold[i] = this.Voltage_scan[i] - this.Voltage_threshold;
            this.Voltage_drain_minus_drain0[i] = this.Voltage_fixed - this.Voltage_drain0;
            this.Q1[i] = this.Q0 * Math.exp(Math.pow(this.Voltage_gate_minus_threshold[i], this.power1) / this.Q001);
            this.Q2[i] = this.Q02 * Math.exp(Math.pow(this.Voltage_gate_minus_threshold[i], this.power2) / this.Q002);
            this.gamma12_data[i] = this.gamma12 * this.Q1[i] / this.Q0;
            this.gamma32_data[i] = this.gamma32 * this.Q2[i] / this.Q02;
            this.R_ll[i] = this.R_back_real;
        }
        // generate Vscan - Vscan point data
        this.data_Vscan = [];
        for (j = 0; j < 200; j++) {
            this.data_Vscan.push([this.Voltage_scan[j + 1], this.Voltage_scan[j + 1] - this.Voltage_threshold])
        }
    }
    for (i = 1; i < 200; i++) {
        //abc(V2)
        this.a2[i] = this.gamma32_data[i] * this.alpha * (this.alpha - 1) *
            Math.pow(this.Voltage_drain_minus_drain0[i], this.alpha - 2) / 2
            - (this.sigma * this.sigma - 1) / 2;
        this.b2[i] = - (this.alpha * this.gamma32_data[i] * Math.pow(this.Voltage_drain_minus_drain0[i], this.alpha - 1)
            + (this.Voltage_gate_minus_threshold[i] - this.sigma * this.Voltage_drain_minus_drain0[i] / 2) * (this.sigma + 1)
            - (this.sigma - 1) * this.sigma * this.Voltage_drain_minus_drain0[i] / 2);
        this.c2[i] = this.gamma32_data[i] * Math.pow(this.Voltage_drain_minus_drain0[i], this.alpha) +
            (this.Voltage_gate_minus_threshold[i] - this.sigma * this.Voltage_drain_minus_drain0[i] / 2) *
            this.sigma * this.Voltage_drain_minus_drain0[i];
        this.bb_4ac2[i] = (this.b2[i] * this.b2[i] - 4 * this.a2[i] * this.c2[i])
        // V2
        if ((this.bb_4ac2[i] > 0) && (this.bb_4ac2[i] > this.bb_4ac2[i - 1])) {
            this.Voltage_20[i] = Math.min((Math.abs((-this.b2[i] - Math.sqrt(this.bb_4ac2[i])) / 2 / this.a2[i])), this.Voltage_gate_minus_threshold[i], this.Voltage_drain_minus_drain0[i]);
        } else {
            this.Voltage_20[i] = 0;
        }
    }
    for (i = 1; i < 200; i++) {
        if (this.Voltage_20[i] == 0 && this.Voltage_20[i - 1] == 0 && i < 199) {
            this.Voltage_2[i] = this.Voltage_20[i + 1];
        } else {
            this.Voltage_2[i] = 0;
        }
        //  else {
        //     if (this.Voltage_20[i-1] == 0) {
        //         this.Voltage_2[i] = this.Voltage_20[i] - this.Voltage_20[i-1];
        //     } else {
        //         this.Voltage_2[i] = this.Voltage_20[i];
        //     }
        // }
    }
    if (Math.max.apply(null, this.Voltage_2) > 0) {
        this.Voltage_2_max = Math.max.apply(null, this.Voltage_2);
    } else {
        this.Voltage_2_max = Math.max.apply(null, this.Voltage_20);
    }

    // case
    if (this.Voltage_scanType) { //Vd
        for (i = 1; i < 200; i++) {
            if (this.bb_4ac2[i] > 0) {
                this.Voltage_20[i] = Math.min((Math.abs((-this.b2[i] - Math.sqrt(this.bb_4ac2[i])) / 2 / this.a2[i])), this.Voltage_gate_minus_threshold[i], this.Voltage_drain_minus_drain0[i]);
            } else {
                this.Voltage_20[i] = Math.min(this.Voltage_20[i - 1], this.Voltage_gate_minus_threshold[i], this.Voltage_drain_minus_drain0[i]);
            }

            if (i != 1 && i != 2 && this.Voltage_20[i - 2] == this.Voltage_20[i - 1] && this.Voltage_20[i] == this.Voltage_20[i - 1]) {
                this.flag++;
            }
            if (this.flag == 1) {
                this.Voltage_2_max = this.Voltage_20[i];
                this.Voltage_2[i] = this.Voltage_20[i];
            } else if (this.flag > 1) {
                this.Voltage_2[i] = this.Voltage_2_max;
            } else {
                this.Voltage_2[i] = this.Voltage_20[i];
            }
        }
    } else {    //Vg
        for (i = 1; i < 200; i++) {
            if ((this.bb_4ac2[i] > 0) && (this.bb_4ac2[i] > this.bb_4ac2[i - 1])) {
                this.Voltage_20[i] = Math.min((Math.abs((-this.b2[i] - Math.sqrt(this.bb_4ac2[i])) / 2 / this.a2[i])), this.Voltage_gate_minus_threshold[i], this.Voltage_drain_minus_drain0[i], this.Voltage_2_max);
            } else {
                this.Voltage_20[i] = Math.min(this.Voltage_gate_minus_threshold[i], this.Voltage_drain_minus_drain0[i], this.Voltage_2_max);
            }
            if (i != 1) {
                if (this.Voltage_2[i - 2] == this.Voltage_20[i - 1]) {
                    this.Voltage_2[i] = Math.min(this.Voltage_2[i - 1], this.Voltage_2_max);
                } else {
                    this.Voltage_2[i] = Math.min(this.Voltage_20[i], this.Voltage_2_max);
                }
            }
        }
    }

    for (i = 1; i < 200; i++) {
        //abc(V1)
        this.a1[i] = this.gamma12_data[i] * this.alpha * (this.alpha - 1) * Math.pow(this.Voltage_2[i], this.alpha - 2) - 1;
        this.b1[i] = -2 * this.alpha * this.gamma12_data[i] * Math.pow(this.Voltage_2[i], this.alpha - 1)
            - 2 * this.Voltage_gate_minus_threshold[i] + 2 * this.Voltage_2[i];
        this.c1[i] = 2 * this.gamma12_data[i] * Math.pow(this.Voltage_2[i], this.alpha);
        this.bb_4ac1[i] = (this.b1[i] * this.b1[i] - 4 * this.a1[i] * this.c1[i])
        if (this.bb_4ac1[i] > 0) {
            this.Voltage_1[i] = this.Voltage_2[i] - ((-this.b1[i] - Math.sqrt(this.bb_4ac1[i])) / 2 / this.a1[i]);
        } else {
            this.Voltage_1[i] = this.Voltage_2[i];
        }
    }
    for (i = 1; i < 200; i++) {
        if (this.Voltage_2[i] < Math.max.apply(null, this.Voltage_2)) {
            this.Voltage_drain_sat_search[i] = 10 * this.Voltage_max;
        } else {
            this.Voltage_drain_sat_search[i] = this.Voltage_drain_minus_drain0[i];
        }
    }
    this.Voltage_drain_sat = Math.min.apply(null, this.Voltage_drain_sat_search);
    for (i = 1; i < 200; i++) {
        // drain current
        if (this.Voltage_drain_minus_drain0[i] <= this.Voltage_drain_sat) {
            this.I_drain[i] = this.WLCU * (this.Voltage_gate_minus_threshold[i] - (this.Voltage_1[i] + this.Voltage_2[i]) / 2) * (this.Voltage_2[i] - this.Voltage_1[i]);
        } else {
            this.I_drain[i] = this.I_drain[i - 1];
        }

        if (this.bb_4ac2[i] * this.bb_4ac2[i - 1] < 0) {
            this.I_max_search[i] = this.I_drain[i];
        } else {
            this.I_max_search[i] = this.I_saturation * 10;
        }
    }
    // second time scan
    this.I_max = Math.min.apply(null, this.I_max_search);
    for (i = 1; i < 200; i++) {
        this.I_drain_tot[i] = this.Voltage_drain_minus_drain0[i] /
            (this.Voltage_drain_minus_drain0[i] / this.I_drain[i] * this.R_ll[i] /
                (this.Voltage_drain_minus_drain0[i] / this.I_drain[i] + this.R_ll[i]));
        this.I_drain_regular[i] = this.WLCU * (this.Voltage_gate_minus_threshold[i] -
            Math.min(this.Voltage_gate_minus_threshold[i], this.Voltage_drain_minus_drain0[i]) / 2)
            * Math.min(this.Voltage_gate_minus_threshold[i], this.Voltage_drain_minus_drain0[i]);
    }
    this.data_I_tot = [];
    this.data_I_reg = [];
    this.data_Vd = [];
    this.data_V1 = [];
    this.data_V2 = [];
    this.data_V2_V1 = [];
    for (j = 0; j < 200; j++) {
        this.data_I_tot.push([this.Voltage_scan[j], this.I_drain_tot[j] * 1e6])
        this.data_I_reg.push([this.Voltage_scan[j], this.I_drain_regular[j] * 1e6])
        this.data_Vd.push([this.Voltage_scan[j + 1], this.Voltage_drain_minus_drain0[j + 1]])
        this.data_V2.push([this.Voltage_scan[j + 1], this.Voltage_2[j + 1]])
        this.data_V1.push([this.Voltage_scan[j + 1], this.Voltage_1[j + 1]])
        this.data_V2_V1.push([this.Voltage_scan[j + 1], this.Voltage_2[j + 1] - this.Voltage_1[j + 1]])

    }
}


let data1 = new scanning();
let dom1 = document.getElementById("chart1");
let Chart1 = echarts.init(dom1);
let option1 = Chart1.getOption();
let dom2 = document.getElementById("chart2");
let Chart2 = echarts.init(dom2);
let option2 = Chart2.getOption();

option1 = {
    animation: false,
    title: {
        text: 'fig.1 Id-Vscan',
        x: 'center',
        y: 'bottom'
    },
    color: ['red', 'blue'],
    legend: {
        data: ['Id'],
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
            data: data1.data_I_tot,
        },

    ]

};

Chart1.setOption(option1);

option2 = {
    animation: false,
    title: {
        text: 'fig.2 V-Vscan',
        x: 'center',
        y: 'bottom'
    },
    color: ['red', 'blue', 'orange', 'green'],
    legend: {
        data: ['V1', 'V2', 'V2-V1', 'Vscan\''],
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
        max: function (value) { return (Math.ceil(value.max)); }
    },

    series: [
        {
            name: 'V1',
            type: 'line',
            showSymbol: false,
            clip: true,
            symbolSize: 3,
            data: data1.data_V1,
        },
        {
            name: 'V2',
            type: 'line',
            showSymbol: false,
            clip: true,
            symbolSize: 3,
            data: data1.data_V2,
        },
        {
            name: 'V2-V1',
            type: 'line',
            showSymbol: false,
            clip: true,
            symbolSize: 3,
            data: data1.data_V2_V1,
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
            data: data1.data_Vscan,
        },
    ]

};

Chart2.setOption(option2);




