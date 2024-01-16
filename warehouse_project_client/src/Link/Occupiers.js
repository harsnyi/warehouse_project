import config from '../Config';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OccupierCard from '../Card/OccupierCard';

function Occupiers() {
    const [storages, setStorages] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(() => {
        setFetchPending(true);
        axios.get(`http://${config.ip_address.server_address}:${config.port}/getAllRentedStorage`, { withCredentials: true })
        .then(response => {
            setStorages(response.data);
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
                            <h2 id="page_title">Jelenlegi bérlő:</h2>
                            {storages.map((storage) => (
                                <OccupierCard
                                    key={storage.occupier.id}
                                    occupierName={storage.occupier.occupier_name}
                                    storageName={storage.name}
                                    debt={storage.occupier.debt}
                                    id={storage.occupier.id}
                                    address={storage.occupier.address}
                                    phoneNumber={storage.occupier.phone_number}
                                    turningDay={storage.occupier.turning_day}
                                    refreshed={storage.occupier.refreshed}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default Occupiers;
