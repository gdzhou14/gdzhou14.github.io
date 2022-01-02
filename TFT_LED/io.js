// JavaScript source code
function inputdata() {
    data1 = new scanning();
    document.getElementById('param_Q_suggested').value = data1.Q0_alphaTest.toPrecision(4);
    option1 = Chart1.getOption()
    option1.series[0].data = data1.data_I_tot;
    option1.series[1].data = data1.data_I_reg;
    Chart1.setOption(option1);
    option2 = Chart2.getOption()
    option2.series[0].data = data1.data_V1;
    option2.series[1].data = data1.data_Vscan;
    Chart2.setOption(option2);

}
function initialization() {
    //param_nongated
    document.getElementById('param_W1_nongated').value = "100";
    document.getElementById('param_d_nongated').value = "2";
    document.getElementById('param_W2_nongated').value = "60";
    document.getElementById('param_mu_nongated').value = "1";
    // document.getElementById('param_n0').value = "1.0e14";
    document.getElementById('param_esc_nongated').value = "9";
    document.getElementById('param_alpha').value = "2.00";
    document.getElementById('param_Vd0').value = "0";
    //param_gated
    document.getElementById('param_W_gated').value = "100";
    document.getElementById('param_L_gated').value = "8";
    document.getElementById('param_tox_gated').value = "10";
    document.getElementById('param_mu_gated').value = "1";
    document.getElementById('param_eox_gated').value = "3.9";
    document.getElementById('param_Vth').value = "0";
    //param_scan
    document.getElementById('param_scanType').value = "0";
    document.getElementById('param_fixed').value = "3";
    document.getElementById('param_scanRange').value = "10";
    document.getElementById('param_Q0').value = "6.7e-13";
    document.getElementById('param_Rback').value = "1e11";
    //param_const


    data1 = new scanning();
}


function scanning() {
    //param_nongated
    this.W1_nongated = parseFloat(document.getElementById('param_W1_nongated').value);
    this.d_nongated = parseFloat(document.getElementById('param_d_nongated').value);
    this.W2_nongated = parseFloat(document.getElementById('param_W2_nongated').value);
    this.mu_nongated = parseFloat(document.getElementById('param_mu_nongated').value);
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
    this.Qtest = 0.0005;
    this.Q0 = parseFloat(document.getElementById('param_Q0').value);
    this.R_back_real = parseFloat(document.getElementById('param_Rback').value);

    //param_const
    this.S = this.W1_nongated * 1e-4 * this.W2_nongated * 1e-4;
    this.beta = 2 * this.alpha - 1;
    this.SUDB = this.S * this.mu_nongated / Math.pow((this.d_nongated * 1e-4), this.beta);
    this.rou = 1 / this.n0 / 1.6e-19 / this.mu_nongated;
    const e0 = 8.85e-14;

    this.Ci = e0 * this.eox_gated / (this.tox_gated * 1e-7);
    this.WLCU = this.W_gated / this.L_gated * this.Ci * this.mu_gated;
    this.I_saturation = this.WLCU * Math.pow((this.Voltage_fixed - this.Voltage_threshold), 2) / 2;
    //this.I_max = Math.min(Q);


    this.Q0_alphaTest = this.Qtest / (this.SUDB * Math.pow(10, this.alpha));

    // this.Q0 = this.Q0_alphaTest;
    this.gamma = this.Q0 * this.SUDB / ((this.mu_gated * this.W_gated * 1e-4) / (this.L_gated * 1e-4) * this.Ci)
    this.Voltage_drain_satest = Math.pow((Math.pow(this.Voltage_fixed, 2) / 2 / this.gamma), (1 / this.alpha)) + this.Voltage_drain0;
    //this.Voltage_drain_sat = Math.min(P);
    this.Voltage_max = this.Voltage_scanRange;
    this.Voltage_step = this.Voltage_max / 200

    this.tau_R = this.esc_nongated * e0 / (this.n0 * 1.6e-19 * this.mu_nongated);
    this.tau_T = Math.pow((this.d_nongated * 1e-4), 2) / (this.mu_nongated * 100);
    this.ninj = this.Ci * (this.Voltage_fixed - this.Voltage_threshold) * (this.W_gated) / (this.W1_nongated * this.W2_nongated * 1e-4) / 1.6e-19;
    this.ninj_n0 = this.ninj / this.n0;

    if (((this.tau_R / this.tau_T) > 2) | (this.ninj_n0 > 2)) {
        this.alpha_suggested = 2;
    } else if (((this.tau_R / this.tau_T) < 0.2) & (this.ninj_n0 < 0.2)) {
        this.alpha_suggested = 1;
    } else {
        this.alpha_suggested = 1.5;
    }
    if (this.alpha_suggested == 1) {
        this.Q0_suggested = this.n0 * 1.6e-19;
    } else if (this.alpha_suggested == 2) {
        this.Q0_suggested = 9 / 8 * this.esc_nongated * e0;
    } else {
        this.Q0_suggested = (9 / 8 * this.esc_nongated * e0 + this.n0 * 1.6e-19) / 2;
    }

    this.Q0_dTest = this.Q0_suggested * 10;

    this.a = [];
    this.b = [];
    this.c = [];
    this.bb_4ac = [];
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
    this.a[0] = 0;
    this.b[0] = 0;
    this.c[0] = 0;
    this.bb_4ac[0] = 0;
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
            this.a[i] = 1 + this.gamma * this.alpha * (this.alpha - 1) * Math.pow(this.Voltage_drain_minus_drain0[i], this.alpha - 2);
            this.b[i] = -2 * (this.Voltage_gate_minus_threshold[i] + this.alpha * this.gamma * Math.pow(this.Voltage_drain_minus_drain0[i], this.alpha - 1));
            this.c[i] = 2 * this.gamma * Math.pow(this.Voltage_drain_minus_drain0[i], this.alpha);
            this.bb_4ac[i] = (this.b[i] * this.b[i] - 4 * this.a[i] * this.c[i])
            // V1
            if (this.bb_4ac[i] > 0) {
                this.Voltage_1[i] = Math.min((-this.b[i] - Math.sqrt(this.bb_4ac[i])) / 2 / this.a[i], this.Voltage_gate_minus_threshold[i]);
            } else {
                this.Voltage_1[i] = Math.min(this.Voltage_1[i - 1], this.Voltage_gate_minus_threshold[i]);
            }
            // drain current
            if (this.Voltage_1[i] <= this.Voltage_gate_minus_threshold[i]) {
                this.I_drain[i] = this.WLCU * (this.Voltage_gate_minus_threshold[i] - this.Voltage_1[i] / 2) * this.Voltage_1[i];
            } else {
                this.I_drain[i] = this.I_drain[i - 1];
            }
            if (this.bb_4ac[i] * this.bb_4ac[i - 1] < 0) {
                this.I_max_search[i] = this.I_drain[i];
            } else {
                this.I_max_search[i] = this.I_saturation * 10;
            }
        }
        // second time scan
        this.I_max = Math.min.apply(null, this.I_max_search);
        this.R_saturation = (this.Voltage_fixed - this.Voltage_threshold) / Math.min(this.I_saturation, this.I_max);
        this.R_back = this.R_saturation * 1e4;
        for (i = 1; i < 200; i++) {
            this.I_drain_tot[i] = this.Voltage_drain_minus_drain0[i] /
                (this.Voltage_drain_minus_drain0[i] / this.I_drain[i] * this.R_back_real /
                    (this.Voltage_drain_minus_drain0[i] / this.I_drain[i] + this.R_back_real));
            this.I_drain_regular[i] = this.WLCU * (this.Voltage_gate_minus_threshold[i] -
                Math.min(this.Voltage_gate_minus_threshold[i], this.Voltage_drain_minus_drain0[i]) / 2)
                * Math.min(this.Voltage_gate_minus_threshold[i], this.Voltage_drain_minus_drain0[i]);
            if (this.Voltage_1[i] < Math.max.apply(null, this.Voltage_1)) {
                this.Voltage_drain_sat_search[i] = this.Voltage_max * 10;
            } else {
                this.Voltage_drain_sat_search[i] = this.Voltage_drain_minus_drain0[i];
            }
        }
        this.Voltage_drain_sat = Math.min.apply(null, this.Voltage_drain_sat_search);
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
            this.a[i] = 1 + this.gamma * this.alpha * (this.alpha - 1) * Math.pow(this.Voltage_drain_minus_drain0[i], this.alpha - 2);
            this.b[i] = -2 * (this.Voltage_gate_minus_threshold[i] + this.alpha * this.gamma * Math.pow(this.Voltage_drain_minus_drain0[i], this.alpha - 1));
            this.c[i] = 2 * this.gamma * Math.pow(this.Voltage_drain_minus_drain0[i], this.alpha);
            this.bb_4ac[i] = (this.b[i] * this.b[i] - 4 * this.a[i] * this.c[i])
            // V1
            if (this.bb_4ac[i] > 0) {
                this.Voltage_1[i] = Math.min((-this.b[i] - Math.sqrt(this.bb_4ac[i])) / 2 / this.a[i], this.Voltage_gate_minus_threshold[i]);
            } else {
                this.Voltage_1[i] = this.Voltage_gate_minus_threshold[i];
            }
            // drain current
            if (this.Voltage_1[i] <= this.Voltage_gate_minus_threshold[i]) {
                this.I_drain[i] = this.WLCU * (this.Voltage_gate_minus_threshold[i] - this.Voltage_1[i] / 2) * this.Voltage_1[i];
            } else {
                this.I_drain[i] = this.I_drain[i - 1];
            }
            if (this.bb_4ac[i] * this.bb_4ac[i - 1] < 0) {
                this.I_max_search[i] = this.I_drain[i];
            } else {
                this.I_max_search[i] = this.I_saturation * 10;
            }
        }
        // second time scan
        this.I_max = Math.min.apply(null, this.I_max_search);
        this.R_saturation = (this.Voltage_fixed - this.Voltage_threshold) / Math.min(this.I_saturation, this.I_max);
        this.R_back = this.R_saturation * 1e4;
        for (i = 1; i < 200; i++) {
            this.I_drain_tot[i] = this.Voltage_drain_minus_drain0[i] /
                (this.Voltage_drain_minus_drain0[i] / this.I_drain[i] * this.R_back_real /
                    (this.Voltage_drain_minus_drain0[i] / this.I_drain[i] + this.R_back_real));
            this.I_drain_regular[i] = this.WLCU * (this.Voltage_gate_minus_threshold[i] -
                Math.min(this.Voltage_gate_minus_threshold[i], this.Voltage_drain_minus_drain0[i]) / 2)
                * Math.min(this.Voltage_gate_minus_threshold[i], this.Voltage_drain_minus_drain0[i]);
            if (this.Voltage_1[i] < Math.max.apply(null, this.Voltage_1)) {
                this.Voltage_drain_sat_search[i] = this.Voltage_max * 10;
            } else {
                this.Voltage_drain_sat_search[i] = this.Voltage_drain_minus_drain0[i];
            }
        }
        this.Voltage_drain_sat = Math.min.apply(null, this.Voltage_drain_sat_search);
            // generate Vscan - Vscan point data
        this.data_Vscan = [];
        for (j = 0; j < 200; j++) {
            this.data_Vscan.push([this.Voltage_scan[j + 1], this.Voltage_scan[j + 1] - this.Voltage_threshold])
        }
    }
    this.data_I_tot = [];
    this.data_I_reg = [];
    this.data_Vd = [];
    this.data_V1 = [];
    for (j = 0; j < 200; j++) {
        this.data_I_tot.push([this.Voltage_scan[j], this.I_drain_tot[j] * 1e6])
        this.data_I_reg.push([this.Voltage_scan[j], this.I_drain_regular[j] * 1e6])
        this.data_Vd.push([this.Voltage_scan[j + 1], this.Voltage_drain_minus_drain0[j + 1]])
        this.data_V1.push([this.Voltage_scan[j + 1], this.Voltage_1[j + 1]])
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
            name: 'Id',
            type: 'line',
            showSymbol: false,
            clip: true,
            symbolSize: 3,
            data: data1.data_I_tot,
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
            data: data1.data_I_reg,
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
            data: data1.data_V1,
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




