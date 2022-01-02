function dataExport(data) {
    var aoa_param = [];
    var aoa_data = [];
    //param
    aoa_param.push(['W_gated',data.W_gated]);
    aoa_param.push(['L_gated',data.L_gated]);
    aoa_param.push(['tox_gated',data.tox_gated]);
    aoa_param.push(['εox',data.eox_gated]);
    aoa_param.push(['Vth',data.Voltage_threshold]);
    aoa_param.push(['Vd0',data.Voltage_drain0]);
    //
    if(data.Voltage_scanType){
        aoa_param.push(['scanType','Vd']);
    }else{
        aoa_param.push(['scanType','Vg']);
    }
    aoa_param.push(['fixed V',data.Voltage_fixed]);
    aoa_param.push(['scanRange',data.Voltage_scanRange]);
    // data
    aoa_data.push(['V_scan','Id_reg']);
    for (i = 0; i < data.Voltage_scan.length; i++) {
        aoa_data.push([data.Voltage_scan[i], data.I_drain_regular[i]]);
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

