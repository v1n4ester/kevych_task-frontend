import { connect } from "react-redux";
import Navbar from "../Components/NavBar";
import Trip from "../Components/Trip";
import { getAllTrips } from "../Redux/app-reducer.js";

const Main = (props) => {
  const tripComponents = props.trips.map((el) => {
    return <Trip key={el._id} el={el} />;
  });
  return (
    <div className="main">
      <Navbar getAllTrips={props.getAllTrips} />
      {tripComponents}
    </div>
  );
};
const mapStateToProps = (state) => ({
  trips: state.app.trips,
});

export default connect(mapStateToProps, { getAllTrips })(Main);
