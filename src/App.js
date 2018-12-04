import React from "react";
import { Provider } from "react-redux";

import store from "./store";

// components
import Layout from "./components/Layout/Layout";

export default () => (
  <Provider store={store}>
    <Layout />
  </Provider>
);
