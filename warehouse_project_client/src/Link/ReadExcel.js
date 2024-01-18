import config from '../Config';
import React from 'react'
import { useState } from 'react';
import axios from 'axios';

function ReadExcel(){
    
    const [result,setResult] = useState("");
    const [selectedFile,setSelectedFile] = useState(null);
    const [response,setResponse] = useState([]);
    const [modifiedOccupiers,setModifiedOccupiers] = useState([]);
    const [showButton, setShowButton] = useState(false);
    const [showUpload, setShowUpload] = useState(true);


    const handleSubmit = (event) => {
        event.preventDefault();
        const form = new FormData();
        
        form.append('file',selectedFile);
        
        
            axios.post(`http://${config.ip_address.server_address}:${config.port}/uploadExcel`, form, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then(function (response) {
                if(response.data.length > 0){
                    setResult('Excel fájl sikeresen feltöltve!');
                    setResponse(response.data);
                    setShowButton(true);
                    setShowUpload(false);
                    
                }
                else {
                    setResult('Nincs talált bérlő az Excel fájlban!');
                    setResponse([]);
                }
            })
            .catch(function () {
                setResult('Sikertelen feltöltés!');
            });
        };
        
        const handleDelete = (index) => {
            
            const updatedItems = [...response.slice(0, index), ...response.slice(index + 1)];
            setResponse(updatedItems);
        };

        const paymentRefresh = (event) => {
            
            console.log(response);

            event.preventDefault();
            axios.post(`http://${config.ip_address.server_address}:${config.port}/updateDebt`,
                response, {
                
                headers: {
                    "Content-Type": "application/json"
                }
                
            })
            .then(function (response) {
                console.log(response.data);
                console.log(response.status);
                setShowButton(false);
                setModifiedOccupiers(response.data);

            })
            .catch(function (error) {
                console.log(error);
                
            });

        };


    
    return(
        <div className="col-lg-8" id="content-holder">
            <div id="main-content">
            
                <div className='row'>
                <h2 id="page_title">Excel beolvasás:</h2>
                    <div className="col-sm-12">
                    
                        <form  id="addForm" onSubmit={handleSubmit} encType="multipart/form-data">
                            <label>Excel fájl:
                        
                            <input
                                type="file"
                                name="file"
                                className="action-button"
                                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                onChange={(e) => setSelectedFile(e.target.files[0])}
                            />
                            </label>
                            {showUpload && <input type="submit"  className="action-button" id="send" value="Fájl feltöltése" />}
                            <div id="eredmenyDiv">{result}</div>
                        </form>
                        <div>
                            <ul>
                                {response.map((occupier, index) => (
                                    <div className="card" id="content-box">
                                        <div key={index} className="card-body">
                                            <h5 className="card-title">Talált bérlő: {occupier.name}</h5>
                                            <h6>Utalt összeg: {occupier.total} Ft</h6>
                                            <h6>Könyvelés dátuma: {occupier.date}</h6>
                                            <h6>Közlemény: {occupier.comment}</h6>
                                            <button id="delete-button2" className="action-button" onClick={() => handleDelete(index)}>Törlés</button>
                                        </div>
                                    </div>
                                    ))}
                            </ul>
                        </div>
                                
                            {showButton && <button id="send" onClick={paymentRefresh} className="action-button">Tartozás levonása</button>}

                            <div>
                                {!showUpload && !showButton && <h3 className="card-title">Műveletek: </h3>}
                                {modifiedOccupiers.map((element, index) => (
                                <span id="eredmenyDiv" key={index}>{element.name} : {element.total} Ft : {element.comment}<br/></span>
                                ))}
                            </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReadExcel;