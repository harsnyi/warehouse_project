import React from 'react'
import { NavLink } from "react-router-dom";

function StorageCard(props){
    return(
        <div className="col-sm-6">
            <div key={props.id} className="card" id="content-box">
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <h6 className="card-subtitle mb-2">Jelenlegi bérlő: {props.occupierName}</h6>
                    <h6>Alapterület: {props.area} m<sup>2</sup></h6>
                    <h6>Bérleti díj: { props.cost } Ft</h6>
                    <h6>Megjegyzés: { props.comment }</h6>
                    
                    <NavLink to="/modify_storage" state={{ storageId: props.id }}  activeClassName="active">
                        <button  id="update-button" className="action-button">Módosítás</button>
                    </NavLink>

                    <NavLink to="/delete_storage" state={{ storageId: props.id }}  activeClassName="active">
                        <button  id="delete-button" className="action-button">Törlés</button>
                    </NavLink> 
                </div>
            </div>
        </div>
    );
}

export default StorageCard;