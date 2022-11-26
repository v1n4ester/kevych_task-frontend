import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { getAllTrips } from "./Redux/app-reducer";
import Main from "./routes/Main";
import TripEdit from "./routes/TripEdit";
import TripMaker from "./routes/TripMaker";

function App() {
  const { loading } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTrips());
  }, []);
  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element=<Main /> />
        <Route path="/trip/:id" element=<TripEdit /> />
        <Route path="/make-trip" element=<TripMaker /> />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
