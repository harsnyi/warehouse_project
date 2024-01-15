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
                    value={props.lakcim}
                    onChange={(e) => props.setLakcim(e.target.value)}
                />
            </label>

            <label>Bérlő telefonszáma:
                <input 
                    type="number" 
                    value={props.telefonszam}
                    onChange={(e) => props.setTelefonszam(e.target.value)}
                />
            </label>

            <label>Bérlő forduló napja:
                <input 
                    type="text" 
                    value={props.forduloNap}
                    onChange={(e) => props.setForduloNap(e.target.value)}
                />
            </label>

            <label>Bérlő tartozása:
                <input 
                    type="number" 
                    value={props.tartozas}
                    onChange={(e) => props.setTartozas(e.target.value)}
                />
            </label>

            <label>Bérlő fizetési módja:
            
                <select value={props.fizetesMod}  onChange={(e) => props.setFizetesMod(e.target.value)}>
                    <option value="Átutalás">Átutalás</option>
                    <option value="Készpénz">Készpénz</option>
                </select>
            
            </label>

    
            <input type="submit" id="send" value={props.submitValue} />

            <div id="eredmenyDiv">{props.responseEredmeny}</div>                   
        </form>
    );
}

export default OccupierForm;