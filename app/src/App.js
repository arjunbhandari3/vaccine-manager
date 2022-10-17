import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "assets/css/app.css";
import { AppRouter } from "Router";
import { store } from "./redux/store";
import { tokenInterceptorProvider } from "axios/interceptor";

const App = () => {
  tokenInterceptorProvider();

  return (
    <div className="container">
      <Provider store={store}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
