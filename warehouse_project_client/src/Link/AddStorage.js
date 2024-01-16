import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import StorageCardSimple from '../Card/StorageCardSimple';
import StorageForm from '../Form/StorageForm';

function AddStorage(){
    const [name, setName] = useState("");
    const [area, setArea] = useState("");
    const [cost, setCost] = useState("");
    const [occupier, setOccupier] = useState("0");
    const [comment, setComment] = useState("");
    const [fetchedOccupiers, setFetchedOccupiers]  = useState([]);
    const [response,setResponse] = useState("");
    
    useEffect(() => {
        axios.get("http://localhost:8000/api/v1/getOccupiers")
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

    const handleSubmit = (event) => {
        
        event.preventDefault();
        console.log(fetchedOccupiers);
        axios.post("http://localhost:8000/api/v1/addNewStorage", {
            name: name,
            area: area,
            cost:cost,
            occupier:occupier,
            comment:comment,
            
        })
        .then(function (response) {
            console.log(response.status); 
            setResponse("Raktár sikeresen hozzáadva!")
            
        })
        .catch(function (error) {
            console.log(error);
            setResponse("Sikertelen hozzáadás!")
        });
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
                            setOccupier={setOccupier}
                            fetchedOccupiers={fetchedOccupiers}
                            comment={comment}
                            setComment={setComment}
                            submitValue="Raktár hozzáadása"
                            response={response}/>
                </div>
            </div>
            <StorageCardSimple  name={name}
                                    area={area}
                                    cost={cost}
                                    comment={comment}
                                    >
            </StorageCardSimple>
            </div>
        </div>
        
    )
}

export default AddStorage;