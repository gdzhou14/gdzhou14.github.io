function dataExport(data) {
    var aoa_param = [];
    var aoa_data = [];
    //param
    aoa_param.push(['W_nongated',data.W_nongated]);
    aoa_param.push(['d_nongated',data.d_nongated]);
    aoa_param.push(['tsc_nongated',data.tsc_nongated]);
    aoa_param.push(['μ_nongated',data.mu_nongated]);
    aoa_param.push(['εsc',data.esc_nongated]);
    aoa_param.push(['Vd0',data.Voltage_drain0]);
    aoa_param.push(['n0',data.n0]);
    //
    aoa_param.push(['W_gated',data.W_gated]);
    aoa_param.push(['L1_gated',data.L1_gated]);
    aoa_param.push(['L2_gated',data.L2_gated]);
    aoa_param.push(['tox_gated',data.tox_gated]);
    aoa_param.push(['εox',data.eox_gated]);
    aoa_param.push(['Vth1',data.Voltage_threshold_1]);
    aoa_param.push(['Vth2',data.Voltage_threshold_2]);
    aoa_param.push(['Rback',data.R_back_real]);
    //
    if(data.Voltage_scanType == 0){
        aoa_param.push(['scanType','Vd']);
    }else if(data.Voltage_scanType == 1){
        aoa_param.push(['scanType','Vg1']);
    }else if(data.Voltage_scanType == 2){
        aoa_param.push(['scanType','Vg2']);
    }
    aoa_param.push(['fixed Vg1 or Vd',data.Voltage_fixed_1]);
    aoa_param.push(['fixed Vg2 or Vg1',data.Voltage_fixed_2]);
    aoa_param.push(['scanRange',data.Voltage_scanRange]);
    aoa_param.push(['α',data.alpha]);
    aoa_param.push(['Q00',data.Q00]);
    aoa_param.push(['Q0-power',data.Q0_power]);


    // data
    aoa_data.push(['V_scan', 'Id', 'Id_regular', 'V2', 'V1']);
    for (i = 0; i < data.Voltage_scan.length; i++) {
        aoa_data.push([data.Voltage_scan[i], data.I_drain_tot[i], data.I_drain_regular[i]
            , data.Voltage_2[i], data.Voltage_1[i]]);
    }

    //
    var workSheet1 = XLSX.utils.aoa_to_sheet(aoa_param);
    var workSheet2 = XLSX.utils.aoa_to_sheet(aoa_data);

    var workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet1, "param");
    XLSX.utils.book_append_sheet(workBook, workSheet2, "data");

    XLSX.writeFile(workBook, 'dataExport.xlsx');
};

