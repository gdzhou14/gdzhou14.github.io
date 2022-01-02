function dataExport(data) {
    var aoa_param = [];
    var aoa_data = [];
    //param
    aoa_param.push(['W_nongated',data.W_nongated]);
    aoa_param.push(['d_nongated',data.d_nongated]);
    aoa_param.push(['d_nongated2',data.d_nongated2]);
    aoa_param.push(['tsc_nongated',data.tsc_nongated]);
    aoa_param.push(['μ_nongated1',data.mu_nongated]);
    aoa_param.push(['μ_nongated3',data.mu_nongated2]);
    aoa_param.push(['εsc',data.esc_nongated]);
    aoa_param.push(['Vd0',data.Voltage_drain0]);

    //
    aoa_param.push(['W_gated',data.W_gated]);
    aoa_param.push(['L_gated',data.L_gated]);
    aoa_param.push(['tox_gated',data.tox_gated]);
    aoa_param.push(['μ_gated',data.mu_gated]);
    aoa_param.push(['εox',data.eox_gated]);
    aoa_param.push(['Vth',data.Voltage_threshold]);
    aoa_param.push(['Rback',data.R_back_real]);
    //
    if(data.Voltage_scanType){
        aoa_param.push(['scanType','Vd']);
    }else{
        aoa_param.push(['scanType','Vg']);
    }
    aoa_param.push(['fixed V',data.Voltage_fixed]);
    aoa_param.push(['scanRange',data.Voltage_scanRange]);
    aoa_param.push(['α',data.alpha]);
    aoa_param.push(['Q0',data.Q0]);
    aoa_param.push(['Q03/Q01',data.Q0_rate]);

    //
    // data
    aoa_data.push(['V_scan', 'Id', 'V2', 'V1']);
    for (i = 0; i < data.Voltage_scan.length; i++) {
        aoa_data.push([data.Voltage_scan[i], data.I_drain_tot[i]
            , data.Voltage_2[i], data.Voltage_1[i]]);
    }

    //
    var workSheet1 = XLSX.utils.aoa_to_sheet(aoa_param);
    var workSheet2 = XLSX.utils.aoa_to_sheet(aoa_data);

    var workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet1, "param");
    XLSX.utils.book_append_sheet(workBook, workSheet2, "data");

    // var workBookOut = XLSX.write(workBook, workBookOutOption);
    XLSX.writeFile(workBook, 'dataExport.xlsx');
};

