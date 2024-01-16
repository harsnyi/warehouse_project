import config from '../Config';
import React from 'react'
import { useEffect,useState } from "react";
import { BrowserRouter, NavLink,Routes,Route } from "react-router-dom";
import OccupierCard from '../Card/OccupierCard';

function OccupiersAll(){
    
    const [occupiers,setOccupiers] = useState([]);
    const [isFetchPending,setFetchPending] = useState(false);

    useEffect(() => {
        setFetchPending(true);
        fetch("http://"+config.ip_address.server_address+":"+config.port+"/getOccupiers",{credentials:"same-origin"})
        .then((res) => res.json())
        .then((occupier_list) => setOccupiers(occupier_list))
        .catch(console.log)
        .finally(()=> {
            setFetchPending(false);
        });
    },[]);

    return(
        <div className="col-lg-8" id="content-holder">
        <div id="main-content">
            {isFetchPending ? (
                <div className="spinner-border" id="spin"></div>
            ) : (
                <div>
                    
                    <div class="row">
                    <h2 id="page_title">Összes Bérlő:</h2>
                    
                    {occupiers.map((occupier) => (
                        
                        <OccupierCard  occupierName={occupier.occupier_name}
                                    debt={occupier.debt}
                                    id={occupier.id}
                                    address={occupier.address}
                                    phoneNumber={occupier.phone_number}
                                    turningDay={occupier.turning_day}
                                    refreshed={occupier.refreshed}>
                        </OccupierCard>
                    ))}
                    </div>
                    
                </div>
            )}
        </div>
    </div>
    );
}

export default OccupiersAll;