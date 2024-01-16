import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import StorageCardSimple from '../Card/StorageCardSimple';
import StorageForm from '../Form/StorageForm';

function AddStorage(){
    
    const [helyisegNev, setHelyisegNev] = useState("");
    const [alapterulet, setAlapterulet] = useState("");
    const [berletiDij, setBerletiDij] = useState("");
    const [jelenlegiBerlo, setJelenlegiBerlo] = useState("0");
    const [megjegyzes, setMegjegyzes] = useState("");
    const [berlok, setBerlok]  = useState([]);
    const [responseEredmeny,setResponseEredmeny] = useState("");
    
    useEffect(() => {
        axios.get("http://localhost:8000/api/v1/getOccupiers")
            .then(response => {
                console.log(response.data);
                const fetchedBerlok = response.data.map(item => ({
                    name: item.occupier_name,
                    id: item.id
                }));
                setBerlok(prevBerlok => [...prevBerlok, ...fetchedBerlok]);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const handleSubmit = (event) => {
        
        event.preventDefault();
        console.log(berlok);
        axios.post("http://localhost:8000/api/v1/addNewStorage", {
            name: helyisegNev,
            area: alapterulet,
            cost:berletiDij,
            occupier:jelenlegiBerlo,
            comment:megjegyzes,
            
        })
        .then(function (response) {
            console.log(response.status); 
            setResponseEredmeny("Raktár sikeresen hozzáadva!")
            
        })
        .catch(function (error) {
            console.log(error);
            setResponseEredmeny("Sikertelen hozzáadás!")
        });
    }
    
    return (
        
        <div className="col-lg-8" id="content-holder">
            <div id="main-content">
                <div className='row'>
            <div className="col-sm-12">

                <StorageForm handleSubmit={handleSubmit}
                            helyisegNev={helyisegNev}
                            setHelyisegNev={setHelyisegNev}
                            alapterulet={alapterulet}
                            setAlapterulet={setAlapterulet}
                            berletiDij={berletiDij}
                            setBerletiDij={setBerletiDij}
                            setJelenlegiBerlo={setJelenlegiBerlo}
                            berlok={berlok}
                            megjegyzes={megjegyzes}
                            setMegjegyzes={setMegjegyzes}
                            submitValue="Raktár hozzáadása"
                            responseEredmeny={responseEredmeny}/>

                </div>
            </div>
            <StorageCardSimple   helyisegNev={helyisegNev}
                                alapterulet={alapterulet}
                                berletiDij={berletiDij}
                                megjegyzes={megjegyzes}
                                >
            </StorageCardSimple>

        </div>
        </div>
        
    )
}

export default AddStorage;