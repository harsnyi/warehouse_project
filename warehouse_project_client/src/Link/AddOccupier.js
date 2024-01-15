import React from 'react'

import { useState } from 'react';
import axios from 'axios';
import OccupierCardSimple from '../Card/OccupierCardSimple';
import OccupierForm from '../Form/OccupierForm';

function AddOccupier(){
    
    const [name, setName] = useState("");
    const [lakcim, setLakcim] = useState("");
    const [telefonszam, setTelefonszam] = useState("");
    const [forduloNap, setForduloNap] = useState("");
    const [fizetesMod, setFizetesMod] = useState("");
    const [tartozas, setTartozas] = useState("");
    const [responseEredmeny,setResponseEredmeny] = useState("");

    const handleSubmit = (event) => {
        
        let fizetes = (fizetesMod === "Átutalás") ? false : true;

        event.preventDefault();
        axios.post("http://localhost:8000/api/v1/addNewOccupier", {
            occupier_name: name,
            address: lakcim,
            phone_number:telefonszam,
            turning_day:forduloNap,
            payment_method:fizetes,
            debt:tartozas,
            
        })
        .then(function () {
            setResponseEredmeny("Bérlő sikeresen hozzáadva!");

            setName("");
            setLakcim("");
            setTelefonszam("");
            setForduloNap("");
            setFizetesMod("");
            setTartozas("");
        })
        .catch(function (e) {
            
            console.error("Error adding occupier:", e);
            setResponseEredmeny("Sikertelen hozzáadás!")
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
                                    lakcim={lakcim}
                                    setLakcim={setLakcim}
                                    telefonszam={telefonszam}
                                    setTelefonszam={setTelefonszam}
                                    forduloNap={forduloNap}
                                    setForduloNap={setForduloNap}
                                    tartozas={tartozas}
                                    setTartozas={setTartozas}
                                    fizetesMod={fizetesMod}
                                    setFizetesMod={setFizetesMod}
                                    submitValue="Bérlő hozzáadása"
                                    responseEredmeny={responseEredmeny}/>
                    </div>
                </div>
            
                <OccupierCardSimple     name={name}
                                    tartozas={tartozas}
                                    telefonszam={telefonszam}
                                    lakcim={lakcim}
                                    forduloNap={forduloNap}>
                </OccupierCardSimple>                                   

            </div>
        </div>
        
    )
}

export default AddOccupier;