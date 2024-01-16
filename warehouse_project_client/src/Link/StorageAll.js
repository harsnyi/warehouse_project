import config from '../Config';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StorageCard from '../Card/StorageCard';

function StorageAll() {
    const [storages, setStorages] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(() => {
        setFetchPending(true);
        axios.get(`http://${config.ip_address.server_address}:${config.port}/getAllStorage`, { withCredentials: true })
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
                            <h2 id="page_title">Összes raktár:</h2>
                            {storages.map((storage) => (
                                <StorageCard
                                    key={storage.id}
                                    name={storage.name}
                                    occupierName={storage.occupier.occupier_name ? storage.occupier.occupier_name : "Jelenleg nincs bérlő"}
                                    area={storage.area}
                                    cost={storage.cost}
                                    comment={storage.comment}
                                    id={storage.id}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StorageAll;
