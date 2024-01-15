import React from 'react'
import {Routes,Route } from "react-router-dom";
import Occupiers from './Link/Occupiers';
import OccupiersAll from './Link/OccupiersAll';
import ModifyStorage from './Link/ModifyStorage';
import RentedStorage from './Link/RentedStorage';
import StorageAll from './Link/StorageAll';
import EmptyStorage from './Link/EmptyStorage';

import Home from './Link/Home';
import AddOccupier from './Link/AddOccupier';
import AddStorage from './Link/AddStorage';
import ReadExcel from './Link/ReadExcel';
import ModifyOccupier from './Link/ModifyOccupier';

import AddOccupierDebt from './Link/AddOccupierDebt';
import DeleteOccupier from './Link/DeleteOccupier';
import DeleteStorage from './Link/DeleteStorage';


function RoutesComponent(){
    return(
        <Routes>
        <Route path='/' exact  Component={Home}></Route>

        <Route path='add_occupier' Component={AddOccupier}></Route>

        <Route path='add_storage' Component={AddStorage}></Route>

        <Route path='read_excel' Component={ReadExcel}></Route>

        <Route path='occupiers' Component={Occupiers}></Route>

        <Route path='occupiers_all' Component={OccupiersAll}></Route>
        
        <Route path='rented_storage' Component={RentedStorage}></Route>

        <Route path='storage_all' Component={StorageAll}></Route>

        <Route path='empty_storage' Component={EmptyStorage}></Route>
        
        <Route path='modify_occupier' Component={ModifyOccupier}></Route>

        <Route path='modify_storage' Component={ModifyStorage}></Route>

        <Route path='delete_storage' Component={DeleteStorage}></Route>

        <Route path='add_occupier_debt' Component={AddOccupierDebt}></Route>

        <Route path='delete_occupier' Component={DeleteOccupier}></Route>
    </Routes>

    );
}

export default RoutesComponent;