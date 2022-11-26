import { NavLink } from 'react-router-dom'
import train from '../assets/icons8-high-speed-train-50.png'

const Header = (props) => {
    return (
        <div className="header">
            <div className="header-container">
                <NavLink to="/" className="header-logo"><img src={train} /></NavLink>
                <p className="header-text">Train Schedule</p>
            </div>
        </div>
    )
}

export default Header