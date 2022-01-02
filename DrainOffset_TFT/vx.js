function chartInput3() {
    vx1 = new V_x(data1, 60);
    vx2 = new V_x(data1, 120);

    option3.series[0].data = vx1.data_Vx;
    option3.series[1].data = vx2.data_Vx;

    // option3.legend[0].data.push('V-x3');
    // option3.series.push(
    //     {
    //         name: 'V-x3',
    //         type: 'line',
    //         showSymbol: false,
    //         clip: true,
    //         symbolSize: 3,
    //         data: vx3.data_Vx
    //     },
    // );
    Chart3.setOption(option3);
    vxDisplay(vx1,'1');
    vxDisplay(vx2,'2');

}
function vxDisplay(data,id){
    document.getElementById('param_vd'+id).value = data.Voltage_drain.toFixed(2);
    document.getElementById('param_vg'+id).value = data.Voltage_gate.toFixed(2);
    document.getElementById('param_v1'+id).value = data.Voltage_1.toFixed(2);
}