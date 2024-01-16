import config from '../Config';
import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useLocation} from "react-router-dom"

function DeleteStorage(){
    const [name, setName] = useState("");
    const [area, setArea] = useState("");
    const [cost, setCost] = useState("");
    const [occupier, setOccupier] = useState("");
    const [comment, setComment] = useState("");
    const [response,setResponse] = useState("");
    const [showButton, setShowButton] = useState(true);
    
    let location = useLocation();

    useEffect(() => {
        axios.get(`http://${config.ip_address.server_address}:${config.port}/getStorage/${location.state.storageId}`)
        .then(response => {
            setName(response.data.name);
            setArea(response.data.area);
            setCost(response.data.cost);
            setComment(response.data.comment);
            setOccupier(response.data.occupier.occupier_name ? response.data.occupier.occupier_name : "Jelenleg nincs bérlő");
        })
        .catch(function (error) {
            console.log(error);
        });
    },[]);

    const handleSubmit = (event) => {

        event.preventDefault();
        axios.delete(`http://${config.ip_address.server_address}:${config.port}/deleteStorage/${location.state.storageId}`, {
        })
        .then(function () {
            setResponse("Raktár sikeresen törölve!");
            setShowButton(false);
        })
        .catch(function () {
            setResponse("Sikertelen törlés")
        });
        setName();
        setArea("");
        setCost("");
        setComment("");
        setOccupier("");
    }
    return (
        
        <div className="col-lg-8" id="content-holder">
            <div id="main-content">
                <div className='row'>
                    <div className="col-sm-12">
                        <form  id="addForm" onSubmit={handleSubmit}>

                            <label>Szeretnéd törölni ezt a raktárat?</label>
                            {showButton &&  <input type="submit" id="send" value="Raktár törlése" /> }

                            <div id="eredmenyDiv">{response}</div>
                        </form>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card" id="content-box">
                        <div className="card-body">
                            <h5 className="card-title">{name}</h5>
                            <h6 className="card-subtitle mb-2">Jelenlegi bérlő: {occupier}</h6> 
                            <h6>Alapterület: {area} m<sup>2</sup></h6>
                            <h6>Bérleti díj: {cost } Ft</h6>
                            <h6>Megjegyzés: {comment }</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DeleteStorage;