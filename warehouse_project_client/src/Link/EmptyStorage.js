import config from '../Config';
import React from 'react'
import { useEffect,useState } from "react";
import StorageCard from '../Card/StorageCard';

function EmptyStorage(){
    const [storages,setStorages] = useState([]);
    const [isFetchPending,setFetchPending] = useState(false);
    
    useEffect(() => {
        setFetchPending(true);
        fetch(`http://${config.ip_address.server_address}:${config.port}/getAllEmptyStorage`, { withCredentials: true })
        .then((res) => res.json())
        .then((storage_list) => setStorages(storage_list))
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
                    <h2 id="page_title">Üres raktár:</h2>
                    {storages.map((storage) => (
                        <StorageCard name={storage.name}
                                    occupierName= {null}
                                    area={storage.area}
                                    cost={storage.cost}
                                    comment={storage.comment}
                                    id={storage.id}>
                        </StorageCard> 
                    ))}
                    </div>
                    
                </div>
            )}
        </div>
    </div>
    );
}
export default EmptyStorage;