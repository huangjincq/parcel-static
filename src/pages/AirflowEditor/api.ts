import mockData from '../../mockData.json';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  getJson: (data) => {
    // in development mock data
    return sleep(100).then((res) => mockData);
  },
};
