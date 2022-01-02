// JavaScript source code
function inputdata() {

    data1 = new scanning();
    document.getElementById('param_Q0_power').value = data1.Q0_power;
    option1 = Chart1.getOption();
    option1.series[0].data = data1.data_I_tot;
    option1.series[1].data = data1.data_I_reg;
    Chart1.setOption(option1);
    option2 = Chart2.getOption();
    option2.series[0].data = data1.data_V1;
    option2.series[1].data = data1.data_V2;
    option2.series[2].data = data1.data_V2_V1;
    option2.series[3].data = data1.data_Vscan;
    Chart2.setOption(option2);
}
function initialization() {
    //param_nongated
    document.getElementById('param_W_nongated').value = "100";
    document.getElementById('param_d_nongated').value = "0.5";
    document.getElementById('param_tsc_nongated').value = "20";
    document.getElementById('param_mu_nongated').value = "1";
    // document.getElementById('param_n0').value = "1.0e14";
    document.getElementById('param_esc_nongated').value = "9";
    document.getElementById('param_alpha').value = "1.3";
    document.getElementById('param_Vd0').value = "0";
    //param_gated
    document.getElementById('param_W_gated').value = "100";
    document.getElementById('param_L1_gated').value = "8";
    document.getElementById('param_L2_gated').value = "8";
    document.getElementById('param_tox_gated').value = "10";
    document.getElementById('param_mu_gated').value = "1";
    document.getElementById('param_mu_gated2').value = "1";
    document.getElementById('param_eox_gated').value = "3.9";
    document.getElementById('param_Vth1').value = "0";
    document.getElementById('param_Vth2').value = "0";
    //param_scan
    document.getElementById('param_scanType').value = "0";
    document.getElementById('param_fixed1').value = "6";
    document.getElementById('param_fixed2').value = "6";
    document.getElementById('param_scanRange').value = "10";
    document.getElementById('param_Q0').value = "1.8e-7";
    document.getElementById('param_Q0_power').value = "0.3";
    document.getElementById('param_Rback').value = "1e11";
    data1 = new scanning();
}

function initialization_Q0(data) {
    if (data.Voltage_scanType == 0) {
        document.getElementById('param_Q0').value = "1.8e-7";
    } else if (data.Voltage_scanType == 1) {
        document.getElementById('param_Q0').value = "1.65e-3";
    } else if (data.Voltage_scanType == 2) {
        document.getElementById('param_Q0').value = "3.48e-6";
    }
}

function initVd() {
    document.getElementById('param_scanType').value = "0";
    document.getElementById('param_Q0').value = "1.8e-7";
}

function initVg1() {
    document.getElementById('param_scanType').value = "1";
    document.getElementById('param_Q0').value = "1.65e-3";
}

function initVg2() {
    document.getElementById('param_scanType').value = "2";
    document.getElementById('param_Q0').value = "3.48e-6";
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
    this.L1_gated = parseFloat(document.getElementById('param_L1_gated').value);
    this.L2_gated = parseFloat(document.getElementById('param_L2_gated').value);
    this.tox_gated = parseFloat(document.getElementById('param_tox_gated').value);
    this.mu_gated = parseFloat(document.getElementById('param_mu_gated').value);
    this.mu_gated2 = parseFloat(document.getElementById('param_mu_gated2').value);
    this.eox_gated = parseFloat(document.getElementById('param_eox_gated').value);
    this.Voltage_threshold_1 = parseFloat(document.getElementById('param_Vth1').value);
    this.Voltage_threshold_2 = parseFloat(document.getElementById('param_Vth2').value);
    //param_scan
    this.Voltage_scanType = parseFloat(document.getElementById('param_scanType').value);
    this.Voltage_fixed_1 = parseFloat(document.getElementById('param_fixed1').value);
    this.Voltage_fixed_2 = parseFloat(document.getElementById('param_fixed2').value);
    this.Voltage_scanRange = parseFloat(document.getElementById('param_scanRange').value);
    this.alpha = parseFloat(document.getElementById('param_alpha').value);
    this.R_back_real = parseFloat(document.getElementById('param_Rback').value)
    // this.Qtest = parseFloat(document.getElementById('param_Qtest').value);

    //param
    this.S = this.W_nongated * 1e-4 * this.tsc_nongated * 1e-7;
    this.beta = 2 * this.alpha - 1;
    this.SUDB = this.S * this.mu_nongated / Math.pow((this.d_nongated * 1e-4), this.beta);
    this.SUDB1 = this.S * this.mu_nongated / Math.pow(((this.d_nongated + this.L1_gated) * 1e-4), this.beta);
    this.SUDB2 = this.S * this.mu_nongated / Math.pow(((this.d_nongated + this.L2_gated) * 1e-4), this.beta);
    this.rou = 1 / this.n0 / 1.6e-19 / this.mu_nongated;
    this.lldl = (this.L1_gated) / (this.L1_gated + this.L2_gated + this.d_nongated);
    this.lldl2 = (this.L2_gated) / (this.L1_gated + this.L2_gated + this.d_nongated);
    const e0 = 8.85e-14;

    this.Ci = e0 * this.eox_gated / (this.tox_gated * 1e-7);
    this.WLCU1 = this.W_gated / this.L1_gated * this.Ci * this.mu_gated;
    this.WLCU2 = this.W_gated / this.L2_gated * this.Ci * this.mu_gated2;
    this.I_saturation = this.WLCU1 * Math.pow((this.Voltage_fixed_1 - this.Voltage_threshold_1), 2) / 2;


    this.Voltage_drain_satest = Math.pow((Math.pow(this.Voltage_fixed_1, 2) / 2 / this.gamma12), (1 / this.alpha)) + this.Voltage_drain0;
    // this.Voltage_max = this.Voltage_scanRange * Math.max(this.Voltage_drain_satest, this.Voltage_fixed_1);
    this.Voltage_max = this.Voltage_scanRange;
    //this.Voltage_step = this.Voltage_max / 100;
    this.Voltage_step = this.Voltage_max / 200;

    // if (this.Voltage_scanType == 0) {
    //     this.Q0 = parseFloat(document.getElementById('param_Q0').value);
    //     this.Qtest = 1e-7;
    //     this.Q0_power = parseFloat(document.getElementById('param_Q0_power').value);
    //     this.Q0_alphaTest = this.Qtest / (this.SUDB1 * Math.pow(10, this.alpha));
    // } else {
        if (this.Voltage_scanType == 1) {
            this.Q0_power_a1 = 0.01;
            this.Q0_power_a2 = 0.14;
            this.Q00_a1 = 0.18;
            this.Q00_a2 = 0.8;
        } else if (this.Voltage_scanType == 2) {
            this.Q0_power_a1 = 0.02;
            this.Q0_power_a2 = 0.06;
            this.Q00_a1 = 0.01;
            this.Q00_a2 = 1.5;
        } else if (this.Voltage_scanType == 0) {
            this.Q0_power_a1 = 0.02;
            this.Q0_power_a2 = 0.06;
            this.Q00_a1 = 0.01;
            this.Q00_a2 = 1.6;
        }
        this.Q00 = parseFloat(document.getElementById('param_Q0').value);
        // this.Q0_power = parseFloat(document.getElementById('param_Q0_power').value);
        this.Q0_power = this.Q0_power_a1 * this.Voltage_fixed_2 + this.Q0_power_a2;
        this.Q0_alphaTest = this.Q00 / (this.SUDB1 * Math.pow(10, this.alpha));
        this.Q0 = this.Q0_alphaTest * (this.Voltage_fixed_2 * this.Q00_a1 + this.Q00_a2);
    // }
    this.gamma12 = this.Q0 * this.SUDB / this.WLCU1;
    this.gamma31 = this.WLCU1 / this.WLCU2;
    this.gamma32 = this.Q0 * this.SUDB / this.WLCU2;

    this.tau_R = this.esc_nongated * e0 / (this.n0 * 1.6e-19 * this.mu_nongated);
    this.tau_T = Math.pow((this.d_nongated * 1e-4), 2) / (this.mu_nongated * 100);
    this.ninj = this.Ci * (this.Voltage_fixed_1 - this.Voltage_threshold_1) / (this.tsc_nongated * 1e-7) / 1.6e-19;
    this.ninj_n0 = this.ninj / this.n0;

    this.a = [];
    this.b = [];
    this.c = [];
    this.bb_4ac = [];
    this.Voltage_scan = [];
    this.Voltage_gate_minus_threshold_1 = [];
    this.Voltage_gate_minus_threshold_2 = [];
    this.Voltage_drain_minus_drain0 = [];
    this.Voltage_drain_minus_drain0_real = [];
    this.Voltage_1 = [];
    this.Voltage_1_output = [];
    this.Voltage_1_transfer1 = [];
    this.Voltage_1_transfer2 = [];
    this.Voltage_2 = [];
    this.I_drain = [];
    this.I_drain_G1 = [];
    this.I_drain_G2 = [];
    this.I_drain_tot = [];
    this.I_drain_regular = [];
    this.I_max_search = [];
    this.Voltage_drain_sat_search = [];
    this.dV = [];
    this.Q = [];
    this.gamma = [];
    this.flag = 0;
    this.Voltage_gate_minus_threshold_1[0] = 0;
    this.Voltage_gate_minus_threshold_2[0] = 0;
    this.Voltage_drain_minus_drain0[0] = 0;
    this.Voltage_drain_minus_drain0_real[0] = 0;
    this.dV[0] = 0;
    this.a[0] = 0;
    this.b[0] = 0;
    this.c[0] = 0;
    this.Q[0] = 0;
    this.gamma[0] = 0;
    this.bb_4ac[0] = 0;
    this.Voltage_1[0] = 0;
    this.Voltage_1_output[0] = 0;
    this.Voltage_1_transfer1[0] = 0;
    this.Voltage_1_transfer2[0] = 0;
    this.Voltage_2[0] = 0;
    this.I_drain[0] = 0;
    this.I_drain_G1[0] = 0;
    this.I_drain_G2[0] = 0;
    this.I_drain_tot[0] = 0;
    this.I_drain_regular[0] = 0;
    this.I_max_search[0] = this.I_saturation * 10;
    this.Voltage_drain_sat_search[0] = this.Voltage_max * 10;

    this.Voltage_1_max = 0;
    this.Q0_max = 0;




    if (this.Voltage_scanType == 0) {
        //Vd
        this.temp = [];
        this.temp[0] = 0;
        this.Voltage_scan[0] = this.Voltage_drain0;
        for (i = 1; i < 200; i++) {
            this.Voltage_scan[i] = this.Voltage_scan[i - 1] + this.Voltage_step;
            this.Voltage_gate_minus_threshold_1[i] = this.Voltage_fixed_1 - this.Voltage_threshold_1;
            this.Voltage_gate_minus_threshold_2[i] = this.Voltage_fixed_2 - this.Voltage_threshold_2;
            this.Voltage_drain_minus_drain0[i] = this.Voltage_scan[i] - this.Voltage_drain0;
            this.Voltage_drain_minus_drain0_real[i] = Math.min(this.Voltage_drain_minus_drain0[i], this.Voltage_gate_minus_threshold_2[i]);
        }
        // calulate V1,max & Q0,max
        for (i = 1; i < 200; i++) {
            this.a[i] = 1 + this.gamma31;
            this.b[i] = -2 * (this.gamma31 * this.Voltage_gate_minus_threshold_1[i] + this.Voltage_gate_minus_threshold_2[i]);
            this.c[i] = 2 * (this.Voltage_gate_minus_threshold_2[i] - this.Voltage_drain_minus_drain0_real[i] / 2)
                * (this.Voltage_drain_minus_drain0_real[i]);
            this.bb_4ac[i] = (this.b[i] * this.b[i] - 4 * this.a[i] * this.c[i]);
            if (this.bb_4ac[i] > 0) {
                this.Voltage_1[i] = Math.min((-this.b[i] - Math.pow(this.bb_4ac[i], 0.5)) / 2 / this.a[i],
                    this.Voltage_gate_minus_threshold_1[i], this.Voltage_gate_minus_threshold_2[i]);
            } else {
                this.Voltage_1[i] = Math.min(this.Voltage_gate_minus_threshold_1[i], this.Voltage_gate_minus_threshold_2[i]);
            }
        }
        // this.Voltage_1_max = Math.max.apply(null, this.Voltage_1);
        this.Voltage_1_max = Math.min(this.Voltage_step, this.Voltage_fixed_1) - 0.001;
        for (i = 1; i < 200; i++) {
            if (this.alpha >= 2) {
                this.temp[i] = (this.Voltage_gate_minus_threshold_1[i] - (this.Voltage_drain_minus_drain0_real[i] + this.Voltage_1[i]) / 2)
                    * (this.Voltage_drain_minus_drain0_real[i] - this.Voltage_1[i]) * this.WLCU2 / (Math.pow(this.Voltage_1[i], this.alpha) * this.SUDB);
                if (this.Q0_max >= this.temp[i] || i == 199) {
                    this.Q0_max = this.temp[i];
                }
            } else {
                this.temp[i] = (this.Voltage_fixed_1 - this.Voltage_1_max / 2)
                    * this.Voltage_1_max * this.WLCU1 / (Math.pow(this.Voltage_1_max, this.alpha) * this.SUDB);
                this.Q0_max = this.temp[i];

            }
        }
        if (this.Q0 >= this.Q0_max) {
            this.Q0 = this.Q0_max;
            this.gamma12 = this.Q0 * this.SUDB / this.WLCU1;
            this.gamma32 = this.Q0 * this.SUDB / this.WLCU2;
        }
        this.gamma_max = this.Q0_max * this.SUDB / this.WLCU1;
        // calulate V2
        for (i = 1; i < 200; i++) {
            this.gamma[i] = Math.min(this.gamma32 * Math.pow(1, this.Q0_power), this.gamma_max);
        }
        for (i = 1; i < 200; i++) {
            // V2
            this.a[i] = this.gamma[i] * this.alpha * (this.alpha - 1) * Math.pow(this.Voltage_drain_minus_drain0_real[i], (this.alpha - 2)) - 1;
            this.b[i] = -2 * (this.Voltage_gate_minus_threshold_2[i] - this.Voltage_drain_minus_drain0_real[i]
                + this.alpha * this.gamma[i] * Math.pow(this.Voltage_drain_minus_drain0_real[i], (this.alpha - 1)));
            this.c[i] = 2 * this.gamma[i] * Math.pow(this.Voltage_drain_minus_drain0_real[i], (this.alpha));
            this.bb_4ac[i] = (this.b[i] * this.b[i] - 4 * this.a[i] * this.c[i]);
            if (this.bb_4ac[i] > 0) {
                this.Voltage_2[i] = Math.max(Math.min(this.Voltage_drain_minus_drain0_real[i] - (-this.b[i] - Math.pow(this.bb_4ac[i], 0.5)) / 2 / this.a[i],
                    this.Voltage_gate_minus_threshold_2[i], this.Voltage_drain_minus_drain0_real[i]), this.Voltage_1[i]);
            } else {
                this.Voltage_2[i] = Math.max(Math.min(this.Voltage_gate_minus_threshold_2[i], this.Voltage_drain_minus_drain0_real[i]), this.Voltage_1[i]);
            }

        }
        // calulate V1
        for (i = 1; i < 200; i++) {
            // V1
            this.a[i] = 1;
            this.b[i] = -2 * this.Voltage_gate_minus_threshold_1[i];
            this.c[i] = 1 / this.gamma31 * (2 * this.Voltage_gate_minus_threshold_2[i] - this.Voltage_drain_minus_drain0_real[i] - this.Voltage_2[i]) * (this.Voltage_drain_minus_drain0_real[i] - this.Voltage_2[i]);
            this.bb_4ac[i] = (this.b[i] * this.b[i] - 4 * this.a[i] * this.c[i]);
            if (this.bb_4ac[i] > 0) {
                this.Voltage_1[i] = Math.min((-this.b[i] - Math.pow(this.bb_4ac[i], 0.5)) / 2 / this.a[i],
                    this.Voltage_gate_minus_threshold_1[i], this.Voltage_gate_minus_threshold_2[i], this.Voltage_drain_minus_drain0_real[i], this.Voltage_1[i]);
            } else {
                this.Voltage_1[i] = Math.min(this.Voltage_gate_minus_threshold_1[i], this.Voltage_gate_minus_threshold_2[i], this.Voltage_drain_minus_drain0_real[i], this.Voltage_1[i]);
            }
        }

        // I_drain
        // case 
        for (i = 1; i < 200; i++) {
            this.I_drain_G1[i] = this.WLCU1 * (this.Voltage_gate_minus_threshold_1[i] - this.Voltage_1[i] / 2) * this.Voltage_1[i];
            this.I_drain_G2[i] = this.WLCU2 * this.L1_gated / this.L2_gated *
                (this.Voltage_gate_minus_threshold_2[i] - (this.Voltage_drain_minus_drain0_real[i]
                    + this.Voltage_2[i]) / 2) * (this.Voltage_drain_minus_drain0_real[i] - this.Voltage_2[i])
            if (Math.abs(1 - this.I_drain_G1[i] / this.I_drain_G2[i]) > 0.05) {
                this.a[i] = 1;
                this.b[i] = -2 * this.Voltage_gate_minus_threshold_2[i];
                this.c[i] = (2 * this.Voltage_gate_minus_threshold_2[i] - this.Voltage_drain_minus_drain0_real[i]) * this.Voltage_drain_minus_drain0_real[i] - this.gamma31 *
                    (2 * this.Voltage_gate_minus_threshold_1[i] - this.Voltage_1[i]) * this.Voltage_1[i];
                this.bb_4ac[i] = (this.b[i] * this.b[i] - 4 * this.a[i] * this.c[i]);
                if (this.bb_4ac[i] > 0) {
                    this.Voltage_2[i] = Math.min((-this.b[i] - Math.pow(this.bb_4ac[i], 0.5)) / 2 / this.a[i],
                        this.Voltage_gate_minus_threshold_2[i], this.Voltage_drain_minus_drain0_real[i]);
                } else {
                    this.Voltage_2[i] = Math.min(this.Voltage_gate_minus_threshold_2[i], this.Voltage_drain_minus_drain0_real[i]);
                }
                this.I_drain_G1[i] = this.WLCU1 * (this.Voltage_gate_minus_threshold_1[i] - this.Voltage_1[i] / 2) * this.Voltage_1[i];
                this.I_drain_G2[i] = this.WLCU2 * this.L1_gated / this.L2_gated *
                    (this.Voltage_gate_minus_threshold_2[i] - (this.Voltage_drain_minus_drain0_real[i]
                        + this.Voltage_2[i]) / 2) * (this.Voltage_drain_minus_drain0_real[i] - this.Voltage_2[i])

            }
            this.I_drain[i] = Math.min(this.I_drain_G1[i], this.I_drain_G2[i]);
        }



        for (i = 1; i < 200; i++) {
            this.I_drain_tot[i] = this.Voltage_drain_minus_drain0_real[i] /
                (this.Voltage_drain_minus_drain0_real[i] / this.I_drain[i] * this.R_back_real /
                    (this.Voltage_drain_minus_drain0_real[i] / this.I_drain[i] + this.R_back_real));
            this.I_drain_regular[i] = this.WLCU1 * (this.Voltage_gate_minus_threshold_1[i] -
                Math.min(this.Voltage_gate_minus_threshold_1[i], this.Voltage_drain_minus_drain0_real[i]) / 2)
                * Math.min(this.Voltage_gate_minus_threshold_1[i], this.Voltage_drain_minus_drain0_real[i]) * this.lldl;
        }
        // generate Vscan - Vscan point data
        this.data_Vscan = [];
        for (j = 0; j < 200; j++) {
            this.data_Vscan.push([this.Voltage_scan[j + 1], this.Voltage_scan[j + 1] - this.Voltage_drain0])
        }


    }
    else if (this.Voltage_scanType == 1) {

        // Vg1
        this.temp = [];
        this.temp[0] = 0;
        this.Voltage_scan[0] = this.Voltage_threshold_1;
        for (i = 1; i < 200; i++) {
            this.Voltage_scan[i] = this.Voltage_scan[i - 1] + this.Voltage_step;
            this.Voltage_gate_minus_threshold_1[i] = this.Voltage_scan[i] - this.Voltage_threshold_1;
            this.Voltage_gate_minus_threshold_2[i] = this.Voltage_fixed_2 - this.Voltage_threshold_2;
            this.Voltage_drain_minus_drain0[i] = this.Voltage_fixed_1 - this.Voltage_drain0;
            this.Voltage_drain_minus_drain0_real[i] = Math.min(this.Voltage_drain_minus_drain0[i], this.Voltage_gate_minus_threshold_2[i]);
        }
        // calulate V1,max & Q0,max
        for (i = 1; i < 200; i++) {
            this.a[i] = 1 + this.gamma31;
            this.b[i] = -2 * (this.gamma31 * this.Voltage_gate_minus_threshold_1[i] + this.Voltage_gate_minus_threshold_2[i]);
            this.c[i] = 2 * (this.Voltage_gate_minus_threshold_2[i] - this.Voltage_drain_minus_drain0_real[i] / 2)
                * (this.Voltage_drain_minus_drain0_real[i]);
            this.bb_4ac[i] = (this.b[i] * this.b[i] - 4 * this.a[i] * this.c[i]);

            if (this.bb_4ac[i] > 0) {
                this.Voltage_1[i] = Math.min((-this.b[i] - Math.pow(this.bb_4ac[i], 0.5)) / 2 / this.a[i],
                    this.Voltage_gate_minus_threshold_1[i], this.Voltage_gate_minus_threshold_2[i]);
            } else {
                this.Voltage_1[i] = Math.min(this.Voltage_gate_minus_threshold_1[i], this.Voltage_gate_minus_threshold_2[i]);
            }
        }
        this.Voltage_1_max = Math.max.apply(null, this.Voltage_1);
        for (i = 1; i < 200; i++) {
            this.temp[i] = (this.Voltage_gate_minus_threshold_1[i] - this.Voltage_1[i] / 2)
                * this.Voltage_1[i] * this.WLCU1 / (Math.pow(this.Voltage_drain_minus_drain0_real[i] - this.Voltage_1[i], this.alpha) * this.SUDB);
            if (this.alpha >= 2) {
                if (this.Q0_max < this.temp[i]) {
                    this.Q0_max = this.temp[i];
                }
            } else {
                if (this.Voltage_1_max == this.Voltage_1[i]) {
                    this.Q0_max = this.temp[i];
                }
            }
        }
        if (this.Q0 >= this.Q0_max) {
            this.Q0 = this.Q0_max;
            this.gamma12 = this.Q0 * this.SUDB / this.WLCU1;
            this.gamma32 = this.Q0 * this.SUDB / this.WLCU2;
        }
        this.gamma_max = this.Q0_max * this.SUDB / this.WLCU1;
        // calulate V1
        for (i = 1; i < 200; i++) {
            this.Q[i] = this.Q0 * Math.pow(this.Voltage_gate_minus_threshold_1[i], this.Q0_power);
            this.gamma[i] = Math.min(this.gamma12 * Math.pow(this.Voltage_gate_minus_threshold_1[i] / this.Voltage_step, this.Q0_power), this.gamma_max);
        }
        for (i = 1; i < 200; i++) {
            // V1
            this.a[i] = 1 + this.gamma[i] * this.alpha * (this.alpha - 1) * Math.pow(this.Voltage_drain_minus_drain0_real[i], (this.alpha - 2));
            this.b[i] = -2 * (this.Voltage_gate_minus_threshold_1[i] + this.alpha * this.gamma[i] * Math.pow(this.Voltage_drain_minus_drain0_real[i], (this.alpha - 1)));
            this.c[i] = 2 * this.gamma[i] * Math.pow(this.Voltage_drain_minus_drain0_real[i], this.alpha);
            this.bb_4ac[i] = (this.b[i] * this.b[i] - 4 * this.a[i] * this.c[i]);
            if (this.bb_4ac[i] > 0) {
                this.Voltage_1[i] = Math.min((-this.b[i] - Math.pow(this.bb_4ac[i], 0.5)) / 2 / this.a[i],
                    this.Voltage_gate_minus_threshold_1[i], this.Voltage_gate_minus_threshold_2[i], this.Voltage_drain_minus_drain0_real[i], this.Voltage_1[i]);
            } else {
                this.Voltage_1[i] = Math.min(this.Voltage_gate_minus_threshold_1[i], this.Voltage_gate_minus_threshold_2[i], this.Voltage_drain_minus_drain0_real[i], this.Voltage_1[i]);
            }
        }
        // calulate V2
        for (i = 1; i < 200; i++) {
            // V2
            this.a[i] = 1;
            this.b[i] = -2 * this.Voltage_gate_minus_threshold_2[i];
            this.c[i] = (2 * this.Voltage_gate_minus_threshold_2[i] - this.Voltage_drain_minus_drain0_real[i])
                * this.Voltage_drain_minus_drain0_real[i] - this.gamma31 *
                (2 * this.Voltage_gate_minus_threshold_1[i] - this.Voltage_1[i]) * this.Voltage_1[i];
            this.bb_4ac[i] = (this.b[i] * this.b[i] - 4 * this.a[i] * this.c[i]);
            if (this.bb_4ac[i] > 0) {
                this.Voltage_2[i] = Math.min((-this.b[i] - Math.pow(this.bb_4ac[i], 0.5)) / 2 / this.a[i],
                    this.Voltage_gate_minus_threshold_2[i], this.Voltage_drain_minus_drain0_real[i]);
            } else {
                this.Voltage_2[i] = Math.min(this.Voltage_gate_minus_threshold_2[i], this.Voltage_drain_minus_drain0_real[i]);
            }

        }

        // I_drain
        // case 
        for (i = 1; i < 200; i++) {
            this.I_drain_G1[i] = this.WLCU1 * (this.Voltage_gate_minus_threshold_1[i] - this.Voltage_1[i] / 2) * this.Voltage_1[i];
            this.I_drain_G2[i] = this.WLCU2 * this.L1_gated / this.L2_gated *
                (this.Voltage_gate_minus_threshold_2[i] - (this.Voltage_drain_minus_drain0_real[i]
                    + this.Voltage_2[i]) / 2) * (this.Voltage_drain_minus_drain0_real[i] - this.Voltage_2[i])
            if (Math.abs(1 - this.I_drain_G1[i] / this.I_drain_G2[i]) > 0.05) {
                this.a[i] = 1;
                this.b[i] = -2 * this.Voltage_gate_minus_threshold_1[i];
                this.c[i] = 1 / this.gamma31 * (2 * this.Voltage_gate_minus_threshold_2[i] -
                    this.Voltage_drain_minus_drain0_real[i] - this.Voltage_2[i]) *
                    (this.Voltage_drain_minus_drain0_real[i] - this.Voltage_2[i]);
                this.bb_4ac[i] = (this.b[i] * this.b[i] - 4 * this.a[i] * this.c[i]);
                if (this.bb_4ac[i] > 0) {
                    this.Voltage_1[i] = Math.min((-this.b[i] - Math.pow(this.bb_4ac[i], 0.5)) / 2 / this.a[i],
                        this.Voltage_gate_minus_threshold_1[i], this.Voltage_gate_minus_threshold_2[i], this.Voltage_drain_minus_drain0_real[i], this.Voltage_1[i]);
                }
            }
            this.I_drain[i] = Math.min(this.I_drain_G1[i], this.I_drain_G2[i]);

        }

        for (i = 1; i < 200; i++) {
            this.I_drain_tot[i] = this.Voltage_drain_minus_drain0_real[i] /
                (this.Voltage_drain_minus_drain0_real[i] / this.I_drain[i] * this.R_back_real /
                    (this.Voltage_drain_minus_drain0_real[i] / this.I_drain[i] + this.R_back_real));
            this.I_drain_regular[i] = this.WLCU1 * (this.Voltage_gate_minus_threshold_1[i] -
                Math.min(this.Voltage_gate_minus_threshold_1[i], this.Voltage_drain_minus_drain0_real[i]) / 2)
                * Math.min(this.Voltage_gate_minus_threshold_1[i], this.Voltage_drain_minus_drain0_real[i]) * this.lldl;
        }
        // generate Vscan - Vscan point data
        this.data_Vscan = [];
        for (j = 0; j < 200; j++) {
            this.data_Vscan.push([this.Voltage_scan[j + 1], this.Voltage_scan[j + 1] - this.Voltage_threshold_1])
        }
    }
    else if (this.Voltage_scanType == 2) {
        // Vg2
        this.temp = [];
        this.temp[0] = 0;
        this.Voltage_scan[0] = this.Voltage_threshold_2;
        for (i = 1; i < 200; i++) {
            this.Voltage_scan[i] = this.Voltage_scan[i - 1] + this.Voltage_step;
            this.Voltage_gate_minus_threshold_1[i] = this.Voltage_fixed_2 - this.Voltage_threshold_1;
            this.Voltage_gate_minus_threshold_2[i] = this.Voltage_scan[i] - this.Voltage_threshold_2;
            this.Voltage_drain_minus_drain0[i] = this.Voltage_fixed_1 - this.Voltage_drain0;
            this.Voltage_drain_minus_drain0_real[i] = Math.min(this.Voltage_drain_minus_drain0[i], this.Voltage_gate_minus_threshold_2[i]);
        }
        // calulate V1,max & Q0,max
        for (i = 1; i < 200; i++) {
            this.a[i] = 1 + this.gamma31;
            this.b[i] = -2 * (this.gamma31 * this.Voltage_gate_minus_threshold_1[i] + this.Voltage_gate_minus_threshold_2[i]);
            this.c[i] = 2 * (this.Voltage_gate_minus_threshold_2[i] - this.Voltage_drain_minus_drain0_real[i] / 2)
                * (this.Voltage_drain_minus_drain0_real[i]);
            this.bb_4ac[i] = (this.b[i] * this.b[i] - 4 * this.a[i] * this.c[i]);
            if (this.bb_4ac[i] > 0) {
                this.Voltage_1[i] = Math.min((-this.b[i] - Math.pow(this.bb_4ac[i], 0.5)) / 2 / this.a[i],
                    this.Voltage_gate_minus_threshold_1[i], this.Voltage_gate_minus_threshold_2[i]);
            } else {
                this.Voltage_1[i] = Math.min(this.Voltage_gate_minus_threshold_1[i], this.Voltage_gate_minus_threshold_2[i]);
            }
        }
        // this.Voltage_1_max = Math.max.apply(null, this.Voltage_1);
        this.Voltage_1_max = Math.min(this.Voltage_fixed_1, this.Voltage_fixed_2) - 0.001;
        for (i = 1; i < 200; i++) {
            if (this.alpha >= 2) {
                this.temp[i] = (this.Voltage_gate_minus_threshold_1[i] - (this.Voltage_drain_minus_drain0_real[i] + this.Voltage_1[i]) / 2)
                    * (this.Voltage_drain_minus_drain0_real[i] - this.Voltage_1[i]) * this.WLCU2 / (Math.pow(this.Voltage_1[i], this.alpha) * this.SUDB);
                if (this.Q0_max >= this.temp[i] || i == 199) {
                    this.Q0_max = this.temp[i];
                }
            } else {
                this.temp[i] = (this.Voltage_fixed_2 - this.Voltage_1_max / 2)
                    * this.Voltage_1_max * this.WLCU1 / (Math.pow(this.Voltage_1_max, this.alpha) * this.SUDB);
                this.Q0_max = this.temp[i];
            }
        }
        if (this.Q0 >= this.Q0_max) {
            this.Q0 = this.Q0_max;
            this.gamma12 = this.Q0 * this.SUDB / this.WLCU1;
            this.gamma32 = this.Q0 * this.SUDB / this.WLCU2;
        }
        this.gamma_max = this.Q0_max * this.SUDB / this.WLCU1;
        // calulate V2
        for (i = 1; i < 200; i++) {
            this.Q[i] = this.Q0 * Math.pow(this.Voltage_gate_minus_threshold_1[i], this.Q0_power);
            this.gamma[i] = Math.min(this.gamma32 * Math.pow(this.Voltage_gate_minus_threshold_2[i] / this.Voltage_step, this.Q0_power), this.gamma_max);
        }
        for (i = 1; i < 200; i++) {
            // V2
            this.a[i] = this.gamma[i] * this.alpha * (this.alpha - 1) * Math.pow(this.Voltage_drain_minus_drain0_real[i], (this.alpha - 2)) - 1;
            this.b[i] = -2 * (this.Voltage_gate_minus_threshold_2[i] - this.Voltage_drain_minus_drain0_real[i]
                + this.alpha * this.gamma[i] * Math.pow(this.Voltage_drain_minus_drain0_real[i], (this.alpha - 1)));
            this.c[i] = 2 * this.gamma[i] * Math.pow(this.Voltage_drain_minus_drain0_real[i], (this.alpha));
            this.bb_4ac[i] = (this.b[i] * this.b[i] - 4 * this.a[i] * this.c[i]);
            if (this.bb_4ac[i] > 0) {
                this.Voltage_2[i] = Math.max(Math.min(this.Voltage_drain_minus_drain0_real[i] - (-this.b[i] - Math.pow(this.bb_4ac[i], 0.5)) / 2 / this.a[i],
                    this.Voltage_gate_minus_threshold_2[i], this.Voltage_drain_minus_drain0_real[i]), this.Voltage_1[i]);
            } else {
                this.Voltage_2[i] = Math.max(Math.min(this.Voltage_gate_minus_threshold_2[i], this.Voltage_drain_minus_drain0_real[i]), this.Voltage_1[i]);
            }

        }
        // calulate V1
        for (i = 1; i < 200; i++) {
            // V1
            this.a[i] = 1;
            this.b[i] = -2 * this.Voltage_gate_minus_threshold_1[i];
            this.c[i] = 1 / this.gamma31 * (2 * this.Voltage_gate_minus_threshold_2[i] - this.Voltage_drain_minus_drain0_real[i] - this.Voltage_2[i]) * (this.Voltage_drain_minus_drain0_real[i] - this.Voltage_2[i]);
            this.bb_4ac[i] = (this.b[i] * this.b[i] - 4 * this.a[i] * this.c[i]);
            if (this.bb_4ac[i] > 0) {
                this.Voltage_1[i] = Math.min((-this.b[i] - Math.pow(this.bb_4ac[i], 0.5)) / 2 / this.a[i],
                    this.Voltage_gate_minus_threshold_1[i], this.Voltage_gate_minus_threshold_2[i], this.Voltage_drain_minus_drain0_real[i], this.Voltage_1[i]);
            } else {
                this.Voltage_1[i] = Math.min(this.Voltage_gate_minus_threshold_1[i], this.Voltage_gate_minus_threshold_2[i], this.Voltage_drain_minus_drain0_real[i], this.Voltage_1[i]);
            }
        }

        // I_drain
        // case 
        for (i = 1; i < 200; i++) {
            this.I_drain_G1[i] = this.WLCU1 * (this.Voltage_gate_minus_threshold_1[i] - this.Voltage_1[i] / 2) * this.Voltage_1[i];
            this.I_drain_G2[i] = this.WLCU2 * this.L1_gated / this.L2_gated *
                (this.Voltage_gate_minus_threshold_2[i] - (this.Voltage_drain_minus_drain0_real[i]
                    + this.Voltage_2[i]) / 2) * (this.Voltage_drain_minus_drain0_real[i] - this.Voltage_2[i])
            if (this.I_drain_G1[i] < this.I_drain_G2[i]) {
                this.a[i] = 1;
                this.b[i] = -2 * this.Voltage_gate_minus_threshold_2[i];
                this.c[i] = (2 * this.Voltage_gate_minus_threshold_2[i] - this.Voltage_drain_minus_drain0_real[i]) * this.Voltage_drain_minus_drain0_real[i] - this.gamma31 *
                    (2 * this.Voltage_gate_minus_threshold_1[i] - this.Voltage_1[i]) * this.Voltage_1[i];
                this.bb_4ac[i] = (this.b[i] * this.b[i] - 4 * this.a[i] * this.c[i]);
                if (this.bb_4ac[i] > 0) {
                    this.Voltage_2[i] = Math.min((-this.b[i] - Math.pow(this.bb_4ac[i], 0.5)) / 2 / this.a[i],
                        this.Voltage_gate_minus_threshold_2[i], this.Voltage_drain_minus_drain0_real[i]);
                } else {
                    this.Voltage_2[i] = Math.min(this.Voltage_gate_minus_threshold_2[i], this.Voltage_drain_minus_drain0_real[i]);
                }
                this.I_drain_G1[i] = this.WLCU1 * (this.Voltage_gate_minus_threshold_1[i] - this.Voltage_1[i] / 2) * this.Voltage_1[i];
                this.I_drain_G2[i] = this.WLCU2 * this.L1_gated / this.L2_gated *
                    (this.Voltage_gate_minus_threshold_2[i] - (this.Voltage_drain_minus_drain0_real[i]
                        + this.Voltage_2[i]) / 2) * (this.Voltage_drain_minus_drain0_real[i] - this.Voltage_2[i])
            }
            this.I_drain[i] = Math.min(this.I_drain_G1[i], this.I_drain_G2[i]);
        }


        for (i = 1; i < 200; i++) {
            this.I_drain_tot[i] = this.Voltage_drain_minus_drain0_real[i] /
                (this.Voltage_drain_minus_drain0_real[i] / this.I_drain[i] * this.R_back_real /
                    (this.Voltage_drain_minus_drain0_real[i] / this.I_drain[i] + this.R_back_real));
            this.I_drain_regular[i] = this.WLCU1 * (this.Voltage_gate_minus_threshold_2[i] -
                Math.min(this.Voltage_gate_minus_threshold_2[i], this.Voltage_drain_minus_drain0_real[i]) / 2)
                * Math.min(this.Voltage_gate_minus_threshold_2[i], this.Voltage_drain_minus_drain0_real[i]) * this.lldl2;
        }
        // generate Vscan - Vscan point data
        this.data_Vscan = [];
        for (j = 0; j < 200; j++) {
            this.data_Vscan.push([this.Voltage_scan[j + 1], this.Voltage_scan[j + 1] - this.Voltage_threshold_2])
        }
    }
    this.data_I_tot = [];
    this.data_I_reg = [];
    this.data_Vd = [];
    this.data_V2 = [];
    this.data_V1 = [];
    this.data_V2_V1 = [];
    this.Voltage_2_1 = [];

    for (j = 0; j < 200; j++) {
        this.data_I_tot.push([this.Voltage_scan[j], this.I_drain_tot[j] * 1e6])
        this.data_I_reg.push([this.Voltage_scan[j], this.I_drain_regular[j] * 1e6])
        this.data_Vd.push([this.Voltage_scan[j + 1], this.Voltage_drain_minus_drain0[j + 1]])
        this.data_V2.push([this.Voltage_scan[j + 1], this.Voltage_2[j + 1]])
        this.data_V1.push([this.Voltage_scan[j + 1], this.Voltage_1[j + 1]])
        this.data_V2_V1.push([this.Voltage_scan[j + 1], this.Voltage_2[j + 1] - this.Voltage_1[j + 1]])
        this.Voltage_2_1.push(this.Voltage_2[j] - this.Voltage_1[j])
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
            symbolSize: 3,
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




