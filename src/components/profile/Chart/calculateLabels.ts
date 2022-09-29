import moment from 'moment';

export const calculateLabels = (type: string) => {
  const now = moment().format('YYYY-MM-DD');
  const labels = [];
  if (type === 'Month') {
    for (let i = 11; i >= 0; i -= 1) {
      const month = moment(now).subtract(i, 'months').format('YYYY년 M월');
      if (month.split(' ')[1] === '1월') {
        labels.push(month.split(' ')[0]);
      } else {
        labels.push(month.split(' ')[1]);
      }
    }
  } else if (type === 'Week') {
    for (let i = 48; i > 0; i -= 7) {
      const last = moment(now)
        .subtract(i + 6, 'days')
        .format('M월 D일');
      labels.push(moment(now).subtract(i, 'days').format(`${last} ~ M월 D일`));
    }
  } else {
    for (let i = 29; i >= 0; i -= 1) {
      labels.push(moment(moment(now).subtract(i, 'days')).format('M월 D일'));
    }
  }
  return labels;
};
