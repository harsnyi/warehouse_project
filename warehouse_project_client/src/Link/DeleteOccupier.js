import config from '../Config';
import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useLocation} from "react-router-dom";
import OccupierCardSimple from '../Card/OccupierCardSimple';

function DeleteOccupier(){
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [turningDay, setTurningDay] = useState("");
    const [debt, setDebt] = useState("");
    const [response,setResponse] = useState("");
    const [showButton, setShowButton] = useState(true);

    let location = useLocation();
    
    useEffect(() => {
        axios.get(`http://${config.ip_address.server_address}:${config.port}/getOccupier/${location.state.occupierId}`)
        .then(response => {
            setName(response.data.occupier_name);
            setAddress(response.data.address);
            setPhoneNumber(response.data.phone_number);
            setTurningDay(response.data.turning_day);
            setDebt(response.data.debt);
        });
    },[]);

    const handleSubmit = (event) => {
        
        event.preventDefault();
        axios.delete(`http://${config.ip_address.server_address}:${config.port}/deleteOccupier/${location.state.occupierId}`, {
        })
        .then(function () {
            setResponse("Bérlő sikeresen törölve!");
            setShowButton(false);
        })
        .catch(function () {
            setResponse("Sikertelen törlés!")
        });

        setName("");
        setAddress("");
        setPhoneNumber("");
        setTurningDay("");
        setDebt("");
    }
    
    return (

        <div className="col-lg-8" id="content-holder">
            <div id="main-content">
                <div className='row'>
            <div className="col-sm-12">
                <form  id="addForm" onSubmit={handleSubmit}>
                    
                    <label>Szeretnéd törölni ezt a bérlőt?</label>
                    {showButton &&  <input type="submit" id="send" value="Bérlő törlése" />}

                    <div id="eredmenyDiv">{response}</div>
                </form>

                
                </div>
            </div>
            
            <OccupierCardSimple     name={name}
                                    debt={debt}
                                    phoneNumber={phoneNumber}
                                    address={address}
                                    turningDay={turningDay}>
            </OccupierCardSimple>
        </div>
    </div>
        
    )
}

export default DeleteOccupier;