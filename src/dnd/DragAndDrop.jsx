import React, {useEffect} from 'react'
import './draganddrop.css'

export default function DragAndDrop({data}) {

    const dndData = [{groupTitle: "Kedvenc pokemon", groupItems: []}, {groupTitle: "Pokemonok", groupItems: data}]

    useEffect(() => {
        console.log(data)
    }, [])

    return (
        <div className="container">
            <div className="wrapper">
                {data.map((groupBox, groupI) => (
                    <div key={groupI} className="groupBox">
                        <div className="title">{groupBox.groupTitle}</div>
                        {groupBox.groupItems.map((item, itemI) => (
                            <div key={itemI} className="dndCard">
                                <div className="cardTitle">{item.name}</div>
                                <img src={item.thumbnail} className="cardImg" />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
