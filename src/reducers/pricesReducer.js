import { GET_PRICES } from "../actions/types";

const initialState = {
  prices: [],
  isLoading: false
};

export default (state = initialState, { type }) => {
  switch (type) {
    case GET_PRICES:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
};
