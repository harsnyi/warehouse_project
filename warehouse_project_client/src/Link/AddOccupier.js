import config from '../Config';
import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import OccupierCardSimple from '../Card/OccupierCardSimple';
import OccupierForm from '../Form/OccupierForm';

function AddOccupier(){
    
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [turningDay, setTurningDay] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Átutalás");
    const [debt, setDebt] = useState("");
    const [response,setResponse] = useState("");
    const handleSubmit = (event) => {
        let payment = (paymentMethod === "Átutalás") ? true : false;

        event.preventDefault();
        
        axios.post(`http://${config.ip_address.server_address}:${config.port}/addNewOccupier`, {
            occupier_name: name,
            address: address,
            phone_number:phoneNumber,
            turning_day:turningDay,
            payment_method:payment,
            debt:debt,
        })
        .then(function () {
            setResponse("Bérlő sikeresen hozzáadva!");
            setName("");
            setAddress("");
            setPhoneNumber("");
            setTurningDay("");
            setPaymentMethod("");
            setDebt("");
        })
        .catch(function (error) {
            if (error.response) {
               
                console.error("Server responded with an error status:", error.response.status);
                console.error("Error details:", error.response.data);
            } else if (error.request) {
            
                console.error("No response received from the server.");
            } else {
            
                console.error("Error setting up the request:", error.message);
            }
            setResponse("Sikertelen hozzáadás!");
        });
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
                                    submitValue="Bérlő hozzáadása"
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
export default AddOccupier;