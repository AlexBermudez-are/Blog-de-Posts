import React, { useEffect, useRef } from 'react'
import './Detalles.css'

const Detalles = ({ detalles, setdetalles, datos }) => {

    const detallesRef = useRef()

    // Este useEffect cambia la animacion de cada post para mostrar los detalles
    useEffect(() => {
        if (detalles) detallesRef.current.className = 'padre-Detalles-Container active'
        if (!detalles) detallesRef.current.className = 'padre-Detalles-Container'
    }, [detalles])

    return (
        <div className='padre-Detalles-Container' ref={detallesRef}>
            <div onClick={() => { setdetalles(false) }} className='btn-Detalles'>x</div>
            {datos.id ? <p>{datos.body}</p> : <p style={{color:"red"}}>Error 404</p> }
        </div>
    )
}

export default Detalles
