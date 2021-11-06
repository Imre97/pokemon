import React, { useState, useRef, useEffect } from 'react'
import './draganddrop.css'

export default function DragAndDrop({ data, getPokemons }) {

    const [dragged, setDragged] = useState(false)
    const [dndData, setDndData] = useState([])

    const dragItem = useRef()
    const dragNode = useRef()

    useEffect(() => {
        setDndData([{ groupTitle: "Kedvenc pokemon", groupItems: [] }, { groupTitle: "Pokemonok", groupItems: data }])
    }, [data])


    const handleDragStart = (e, params) => {
        dragItem.current = params
        dragNode.current = e.target
        dragNode.current.addEventListener('dragend', dragEnd)
        setTimeout(() => {
            setDragged(true)
        }, 0)

    }


    const handleDragEnter = (e, params) => {
        const currentItem = dragItem.current
        if (e.target !== dragNode.current) {
            setDndData(prev => {
                let newData = JSON.parse(JSON.stringify(prev))
                newData[params.groupI].groupItems.splice(params.itemI, 0, newData[currentItem.groupI].groupItems.splice(currentItem.itemI, 1)[0])
                dragItem.current = params
                return newData
            })
        }
    }

    const dragEnd = () => {
        setDragged(false)
        dragNode.current.removeEventListener('dragend', dragEnd)
        dragItem.current = null
        dragNode.current = null
    }

    const getStyle = (params) => {
        if (dragItem.current.groupI === params.groupI && dragItem.current.itemI === params.itemI) {
            return "current dndCard"
        } else {
            return "dndCard"
        }
    }

    return (
        <div className="container">
            <div className="wrapper">
                {dndData.map((groupBox, groupI) => (
                    <div key={groupI} className="groupBox" onDragEnter={dragged && !groupBox.groupItems.length ? (e) => handleDragEnter(e, { groupI, itemI: 0 }) : null}>
                        <div className="title">{groupBox.groupTitle}</div>
                        {groupBox.groupItems.map((item, itemI) => (
                            <div draggable onDragEnter={(e) => { handleDragEnter(e, { groupI, itemI }) }} onDragStart={(e) => handleDragStart(e, { groupI, itemI })} key={itemI} className={dragged ? getStyle({ groupI, itemI }) : "dndCard"}>
                                <div className="cardTitle">{item.name}</div>
                                <img src={item.thumbnail} className="cardImg" />
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <button className="pokemonButton" onClick={getPokemons}>Több pokemon</button>
        </div>
    )
}
