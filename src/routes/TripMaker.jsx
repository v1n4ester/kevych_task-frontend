import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { Field, Formik } from "formik";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { makeTripThunk, setSuccess } from "../Redux/app-reducer";

function BasicTimePicker(props) {
  const [value, setValue] = React.useState(
    dayjs(props.timeStart || props.timeArrive)
  );
  const onChange = (time) => {
    setValue(time);
    props.formikChange(new Date(time));
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label={props.timeStart ? "Time Start" : "Time Arrive"}
        value={value}
        onChange={(newValue) => {
          onChange(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

const TripFormCover = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (props.success) {
      navigate("/");
      props.setSuccess(false);
    }
  }, [props.success]);
  return (
    <div className="trip__form">
      <h1 className="trip__form-title">Trip information</h1>
      <TripForm />
    </div>
  );
};

const TripForm = (props) => {
  const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    fromCity: yup.string().required("required").typeError("should be a string"),
    toCity: yup.string().required("required").typeError("should be a string"),
    ticketCost: yup
      .number()
      .required("required")
      .typeError("should be a number"),
  });
  return (
    <Formik
      initialValues={{
        fromCity: "",
        toCity: "",
        timeStart:
          "Mon Jan 01 2022 02:00:00 GMT+0200 (за східноєвропейським стандартним часом)",
        timeArrive:
          "Mon Jan 01 2022 04:00:00 GMT+0200 (за східноєвропейським стандартним часом)",
        ticketCost: 0,
      }}
      validateOnBlur
      onSubmit={(values) => {
        dispatch(makeTripThunk(values));
      }}
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
          <div className="trip__form-container">
            <p className="trip__input-container">
              <Field
                type="text"
                className="form-input"
                name={"fromCity"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fromCity}
              />
              {formik.touched.fromCity && formik.errors.fromCity && (
                <span className="trip__form-error">
                  {formik.errors.fromCity}
                </span>
              )}
              <span className="trip__form-placeholder">City Start</span>
            </p>
            <p className="trip__input-container">
              <Field
                type="text"
                className="form-input"
                name={"toCity"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.toCity}
              />
              {formik.touched.toCity && formik.errors.toCity && (
                <span className="trip__form-error">{formik.errors.toCity}</span>
              )}
              <span className="trip__form-placeholder">City Arrive</span>
            </p>
            <p className="trip__input-container">
              <Field
                type={"text"}
                className="form-input"
                name={"ticketCost"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ticketCost}
              />
              {formik.touched.ticketCost && formik.errors.ticketCost && (
                <span className="trip__form-error">
                  {formik.errors.ticketCost}
                </span>
              )}
              <span className="trip__form-placeholder">Ticket Cost</span>
            </p>
            <div className="trip__form_time-continer">
              <BasicTimePicker
                timeStart={formik.values.timeStart}
                formikChange={(value) => (formik.values.timeStart = value)}
              />
              <BasicTimePicker
                timeArrive={formik.values.timeArrive}
                formikChange={(value) => (formik.values.timeArrive = value)}
              />
            </div>
            <div className="form__button-container">
              <Field
                type="button"
                className="trip__form-button"
                disabled={!formik.isValid}
                onClick={formik.handleSubmit}
                value="Make"
              />
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = (state) => ({
  trips: state.app.trips,
  loading: state.app.loading,
  success: state.app.success,
});

export default connect(mapStateToProps, { setSuccess })(TripFormCover);
