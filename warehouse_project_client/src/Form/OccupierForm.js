import React from "react"

function OccupierForm(props){
    return(
        <form  id="addForm" onSubmit={props.handleSubmit}>
            <label>Bérlő neve:
                <input 
                    type="text" 
                    value={props.name}
                    onChange={(e) => props.setName(e.target.value)}
                />
            </label>

            <label>Berlő lakcíme:
                <input 
                    type="text" 
                    value={props.address}
                    onChange={(e) => props.setAddress(e.target.value)}
                />
            </label>

            <label>Bérlő telefonszáma:
                <input 
                    type="number" 
                    value={props.phoneNumber}
                    onChange={(e) => props.setPhoneNumber(e.target.value)}
                />
            </label>

            <label>Bérlő forduló napja:
                <input 
                    type="text" 
                    value={props.turningDay}
                    onChange={(e) => props.setTurningDay(e.target.value)}
                />
            </label>

            <label>Bérlő tartozása:
                <input 
                    type="number" 
                    value={props.debt}
                    onChange={(e) => props.setDebt(e.target.value)}
                />
            </label>

            <label>Bérlő fizetési módja:
            
                <select value={props.paymentMethod}  onChange={(e) => props.setPaymentMethod(e.target.value)}>
                    <option value="Átutalás">Átutalás</option>
                    <option value="Készpénz">Készpénz</option>
                </select>
            
            </label>

            <input type="submit" id="send" value={props.submitValue} />
            <div id="eredmenyDiv">{props.response}</div>
        </form>
    );
}

export default OccupierForm;