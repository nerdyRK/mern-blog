import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Navbar />
        <Outlet />
      </div>
    </Provider>
  );
};
export default App;
