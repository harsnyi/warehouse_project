import React from 'react'

function OccupierCardSimple(props){
    return(
        <div className="col-sm-6">
            <div className="card" id="content-box">
                <div className="card-body">
                
                    <h5 className="card-title">{ props.name }</h5>
                    <h6 className="card-subtitle mb-2">Jelenlegi tartozás: { props.debt } Ft</h6>                                  
                    <h6>Telefonszám: { props.phoneNumber }</h6>   
                    <h6>Elérhetőség: { props.address }</h6>   
                    <h6>Forduló nap: { props.turningDay }</h6>   
                
                </div>
            </div>
        </div>
    );
}



export default OccupierCardSimple;
