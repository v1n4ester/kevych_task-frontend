import { useState } from "react"
import { useDispatch } from "react-redux"
import { findTrip } from "../Redux/app-reducer"
import Selector from "./Selector"
import { NavLink } from 'react-router-dom'

const Navbar = (props) => {
    const dispatch = useDispatch()
    const [inputText, setInputText] = useState('')
    const onClick = (text) => {
        const query = text.toLowerCase()
        props.getAllTrips(query)
    }
    const onTextChange = (e) => {
        const text = e.target.value;
        setInputText(text)
    }

    const onSubmit = (evt) => {
        if (evt.key === 'Enter') {
            dispatch(findTrip(inputText))
        }
    }

    const makeTripHandler = () =>{

    }
    return (
        <div className="navbar">
            <input className='main__input' type="text" onKeyPress={onSubmit} onChange={onTextChange} placeholder={'Search trip by name'} />
            <NavLink className="navbar-button" to="/make-trip">Make Trip</NavLink>
            <Selector onClick={onClick}/>
        </div>
    )
}

export default Navbar