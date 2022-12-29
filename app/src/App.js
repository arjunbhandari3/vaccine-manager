import { BrowserRouter } from "react-router-dom";

import "assets/css/app.css";

import AppRouter from "Router";

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
};

export default App;
