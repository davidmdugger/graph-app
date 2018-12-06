import {
  GET_PRICES,
  DISPLAY_PRICE,
  DISPLAY_GRAPH_TYPE,
  GRAPH_LOADING
} from "../actions/types";

const initialState = {
  prices: [],
  isLoading: false,
  date: "",
  price: "",
  type: "bar"
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GRAPH_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case GET_PRICES:
      return {
        ...state,
        isLoading: false,
        prices: payload
      };
    case DISPLAY_PRICE:
      return {
        ...state,
        isLoading: false,
        price: payload.price,
        date: payload.date
      };
    case DISPLAY_GRAPH_TYPE:
      return {
        ...state,
        isLoading: false,
        type: payload
      };
    default:
      return state;
  }
};
