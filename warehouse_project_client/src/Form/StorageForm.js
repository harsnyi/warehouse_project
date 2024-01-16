import React from "react"

function StorageForm(props){
    return(
        <form  id="addForm" onSubmit={props.handleSubmit}>
            <label>Add meg a helyiség nevét:
                <input 
                    type="text" 
                    value={props.name}
                    onChange={(e) => props.setName(e.target.value)}
                />
            </label>

            <label>Add meg az alapterületét (m<sup>2</sup>):
                <input 
                    type="number" 
                    value={props.area}
                    onChange={(e) => props.setArea(e.target.value)}
                />
            </label>

            <label>Add meg a bérleti díját (Ft):
                <input 
                    type="number" 
                    value={props.cost}
                    onChange={(e) => props.setCost(e.target.value)}
                />
            </label>

            <label>Add meg a Jelenlegi bérlőt:
                <select onChange={(e) => props.setOccupier(e.target.value)}>
                    {props.fetchedOccupiers.map(occupier => (
                        <option value={occupier.id}>{occupier.name}</option>))}
                        <option value="0">Jelenleg nincs bérlő</option>
                        
                </select>
            </label>
            
            <label>Adj hozzá megjegyzést:
                <input 
                    type="text" 
                    value={props.comment}
                    onChange={(e) => props.setComment(e.target.value)}
                />
            </label>
        <input type="submit" id="send" value="Raktár hozzáadása" />
        <div id="eredmenyDiv">{props.response}</div>
    </form>
    );
}

export default StorageForm;