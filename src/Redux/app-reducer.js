import { deleteTrip, getTrips, makeTrip, searchTrip, updateTrip } from "../API/api";

const initialState = {
  trips: [
    {
      fromCity: "Buchach",
      toCity: "Kuiv",
      timeStart: "10:45",
      timeArrive: "11:50",
      ticketCost: 200,
      _id: "kslgnkjsj",
    },
    {
      fromCity: "Buchach",
      toCity: "Kuiv",
      timeStart: "10:45",
      timeArrive: "11:50",
      ticketCost: 200,
      _id: "sfjjsdjs",
    },
    {
      fromCity: "Buchach",
      toCity: "Kuiv",
      timeStart: "10:45",
      timeArrive: "11:50",
      ticketCost: 200,
      _id: "shfhshs",
    },
  ],
  loading: true,
  success: false,
};

const MAKE_TRIP = "MAKE_TRIP";
const GET_TRIPS = "GET_TRIPS";
const REMOVE_TRIP = "REMOVE_TRIP";
const SET_LOADING = "SET_LOADING";
const SEARCH_TRIP = "SEARCH_TRIP";
const SET_SUCCESS = 'SET_SUCCESS'

export const appRreducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRIPS: {
      return {
        ...state,
        trips: [...action.trips],
      };
    }
    case MAKE_TRIP: {
      return {
        ...state,
        trips: [...state.trips, ...action.trip],
      };
    }
    case REMOVE_TRIP: {
      return {
        ...state,
        trips: [...action.trips],
      };
    }
    case SET_LOADING: {
      return {
        ...state,
        loading: action.loading,
      };
    }
    case SEARCH_TRIP: {
      return {
        ...state,
        trips: [...action.trips],
      };
    }
    case SET_SUCCESS: {
      return {
        ...state,
        success: action.success
      }
    }
    default: {
      return state;
    }
  }
};

export const setSuccess = (success) => ({type: SET_SUCCESS, success})
const getAllTripsAC = (trips) => ({ type: GET_TRIPS, trips });
const removeTripAC = (trips) => ({ type: REMOVE_TRIP, trips });
const searchTripAC = (trips) => ({ type: SEARCH_TRIP, trips });
const setLoadingAC = (loading) => ({ type: SET_LOADING, loading });

export const getAllTrips =
  (query = null) =>
  async (dispatch) => {
    try {
      dispatch(setLoadingAC(true));
      const trips = await getTrips(query);
      dispatch(getAllTripsAC(trips.data));
      dispatch(setLoadingAC(false));
    } catch (e) {
      console.log(e);
    }
  };

export const removeTrip = (id) => async (dispatch, getState) => {
  try {
    dispatch(setLoadingAC(true));
    const result = await deleteTrip(id);
    if (result.success) {
      const trips = getState().app.trips.filter((el) => el._id !== id);
      dispatch(removeTripAC(trips));
    }
    dispatch(setLoadingAC(false));
  } catch (e) {
    console.log(e);
  }
};

export const findTrip = (text) => async (dispatch) => {
  try {
    dispatch(setLoadingAC(true));
    const trip = await searchTrip(text);
    dispatch(searchTripAC(trip.data));
    dispatch(setLoadingAC(false));
  } catch (e) {
    console.log(e);
  }
};

export const updateTripThunk = (id, trip) => async (dispatch, useState) => {
  try {
    dispatch(setLoadingAC(true));
    const result = await updateTrip(id, trip);
    if(result.data.success){
      dispatch(setSuccess(true))
      dispatch(getAllTrips())
    }
    dispatch(setLoadingAC(false));
  } catch (e) {
    console.log(e);
  }
};

export const makeTripThunk = (trip) => async (dispatch, useState) => {
  try {
    dispatch(setLoadingAC(true));
    const result = await makeTrip( trip);
    if(result.data.success){
      dispatch(setSuccess(true))
      dispatch(getAllTrips())
    }
    dispatch(setLoadingAC(false));
  } catch (e) {
    console.log(e);
  }
};