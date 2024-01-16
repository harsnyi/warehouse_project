import React from 'react'
import { NavLink } from "react-router-dom";

function OccupierCard(props){
    return(
        <div className="col-sm-6">
            <div key={props.id} className="card" id="content-box">
                <div className="card-body">
                    <h5 className="card-title">{props.occupierName}</h5>
                    <h6 className="card-subtitle mb-2">Jelenlegi tartozás: {props.debt} Ft</h6>
                    <h6>Bérlő id: {props.id}</h6>
                    <h6>Telefonszám: { props.phoneNumber }</h6>
                    <h6>Elérhetőség: { props.address }</h6>
                    <h6>Forduló nap: { props.turningDay }</h6>
                    <h6>Tartozásának frissítési ideje: { props.refreshed}</h6>
                                        
                    <NavLink to="/add_occupier_debt" state={{ occupierId: props.id }}  activeClassName="active">
                        <button id="add-button" className="action-button">Összeg hozzáadás</button>
                    </NavLink>
                                        
                    <NavLink to="/modify_occupier" state={{ occupierId: props.id }}  activeClassName="active">
                        <button  id="update-button" className="action-button">Módosítás</button>
                    </NavLink>    
                                        
                    <NavLink to="/delete_occupier" state={{ occupierId: props.id }}  activeClassName="active">
                        <button  id="delete-button" className="action-button">Törlés</button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default OccupierCard;
