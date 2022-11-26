import axios from 'axios'


export const getTrips = (query) =>{
    if(query){
        return axios.get(`http://localhost:4000/api/trips?sorting=${query}`)
    }
    return axios.get('http://localhost:4000/api/trips')
}

export const updateTrip = (id, trip) =>{
    return axios.put(`http://localhost:4000/api/trip/${id}`, trip)
}

export const makeTrip = (trip) =>{
    return axios.post(`http://localhost:4000/api/trip`, trip)
}

export const deleteTrip = (id) =>{
    return axios.delete(`http://localhost:4000/api/trip/${id}`)
}

export const searchTrip = (text) =>{
    return axios.post(`http://localhost:4000/api/search`, {text: text})
}