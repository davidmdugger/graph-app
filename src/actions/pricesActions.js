import { GET_PRICES } from './types';

export const getPrices => dispatch => {
  dispatch(isLoading());

  axios
    .get("https://api.coindesk.com/v1/bpi/historical/close.json")
    .then(res =>
      dispatch({
        type: GET_PRICES,
        payload: res.data
      })  
    )
    .catch(err => console.log(err);
}