import config from '../Config';
import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useLocation} from "react-router-dom";
import StorageCardSimple from '../Card/StorageCardSimple';
import StorageForm from '../Form/StorageForm';

function ModifyStorage(){

    const [name, setName] = useState("");
    const [area, setArea] = useState("");
    const [cost, setCost] = useState("");
    const [occupier, setOccupier] = useState("0");
    const [comment, setComment] = useState("");
    const [fetchedOccupiers, setFetchedOccupiers]  = useState([]);
    const [response,setResponse] = useState("");
    
    let location = useLocation();

    useEffect(() => {
        axios.get(`http://${config.ip_address.server_address}:${config.port}/getOccupiers`)
            .then(response => {
                console.log(response.data);
                const occupiers = response.data.map(item => ({
                    name: item.occupier_name,
                    id: item.id
                }));
                setFetchedOccupiers(prevOccupiers => [...prevOccupiers, ...occupiers]);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get(`http://${config.ip_address.server_address}:${config.port}/getStorage/${location.state.storageId}`)
        .then(response => {
            setName(response.data.name);
            setArea(response.data.area);
            setCost(response.data.cost);
            setComment(response.data.comment);

            if(response.data.occupier === "Jelenleg nincs bérlője"){
                setOccupier("0");
            }
            else{
                setOccupier(response.data.occupier.id);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    },[]);
    

    const handleSubmit = (event) => {
        
        event.preventDefault();
        let oc = occupier === "0" ? null : occupier; 
        axios.put(`http://${config.ip_address.server_address}:${config.port}/updateStorage/${location.state.storageId}`, {
            name: name,
            area: area,
            cost:cost,
            occupier:oc,
            comment:comment,
        })
        .then(function () {
            setResponse("Raktár sikeresen módosítva!")
        })
        .catch(function () {
            setResponse("Sikertelen módosítás")
        });
        
        setName("");
        setArea("");
        setCost("");
        setComment("");
        setOccupier("0");
    }
    
    return (
        
        <div className="col-lg-8" id="content-holder">
            <div id="main-content">
                <div className='row'>
            <div className="col-sm-12">

                <StorageForm handleSubmit={handleSubmit}
                            name={name}
                            setName={setName}
                            area={area}
                            setArea={setArea}
                            cost={cost}
                            setCost={setCost}
                            occupier = {occupier}
                            setOccupier={setOccupier}
                            fetchedOccupiers={fetchedOccupiers}
                            comment={comment}
                            setComment={setComment}
                            submitValue="Raktár módosítása"
                            response={response}/>

                </div>
            </div>
            
            <StorageCardSimple      name={name}
                                    area={area}
                                    cost={cost}
                                    comment={comment}
                                    >
            </StorageCardSimple>
            </div>
        </div>
        
    )
}

export default ModifyStorage;