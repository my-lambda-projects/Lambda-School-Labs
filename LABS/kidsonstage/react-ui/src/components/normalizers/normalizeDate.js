import moment from 'moment';

const normalizeDate = (value) => {
  if (!value) {
    return value;
  }
  // console.log(`normalizeDate value: ${value} value type ${typeof value} `);
  return moment(value).format('MMMM Do YYYY h:mm A');
};
export default normalizeDate;
