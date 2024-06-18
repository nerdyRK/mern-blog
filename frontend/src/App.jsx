import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store from "./store/store";
import SearchBar from "./components/Searchbar";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Navbar />
        <SearchBar />
        <Outlet />
      </div>
    </Provider>
  );
};
export default App;
