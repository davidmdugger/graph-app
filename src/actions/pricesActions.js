import { GET_PRICES } from "./types";

export const getPrices = () => dispatch => {
  fetch("https://api.coindesk.com/v1/bpi/historical/close.json")
    .then(res => res.json())
    .then(
      dispatch({
        type: GET_PRICES,
        payload: prices.bpi
      })
    )
    .catch(err => console.log(err));
};
