import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRouter } from "./AppRouter";
import { store } from "../store/store";

export const AppProviders = () => (
  <Provider store={store}>
    <Router>
      <AppRouter />
    </Router>
  </Provider>
);
