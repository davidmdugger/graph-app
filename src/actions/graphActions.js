import {
  GET_PRICES,
  DISPLAY_PRICE,
  DISPLAY_GRAPH_TYPE,
  GRAPH_LOADING
} from "./types";
import moment from "moment";

export const getBitcoinData = () => dispatch => {
  dispatch(isLoading());
  fetch("https://api.coindesk.com/v1/bpi/historical/close.json")
    .then(res => res.json())
    .then(bitcoinData => {
      const sortedData = [];
      let count = 0;
      for (let date in bitcoinData.bpi) {
        sortedData.push({
          date: moment(date).format("MMMM DD, YYYY"),
          price: bitcoinData.bpi[date].toLocaleString("us-EN", {
            style: "currency",
            currency: "USD"
          }),
          x: count,
          y: (bitcoinData.bpi[date] / 100).toFixed(2)
        });
        count++;
      }
      dispatch({
        type: GET_PRICES,
        payload: sortedData
      });
    })
    .catch(err => console.log(err));
};

export const displaySelectedPrice = (price, date) => dispatch => {
  dispatch({
    type: DISPLAY_PRICE,
    payload: {
      price,
      date
    }
  });
};

export const showGraphType = type => dispatch => {
  dispatch({
    type: DISPLAY_GRAPH_TYPE,
    payload: type
  });
};

export const isLoading = () => {
  return {
    type: GRAPH_LOADING
  };
};
