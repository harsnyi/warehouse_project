import config from '../Config';
import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useLocation} from "react-router-dom";
import OccupierCardSimple from '../Card/OccupierCardSimple';
import OccupierForm from '../Form/OccupierForm';

function ModifyOccupier(){
    
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [turningDay, setTurningDay] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [debt, setDebt] = useState("");
    const [refreshed,setRefreshed] = useState("")
    const [response,setResponse] = useState("");

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
        
        let payment = (paymentMethod === "Átutalás") ? true : false;

        event.preventDefault();
        axios.put(`http://${config.ip_address.server_address}:${config.port}/updateOccupier/${location.state.occupierId}`, {
            occupier_name: name,
            address: address,
            phone_number:phoneNumber,
            turning_day:turningDay,
            payment_method:payment,
            debt:debt,
            refreshed: refreshed
        })
        .then(function () {
            setResponse("Bérlő sikeresen módosítva!");
        })
        .catch(function () {
            setResponse("Sikertelen módosítás!")
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
                        <OccupierForm  handleSubmit={handleSubmit}
                                    name={name}
                                    setName={setName}
                                    address={address}
                                    setAddress={setAddress}
                                    phoneNumber={phoneNumber}
                                    setPhoneNumber={setPhoneNumber}
                                    turningDay={turningDay}
                                    setTurningDay={setTurningDay}
                                    debt={debt}
                                    setDebt={setDebt}
                                    paymentMethod={paymentMethod}
                                    setPaymentMethod={setPaymentMethod}
                                    submitValue="Bérlő módosítása"
                                    response={response}/>
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

export default ModifyOccupier;