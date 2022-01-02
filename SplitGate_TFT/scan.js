function scanloop(V_fix, Vmax, Vgtype) {
    let Vscan = [];
    let data = [];
    if (Vgtype == 0) { //Vd
        document.getElementById('param_scanType').value = "0";
    } else {
        if (Vgtype == 1) { //Vg1
            document.getElementById('param_scanType').value = "1";
        } else if (Vgtype == 2) { //Vg2
            document.getElementById('param_scanType').value = "2";
        }

        document.getElementById('param_fixed1').value = V_fix;
        document.getElementById('param_fixed2').value = "0";
    }
    document.getElementById('param_scanRange').value = Vmax;

    let Id = [];
    let V1 = [];
    let V2 = [];
    let V2_V1 = [];
    let Vg = [];
    for (let i = 0; i < 200; i++) {
        Vscan[i] = Vmax * (i + 1) / 200;
        document.getElementById('param_fixed2').value = Vscan[i];
        data[i] = new scanning();
        Vg[i] = data[i].Voltage_scan;
        Id[i] = data[i].I_drain_tot;
        V1[i] = data[i].Voltage_1;
        V2[i] = data[i].Voltage_2;
        V2_V1[i] = data[i].Voltage_2_1;
    }
    let aoa_data_Id = [];
    let aoa_data_V1 = [];
    let aoa_data_V2 = [];
    let aoa_data_V2_V1 = [];
    let Headerrow = [];
    if(Vgtype == 0){
        Headerrow[0] = 'Vd' + '\\' + 'Vg2';
    }else{
        Headerrow[0] = 'Vg' + Vgtype + '\\' + (3 - Vgtype);
    }
    for (let j = 0; j < 200; j++) {
        Headerrow.push(Vscan[j]);
    }
    aoa_data_Id.push(Headerrow);
    aoa_data_V1.push(Headerrow);
    aoa_data_V2.push(Headerrow);
    aoa_data_V2_V1.push(Headerrow);
    for (let i = 0; i < data[0].Voltage_scan.length; i++) {
        //row
        let row1 = [];
        let row2 = [];
        let row3 = [];
        let row4 = [];
        row1.push(Vg[0][i]);
        row2.push(Vg[0][i]);
        row3.push(Vg[0][i]);
        row4.push(Vg[0][i]);
        for (let j = 0; j < 200; j++) {
            //column
            row1.push(Id[j][i]);
            row2.push(V1[j][i]);
            row3.push(V2[j][i]);
            row4.push(V2_V1[j][i]);
        }
        aoa_data_Id.push(row1);
        aoa_data_V1.push(row2);
        aoa_data_V2.push(row3);
        aoa_data_V2_V1.push(row4);
    }
    let workSheet1 = XLSX.utils.aoa_to_sheet(aoa_data_Id);
    let workSheet2 = XLSX.utils.aoa_to_sheet(aoa_data_V1);
    let workSheet3 = XLSX.utils.aoa_to_sheet(aoa_data_V2);
    let workSheet4 = XLSX.utils.aoa_to_sheet(aoa_data_V2_V1);
    let workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet1, "Id");
    XLSX.utils.book_append_sheet(workBook, workSheet2, "V1");
    XLSX.utils.book_append_sheet(workBook, workSheet3, "V2");
    XLSX.utils.book_append_sheet(workBook, workSheet4, "V2-V1");
    XLSX.writeFile(workBook, 'scanVmax_' + Vmax + '_Vfix_' + V_fix + '.xlsx');
    //return aoa_data_Id;
}

