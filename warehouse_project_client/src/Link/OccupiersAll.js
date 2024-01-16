import config from '../Config';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import OccupierCard from '../Card/OccupierCard';

function OccupiersAll() {
    const [occupiers, setOccupiers] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(() => {
        setFetchPending(true);
        axios.get(`http://${config.ip_address.server_address}:${config.port}/getOccupiers`, { withCredentials: true })
        .then(response => {
            setOccupiers(response.data);
        })
        .catch(error => {
            console.error(error);
        })
        .finally(() => {
            setFetchPending(false);
        });
    }, []);

    return (
        <div className="col-lg-8" id="content-holder">
            <div id="main-content">        
                {isFetchPending ? (
                    <div className="spinner-border" id="spin"></div>
                ) : (
                    <div>
                        <div className="row">
                            <h2 id="page_title">Összes Bérlő:</h2>

                            {occupiers.map((occupier) => (
                            
                                <OccupierCard
                                    key={occupier.id}
                                    occupierName={occupier.occupier_name}
                                    debt={occupier.debt}
                                    id={occupier.id}
                                    address={occupier.address}
                                    phoneNumber={occupier.phone_number}
                                    turningDay={occupier.turning_day}
                                    refreshed={occupier.refreshed}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OccupiersAll;
