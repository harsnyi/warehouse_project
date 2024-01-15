import React from 'react'
import {NavLink} from "react-router-dom";

function Sidebar(){
    return(
        

        <div className="col-lg-4" id="sidebar">
        <div className="content-section">
            <h1>Tevékenységek</h1>
            <ul className="list-group" id="frame">

                <li className="list-group-item border-0" id="frame">
                    <NavLink to="/add_occupier">
                        <span id="create-button" className="action-button">Új bérlő hozzáadása</span>
                    </NavLink>

                    <NavLink to="/add_storage">
                    <span  id="create-button" className="action-button">Új raktár hozzáadása</span>
                    </NavLink>

                    <NavLink to="/read_excel">
                    <span id="create-button" className="action-button">Excel beolvasás</span>
                    </NavLink>

                </li>
                <div id="buttons-frame">
                <li className="list-group-item border-0" id="frame">
                    <NavLink to="/occupiers">
                        <button className="action-button" id="show-jelenlegi-berlo" type="button">Jelenlegi bérlő</button>
                    </NavLink>
                </li>
                
                <li className="list-group-item border-0" id="frame">
                    <NavLink to="/occupiers_all">
                        <button className="action-button" id="show-osszes-berlo" type="button">Összes bérlő</button>
                    </NavLink>
                </li>
                
                <li className="list-group-item border-0" id="frame">
                    <NavLink to="/rented_storage">
                        <button className="action-button" id="show-berelt-raktar" type="button">Bérelt raktárak</button>
                    </NavLink>
                </li>
                
                <li className="list-group-item border-0" id="frame">
                    <NavLink to="/storage_all">
                        <button className="action-button" id="show-osszes-raktar" type="button">Összes raktár</button>
                    </NavLink>
                </li>


                <li className="list-group-item border-0" id="frame">
                    <NavLink to="/empty_storage">
                        <button className="action-button" id="show-ures-raktar" type="button">Üres raktárak</button>
                    </NavLink>
                </li>
                </div>
            </ul>
            
        </div>
    </div>
    )
}

export default Sidebar;