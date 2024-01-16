import config from '../Config';
import React from 'react'
import { useState,useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { useLocation} from "react-router-dom"

function DeleteStorage(){
    const [helyisegNev, setHelyisegNev] = useState("");
    const [alapterulet, setAlapterulet] = useState("");
    const [berletiDij, setBerletiDij] = useState("");
    const [jelenlegiBerlo, setJelenlegiBerlo] = useState("");
    const [megjegyzes, setMegjegyzes] = useState("");
    const [responseEredmeny,setResponseEredmeny] = useState("");
    const [showButton, setShowButton] = useState(true);
    
    let location = useLocation();

    useEffect(() => {
        axios.get("http://"+global.config.ip_address.host.server_address+":"+global.config.ip_address.host.port+"/getRaktar/" + location.state.raktarId)
        .then(response => {
            
            setHelyisegNev(response.data.raktar.helyisegNev);
            setAlapterulet(response.data.raktar.alapterulet);
            setBerletiDij(response.data.raktar.berletiDij);
            setMegjegyzes(response.data.raktar.megjegyzes);
            setJelenlegiBerlo(response.data.berloNev);
            
            

        })
        .catch(function (error) {
            console.log(error);
        });
    },[]);

    const handleSubmit = (event) => {
        
        event.preventDefault();
        axios.delete("http://"+global.config.ip_address.host.server_address+":"+global.config.ip_address.host.port+"/deleteRaktar/" + location.state.raktarId, {
            
            
        })
        .then(function () {
            
            setResponseEredmeny("Raktár sikeresen törölve!");
            setShowButton(false);

        })
        .catch(function () {

            setResponseEredmeny("Sikertelen törlés")
        });
        
        setHelyisegNev("");
        setAlapterulet("");
        setBerletiDij("");
        setMegjegyzes("");
        setJelenlegiBerlo("");
        
    }

    return (
        
        <div className="col-lg-8" id="content-holder">
            <div id="main-content">
                <div className='row'>
                    <div className="col-sm-12">
                        <form  id="addForm" onSubmit={handleSubmit}>
                    
                            <label>Szeretnéd törölni ezt a raktárat?</label>
                            {showButton &&  <input type="submit" id="send" value="Raktár törlése" /> }

                            <div id="eredmenyDiv">{responseEredmeny}</div>
                        </form>
                    </div>
                </div>
                
                <div className="col-sm-6">
                    <div className="card" id="content-box">
                        <div className="card-body">
                            
                            <h5 className="card-title">{helyisegNev}</h5>
                            
                            <h6 className="card-subtitle mb-2">Jelenlegi bérlő: {jelenlegiBerlo}</h6> 
                            <h6>Alapterület: {alapterulet} m<sup>2</sup></h6>                                    
                            <h6>Bérleti díj: {berletiDij } Ft</h6>     
                            <h6>Megjegyzés: {megjegyzes }</h6>   
                                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default DeleteStorage;