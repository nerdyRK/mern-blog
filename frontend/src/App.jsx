import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store from "./store/store";
import SearchBar from "./components/Searchbar";

const App = () => {
  const location = useLocation();
  const showSearchBar = !location.pathname.startsWith("/dashboard");

  return (
    <Provider store={store}>
      <div>
        <Navbar />
        {showSearchBar && <SearchBar />}
        <Outlet />
      </div>
    </Provider>
  );
};
export default App;
