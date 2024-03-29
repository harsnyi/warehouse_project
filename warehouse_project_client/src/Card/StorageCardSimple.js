import React from "react"

function StorageCardSimple(props){
    return(
        <div className="col-sm-6">
            <div className="card" id="content-box">
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <h6>Alapterület: {props.area} m<sup>2</sup></h6>
                    <h6>Bérleti díj: { props.cost } Ft</h6>
                    <h6>Megjegyzés: { props.comment }</h6>
                </div>
            </div>
        </div>
    );
}

export default StorageCardSimple;