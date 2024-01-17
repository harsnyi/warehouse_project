import config from '../Config';
import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useLocation} from "react-router-dom"
import OccupierCardSimple from '../Card/OccupierCardSimple';

function AddOccupierDebt(){
    
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [turningDay, setTurningDay] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Átutalás");
    const [debt, setDebt] = useState("");
    const [refreshed, setRefreshed] = useState("")
    const [response,setResponse] = useState("");
    const [showButton, setShowButton] = useState(true);
    const [booked, setBooked] = useState(0);

    let location = useLocation();
    
    useEffect(() => {
        axios.get(`http://${config.ip_address.server_address}:${config.port}/getOccupier/${location.state.occupierId}`)
        .then(response => {

            setName(response.data.occupier_name);
            setAddress(response.data.address);
            setPhoneNumber(response.data.phone_number);
            setTurningDay(response.data.turning_day);
            setPaymentMethod(response.data.payment_method ? "Átutalás" : "Készpénz")
            setDebt(response.data.debt);
            setRefreshed(response.data.refreshed)
        });
    },[]);

    const handleSubmit = (event) => {
        
        event.preventDefault();
        axios.put(`http://${config.ip_address.server_address}:${config.port}/updateOccupierDebt/${location.state.occupierId}`, {
            booked:booked
            
        })

        .then(function () {
            setResponse("Tartozás sikeresen hozzáadva!");
            setShowButton(false);
        })
        .catch(function () {
            setResponse("Sikertelen hozzáadás!")
        });

        setName("");
        setAddress("");
        setPhoneNumber("");
        setTurningDay("");
        setPaymentMethod("");
        setDebt("");
    }
    
    return (

        <div className="col-lg-8" id="content-holder">
            <div id="main-content">
                <div className='row'>
            <div className="col-sm-12">
                <form  id="addForm" onSubmit={handleSubmit}>
                    
                    <label>Tartozás hozzáadása:
                        <input 
                            type="number" 
                            value={booked}
                            onChange={(e) => setBooked(e.target.value)}
                        />
                    </label>


                    <label>Szeretnéd hozzáadni az összeget?</label>
                    {showButton &&  <input type="submit" id="send" value="Összeg hozzáadása" />}

                    <div id="eredmenyDiv">{response}</div>
                </form>

                
                </div>
            </div>
                <div className="col-sm-6">
                    <div className="card" id="content-box">
                                    <div className="card-body">
                                    <h5 className="card-title">{name}</h5>
                                            <h6 className="card-subtitle mb-2">Jelenlegi tartozás: {debt} Ft</h6>
                                        <h6>Telefonszám: { phoneNumber }</h6>
                                        <h6>Elérhetőség: { address }</h6>
                                        <h6>Forduló nap: { turningDay }</h6>
                                    </div>
                                </div>
                                </div>
                                </div>
        </div>
        
    )
}

export default AddOccupierDebt;