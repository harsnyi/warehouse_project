import React from 'react'
import { NavLink } from "react-router-dom";

function OccupierCard(props){
    return(
        <div className="col-sm-6">
            <div className="card" id="content-box">
                <div className="card-body">
                    <h5 className="card-title">{props.berloNev}</h5>
                    <h6 className="card-subtitle mb-2">Jelenlegi tartozás: {props.tartozas} Ft</h6>
                    <h6>Bérlő id: {props.id}</h6>                                    
                    <h6>Telefonszám: { props.lakcim }</h6>   
                    <h6>Elérhetőség: { props.telefonszam }</h6>   
                    <h6>Forduló nap: { props.forduloNap }</h6>   
                    <h6>Tartozásának frissítési ideje: { props.frissitve}</h6>
                                        
                    <NavLink to="/add_occupier_debt" state={{ berloId: props.id }}  activeClassName="active">
                        <button id="add-button" className="action-button">Összeg hozzáadás</button>
                    </NavLink>
                                        
                    <NavLink to="/modify_occupier" state={{ berloId: props.id }}  activeClassName="active">
                        <button  id="update-button" className="action-button">Módosítás</button>
                    </NavLink>    
                                        
                    <NavLink to="/delete_occupier" state={{ berloId: props.id }}  activeClassName="active">
                        <button  id="delete-button" className="action-button">Törlés</button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default OccupierCard;
