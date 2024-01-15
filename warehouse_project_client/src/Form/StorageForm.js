import React from "react"

function StorageForm(props){
    return(
        <form  id="addForm" onSubmit={props.handleSubmit}>
            <label>Add meg a helyiség nevét:
                <input 
                    type="text" 
                    value={props.helyisegNev}
                    onChange={(e) => props.setHelyisegNev(e.target.value)}
                />
            </label>

            <label>Add meg az alapterületét:
                <input 
                    type="number" 
                    value={props.alapterulet}
                    onChange={(e) => props.setAlapterulet(e.target.value)}
                />
            </label>

            <label>Add meg a bérleti díját:
                <input 
                    type="number" 
                    value={props.berletiDij}
                    onChange={(e) => props.setBerletiDij(e.target.value)}
                />
            </label>

            <label>Add meg a Jelenlegi bérlőt:
                <select onChange={(e) => props.setJelenlegiBerlo(e.target.value)}>
                    {props.berlok.map(berlo => (
                        <option value={berlo.id}>{berlo.name}</option>))}
                        <option value="0">Jelenleg nincs bérlő</option>
                        
                </select>
            </label>
            
            <label>Adj hozzá megjegyzést:
                <input 
                    type="text" 
                    value={props.megjegyzes}
                    onChange={(e) => props.setMegjegyzes(e.target.value)}
                />
            </label>

        
        <input type="submit" id="send" value="Raktár hozzáadása" />

        <div id="eredmenyDiv">{props.responseEredmeny}</div>
    </form>
    );
}

export default StorageForm;