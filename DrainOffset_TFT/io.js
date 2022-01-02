// JavaScript source code
function inputdata() {
    //input data into the chart
    data1 = new scanning();
    // document.getElementById('param_nnn').value = data1.ninj_n0.toPrecision(4);
    // document.getElementById('param_tauR_tauT').value = (data1.tau_R / data1.tau_T).toPrecision(4);
    // document.getElementById('param_eta').value = (data1.ninj_n0 * data1.tau_R / data1.tau_T).toPrecision(4);
    // document.getElementById('param_Q_suggested').value = data1.suggest_param[1].toPrecision(4);
    // document.getElementById('param_alpha_suggested').value = data1.suggest_param[0];

    option1.series[0].data = data1.data_I_tot;
    option1.series[1].data = data1.data_I_reg;
    Chart1.setOption(option1);

    option2.series[0].data = data1.data_V1;
    option2.series[1].data = data1.data_Vscan;
    Chart2.setOption(option2);
    chartInput3();
}
function initialization() {
    //initialize the data
    //param_nongated
    document.getElementById('param_W_nongated').value = "100";
    document.getElementById('param_d_nongated').value = "2";
    document.getElementById('param_tsc_nongated').value = "60";
    document.getElementById('param_mu_nongated').value = "1";
    // document.getElementById('param_n0').value = "1e14";
    document.getElementById('param_esc_nongated').value = "9";
    document.getElementById('param_alpha').value = "1.5";
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
    document.getElementById('param_Q0').value = "1e-6";
    document.getElementById('param_Rback').value = "1e11";
    //param_const

    data1 = new scanning();
}


function scanning() {
    //param_nongated
    this.W_nongated = parseFloat(document.getElementById('param_W_nongated').value);
    this.d_nongated = parseFloat(document.getElementById('param_d_nongated').value);
    this.tsc_nongated = parseFloat(document.getElementById('param_tsc_nongated').value);
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
    this.S = this.W_nongated * 1e-4 * this.tsc_nongated * 1e-7;
    this.beta = 2 * this.alpha - 1;
    this.SUDB = this.S * this.mu_nongated / Math.pow((this.d_nongated * 1e-4), this.beta);
    this.rou = 1 / this.n0 / 1.6e-19 / this.mu_nongated;
    const e0 = 8.85e-14;

    this.Ci = e0 * this.eox_gated / (this.tox_gated * 1e-7);
    this.WLCU = this.W_gated / this.L_gated * this.Ci * this.mu_gated;
    this.I_saturation = this.WLCU * Math.pow((this.Voltage_fixed - this.Voltage_threshold), 2) / 2;
    //this.I_max = Math.min(Q);
    // this.R_saturation = (this.Voltage_fixed - this.Voltage_threshold) / Math.min(this.I_saturation, this.I_max);
    // this.R_back = this.R_saturation * 1e4;

    this.Q0_alphaTest = this.Qtest / (this.SUDB * Math.pow(10, this.alpha));

    // this.Q0 = this.Q0_alphaTest;
    this.gamma = this.Q0 * this.SUDB / ((this.mu_gated * this.W_gated * 1e-4) / (this.L_gated * 1e-4) * this.Ci)
    this.Voltage_drain_satest = Math.pow((Math.pow(this.Voltage_fixed, 2) / 2 / this.gamma), (1 / this.alpha)) + this.Voltage_drain0;
    //this.Voltage_drain_sat = Math.min(P);
    this.Voltage_max = this.Voltage_scanRange;
    this.Voltage_step = this.Voltage_max / 200

    this.tau_R = this.esc_nongated * e0 / (this.n0 * 1.6e-19 * this.mu_nongated);
    this.tau_T = Math.pow((this.d_nongated * 1e-4), 2) / (this.mu_nongated * 3);
    this.ninj = this.Ci * (this.Voltage_fixed - this.Voltage_threshold) / (this.tsc_nongated * 1e-7) / 1.6e-19;
    this.ninj_n0 = this.ninj / this.n0;

    this.yita = this.tau_R / this.tau_T * this.ninj_n0;
    this.suggest_param = yita_suggested_alpha_and_Q0(this.yita);



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
                this.Voltage_1[i] = Math.min((-this.b[i] - Math.sqrt(this.bb_4ac[i])) / 2 / this.a[i], this.Voltage_gate_minus_threshold[i], this.Voltage_drain_minus_drain0[i]);
            } else {
                this.Voltage_1[i] = Math.min(this.Voltage_1[i - 1], this.Voltage_gate_minus_threshold[i], this.Voltage_drain_minus_drain0[i]);
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
                this.Voltage_1[i] = Math.min((-this.b[i] - Math.sqrt(this.bb_4ac[i])) / 2 / this.a[i], this.Voltage_gate_minus_threshold[i], this.Voltage_drain_minus_drain0[i]);
            } else {
                this.Voltage_1[i] = Math.min(this.Voltage_gate_minus_threshold[i], this.Voltage_drain_minus_drain0[i]);
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

// V(x)
function V_x(data, pointNum) {
    this.Voltage_1 = data.Voltage_1[pointNum]
    this.Voltage_drain = data.Voltage_drain_minus_drain0[pointNum]
    this.Voltage_gate = data.Voltage_gate_minus_threshold[pointNum]
    this.d_Voltage = this.Voltage_drain - this.Voltage_1;
    this.theta = 2 * this.Voltage_1 * (this.Voltage_gate - this.Voltage_1 / 2)
        / (this.Voltage_gate * this.Voltage_gate);
    this.xstep1 = data.L_gated / 200;
    this.Voltage_x = [];
    this.Voltage_x_l = [];
    this.ave = [];
    this.dxPoint = 2;
    this.x = [];

    //from 0 to L
    for (i = 0; i < (200 + this.dxPoint); i++) {
        this.x[i] = this.xstep1 * i;
        this.Voltage_x_l[i] = this.Voltage_gate * (1 - Math.sqrt(1 - this.theta * this.x[i] / data.L_gated));
    }
    //case1
    for (i = 0; i < 200; i++) {
        this.Voltage_x[i] = this.Voltage_x_l[i];
    }
    //case2
    // for (i = 0; i < (200 - this.dxPoint); i++) {
    //     this.Voltage_x[i] = this.Voltage_x_l[i];
    // }
    // for (i = (200 - this.dxPoint); i < 200; i++) {
    //     this.Voltage_x[i] = (this.Voltage_x_l[i] + this.Voltage_1) / 2;
    // }


    //from L to L+d
    for (i = 200; this.xstep1 * i <= (data.L_gated + data.d_nongated); i++) {
        this.x[i] = this.xstep1 * i;
        this.Voltage_x[i] = this.Voltage_1 + (this.d_Voltage) * Math.pow((this.x[i] - data.L_gated) / data.d_nongated, data.beta / data.alpha);
    }
    //case 3
    for (i = (200 - this.dxPoint); i < 200; i++) {
        this.ave.push(this.Voltage_x[i]);
        this.Voltage_x_l[i] = this.Voltage_x[i];
    }
    for (i = 200; i <= (200 + this.dxPoint); i++) {
        this.ave.push(this.Voltage_x[i]);
        this.Voltage_x_l[i] = this.Voltage_x[i];
    }

    this.data_Vx = [];
    for (j = 0; this.xstep1 * j <= (data.L_gated + data.d_nongated); j++) {
        this.data_Vx.push([this.x[j], this.Voltage_x[j]])
    }
}

function n0_suggested_alpha_and_Q0(n0){
    if(n0 >= 3.55862E16) {
        alpha = 1;
        Q0 = 5.92E-3;
    } else if(n0 >= 3.10815E16) {
        alpha = 1.02;
        Q0 = 3.54E-3;
    } else if(n0 >= 2.3316E16) {
        alpha = 1.08;
        Q0 = 8.18E-4;
    } else if(n0 >= 1.31788E16) {
        alpha = 1.24;
        Q0 = 1.99E-5;
    } else if(n0 >= 7.33577E15) {
        alpha = 1.41;
        Q0 = 4.61E-7;
    } else if(n0 >= 5.39027E15) {
        alpha = 1.58;
        Q0 = 1.13E-8;
    } else if(n0 >= 3.84188E15) {
        alpha = 1.68;
        Q0 = 1.26E-9;
    } else if(n0 >= 1.82079E15) {
        alpha = 1.8;
        Q0 = 9.26712E-11;
    } else if(n0 >= 8.49666E13) {
        alpha = 2;
        Q0 = 1.30826E-12;
    } else if(n0 >= 3.36392E13) {
        alpha = 2;
        Q0 = 1.07436E-12;
    } else if(n0 >= 6.19787E11) {
        alpha = 2.17;
        Q0 = 2.52831E-14;
    } else if(n0 >= 4.72682E10) {
        alpha = 2.355;
        Q0 = 3.34935E-16;
    } else if(n0 >= 1.77065E10) {
        alpha = 2.48;
        Q0 = 1.81072E-17;
    } else if(n0 >= 7.21954E9) {
        alpha = 2.6;
        Q0 = 9.21447E-19;
    } else if(n0 >= 3.989E9) {
        alpha = 2.7;
        Q0 = 6.83553E-20;
    } else if(n0 >= 1.6729E9) {
        alpha = 2.75;
        Q0 = 1.62155E-20;
    } else if(n0 >= 8.21752E8) {
        alpha = 2.81;
        Q0 = 2.7024E-21;
    } else if(n0 >= 4.22231E8) {
        alpha = 2.83;
        Q0 = 1.29959E-21;
    } else {
        alpha = 2.83;
        Q0 = 1.29959E-21;
    }

    return [alpha,Q0];
}

function yita_suggested_alpha_and_Q0(yita){
    if(yita <= 0.13483) {
        alpha = 1;
        Q0 = 5.92E-3;
    } else if(yita <= 0.17675) {
        alpha = 1.02;
        Q0 = 3.54E-3;
    } else if(yita <= 0.31408) {
        alpha = 1.08;
        Q0 = 8.18E-4;
    } else if(yita <= 0.98311) {
        alpha = 1.24;
        Q0 = 1.99E-5;
    } else if(yita <= 3.17292) {
        alpha = 1.41;
        Q0 = 4.61E-7;
    } else if(yita <= 5.87664) {
        alpha = 1.58;
        Q0 = 1.13E-8;
    } else if(yita <= 11.56811) {
        alpha = 1.68;
        Q0 = 1.26E-9;
    } else if(yita <= 51.50257) {
        alpha = 1.8;
        Q0 = 9.26712E-11;
    } else if(yita <= 23651.28247) {
        alpha = 2;
        Q0 = 1.30826E-12;
    } else if(yita <= 150889.9282) {
        alpha = 2;
        Q0 = 1.07436E-12;
    } else if(yita <= 4.44495E8) {
        alpha = 2.17;
        Q0 = 2.52831E-14;
    } else if(yita <= 7.64211E10) {
        alpha = 2.355;
        Q0 = 3.34935E-16;
    } else if(yita <= 5.44612E11) {
        alpha = 2.48;
        Q0 = 1.81072E-17;
    } else if(yita <= 3.27591E12) {
        alpha = 2.6;
        Q0 = 9.21447E-19;
    } else if(yita <= 1.07306E13) {
        alpha = 2.7;
        Q0 = 6.83553E-20;
    } else if(yita <= 6.10115E13) {
        alpha = 2.75;
        Q0 = 1.62155E-20;
    } else if(yita <= 2.52853E14) {
        alpha = 2.81;
        Q0 = 2.7024E-21;
    } else if(yita <= 9.57748E14) {
        alpha = 2.83;
        Q0 = 1.29959E-21;
    } else {
        alpha = 2.83;
        Q0 = 1.29959E-21;
    }

    return [alpha,Q0];
}






