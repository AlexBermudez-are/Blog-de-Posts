import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import Detalles from './Detalles';
import './ListaPostsHome.css'

const ListaPostsHome = ({ datos, eliminarPostsContext }) => {

    const [detalles, setdetalles] = useState(false)
    const id = datos.id
    
    const eliminarPost = () => {
        eliminarPostsContext(datos)
    }


    return (
        <div className='Padre-Lista-Post'>
            <Card
                bg={'primary'}
                text={'white'}
                style={{ width: '20rem', height: '12rem' }}
                className="mb-2"
            >
                <Card.Body className='body-Card-Lista-Post'>
                    <Card.Title className='card-Title-Lista-Post'>{datos.title}</Card.Title>
                    <div className='container-Btns-Post-Lista'>
                        <Button variant='danger' onClick={eliminarPost}>Elminar</Button>
                        <Button variant="info" onClick={(e) => { setdetalles(true) }}>Detalles</Button>
                        <NavLink className='editar-Btn-Lista-Post' to={`/editar/${id}`}>Editar</NavLink>
                    </div>
                </Card.Body>
            </Card>
            <div style={{ position: "absolute", width: "320px", zIndex: "999" }}>
                {
                    detalles
                        ? <Detalles detalles={detalles} setdetalles={setdetalles} datos={datos} />
                        : false
                }
            </div>
        </div>
    )
}

export default ListaPostsHome
