/* eslint-disable react-hooks/exhaustive-deps */
import './BodyHome.css'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import ListaPostsHome from './ListaPostsHome'
import { LoginContext } from '../../Context/LoginProvider'

const BodyHome = () => {
    const url = 'https://jsonplaceholder.typicode.com/posts'
    const { Post, baseDatosPosts, eliminarPostsContext } = useContext(LoginContext)

    useEffect(() => {
        const datos_Post = async () => {
            try {
                const promesaDatosIniciales = await axios.get(url)
                const dataDePromesaInicial = await promesaDatosIniciales.data
                baseDatosPosts(dataDePromesaInicial)
            } catch (error) {
                alert('A ocurrido un error, estamos trabajando en ello :)')
            }
        }
        datos_Post()
    }, [url])
    return (
        <div className='listado-De-Post'>
            {
                (Post)
                    ? Post.map(el => {
                        return <ListaPostsHome datos={el} key={el.id} eliminarPostsContext={eliminarPostsContext} />
                    })
                    : <h3>Aún no se han creado post</h3>
            }
        </div>
    )
}

export default BodyHome
