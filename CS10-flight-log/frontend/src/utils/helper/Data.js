const types = ['MES', 'MEL', 'SEL', 'SES'];

const color = {
  1: '#BBDEFB',
  2: '#90CAF9',
  3: '#64B5F6',
  4: '#42A5F5',
  5: '#2196F3',
  6: '#1E88E5',
  7: '#1976D2',
  8: '#1565C0',
  9: '#0D47A1',
};

const hoverColor = {
  1: '#B3E5FC',
  2: '#81D4FA',
  3: '#4FC3F7',
  4: '#29B6F6',
  5: '#03A9F4',
  6: '#039BE5',
  7: '#0288D1',
  8: '#0277BD',
  9: '#01579B',
};

const data2 = {
  labels: types,
  datasets: [
    {
      label: 'PIC',
      data: [5, 2, 1, 7],
      backgroundColor: color[1],
      hoverBackgroundColor: hoverColor[1],
      hoverBorderWidth: 0,
    },
    {
      label: 'Dual Rec',
      data: [3, 6, 0, 5],
      backgroundColor: color[2],
      hoverBackgroundColor: hoverColor[2],
      hoverBorderWidth: 0,
    },
    {
      label: 'Sim Instr',
      data: [2, 5, 2, 8],
      backgroundColor: color[3],
      hoverBackgroundColor: hoverColor[3],
      hoverBorderWidth: 2,
    },
    {
      label: 'Actual Instr',
      data: [9, 1, 2, 5],
      backgroundColor: color[4],
      hoverBackgroundColor: hoverColor[4],
      hoverBorderWidth: 2,
    },
    {
      label: 'Day',
      data: [2, 3, 1, 2],
      backgroundColor: color[5],
      hoverBackgroundColor: hoverColor[5],
      hoverBorderWidth: 2,
    },
    {
      label: 'Night',
      data: [4, 2, 1, 3],
      backgroundColor: color[6],
      hoverBackgroundColor: hoverColor[6],
      hoverBorderWidth: 2,
    },
    {
      label: 'Cross Country',
      data: [3, 2, 1, 6],
      backgroundColor: color[7],
      hoverBackgroundColor: hoverColor[7],
      hoverBorderWidth: 2,
      hidden: true,
    },
    {
      label: 'No Instrument App',
      data: [1, 4, 2, 0],
      backgroundColor: color[8],
      hoverBackgroundColor: hoverColor[8],
      hoverBorderWidth: 2,
      hidden: true,
    },
    {
      label: 'No Ldg',
      data: [5, 2, 1, 3],
      backgroundColor: color[9],
      hoverBackgroundColor: hoverColor[9],
      hoverBorderWidth: 2,
      hidden: true,
    },
  ],
  tooltips: {
    mode: 'index',
    backgroundColor: 'rgba(255,255,255)',
    borderColor: 'rgb(0, 0, 0)',
    borderWidth: 0.3,
    cornerRadius: 0,
    caretSize: 0,
    xPadding: 70,
    yPadding: 25,
    titleFontColor: 'rgba(0, 0, 0, 0.87)',
    titleFontSize: 10,
    titleFontFamily: 'Roboto',
    bodyFontFamily: 'Roboto',
  },
};

function makeData(
  pic,
  dual_rec,
  sim_instr,
  actual_instr,
  day,
  night,
  cross_country,
  no_instument_app,
  no_ldg,
) {
  const data = {
    labels: types,
    datasets: [
      {
        label: 'PIC',
        data: pic,
        backgroundColor: color[1],
        hoverBackgroundColor: hoverColor[1],
        hoverBorderWidth: 0,
      },
      {
        label: 'Dual Rec',
        data: dual_rec,
        backgroundColor: color[2],
        hoverBackgroundColor: hoverColor[2],
        hoverBorderWidth: 0,
      },
      {
        label: 'Sim Instr',
        data: sim_instr,
        backgroundColor: color[3],
        hoverBackgroundColor: hoverColor[3],
        hoverBorderWidth: 2,
      },
      {
        label: 'Actual Instr',
        data: actual_instr,
        backgroundColor: color[4],
        hoverBackgroundColor: hoverColor[4],
        hoverBorderWidth: 2,
      },
      {
        label: 'Day',
        data: day,
        backgroundColor: color[5],
        hoverBackgroundColor: hoverColor[5],
        hoverBorderWidth: 2,
      },
      {
        label: 'Night',
        data: night,
        backgroundColor: color[6],
        hoverBackgroundColor: hoverColor[6],
        hoverBorderWidth: 2,
      },
      {
        label: 'Cross Country',
        data: cross_country,
        backgroundColor: color[7],
        hoverBackgroundColor: hoverColor[7],
        hoverBorderWidth: 2,
        hidden: true,
      },
      {
        label: 'No Instrument App',
        data: no_instument_app,
        backgroundColor: color[8],
        hoverBackgroundColor: hoverColor[8],
        hoverBorderWidth: 2,
        hidden: true,
      },
      {
        label: 'No Ldg',
        data: no_ldg,
        backgroundColor: color[9],
        hoverBackgroundColor: hoverColor[9],
        hoverBorderWidth: 2,
        hidden: true,
      },
    ],
    tooltips: {
      mode: 'index',
      backgroundColor: 'rgba(255,255,255)',
      borderColor: 'rgb(0, 0, 0)',
      borderWidth: 0.3,
      cornerRadius: 0,
      caretSize: 0,
      xPadding: 70,
      yPadding: 25,
      titleFontColor: 'rgba(0, 0, 0, 0.87)',
      titleFontSize: 10,
      titleFontFamily: 'Roboto',
      bodyFontFamily: 'Roboto',
    },
  };
  return data;
}

const options = {
  scales: {
    xAxes: [
      {
        stacked: true,
        gridLines: { display: false },
      },
    ],
    yAxes: [
      {
        stacked: true,
        gridLines: { display: false },
      },
    ],
  },
  layout: {
    padding: {
      left: 20,
      right: 20,
      top: 0,
      bottom: 0,
    },
  },
  tooltips: {
    mode: 'nearest',
  },
  maintainAspectRatio: true,
  responsive: {
    'height < 428px': {
      legend: {
        display: false,
      },
    },
  },
};

export {
  types, color, hoverColor, data2, makeData, options,
};
