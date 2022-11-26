import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { removeTrip } from "../Redux/app-reducer"

const Trip = ({el}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleEditClickButton = () => {
        navigate(`trip/${el._id}`)
    }

    const handleDeleteClickButton = () => {
        dispatch(removeTrip(el._id))
    }

    const dateConverter = (date) =>{
        const res = new Date(date)
        const words = res.toString().split(' ')
        const result = words[4]
        return result.slice(0,5)

    }

    return (
        <div className="trip">
            <div className="trip-container">
                <p className="trip-name">{el.fromCity}-{el.toCity}</p>
                <p className="trip-cost">The price of the ticket - {el.ticketCost} Uah</p>
                <p className="trip-date">{dateConverter(el.timeStart)}-{dateConverter(el.timeArrive)}</p>
                <div className="buttons-container">
                    <button className="trip-button edit-button" onClick={handleEditClickButton}>Edit</button>
                    <button className="trip-button delete-button" onClick={handleDeleteClickButton}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Trip