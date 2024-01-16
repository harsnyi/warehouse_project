import React from 'react'
import { NavLink } from "react-router-dom";

function StorageCard(props){
    return(
        <div className="col-sm-6">
            <div className="card" id="content-box">
                <div className="card-body">
                    <h5 className="card-title">{props.helyisegNev}</h5>
                    <h6 className="card-subtitle mb-2">Jelenlegi bérlő: {props.berloNev}</h6>
                    <h6>Alapterület: {props.alapterulet} m<sup>2</sup></h6>
                    <h6>Bérleti díj: { props.berletiDij } Ft</h6>
                    <h6>Megjegyzés: { props.megjegyzes }</h6>
                    
                    <NavLink to="/modify_storage" state={{ raktarId: props.id }}  activeClassName="active">
                        <button  id="update-button" className="action-button">Módosítás</button>
                    </NavLink>

                    <NavLink to="/delete_storage" state={{ raktarId: props.id }}  activeClassName="active">
                        <button  id="delete-button" className="action-button">Törlés</button>
                    </NavLink> 
                </div>
            </div>
        </div>
    );
}

export default StorageCard;