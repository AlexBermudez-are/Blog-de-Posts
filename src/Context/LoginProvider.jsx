import axios from 'axios'
import React, { createContext, useState } from 'react'

const LoginContext = createContext()

const LoginProvider = ({ children }) => {

    // controllForm y controladorFormF controlan la visualizacion del formulario de logueo
    const [controllForm, setcontrollForm] = useState(false)
    const controladorFormF = (prop) => {
        setcontrollForm(prop)
    }
    // baseDatosPosts es una funcion que provee al estado Post de los Posts que hay en la base de datos
    const [Post, setPost] = useState([])
    const baseDatosPosts = (posts) => {
        setPost(posts)
    }

    // funcion para eliminar los post existentes

    const eliminarPostsContext = (datos) => {
        const url = `https://jsonplaceholder.typicode.com/posts/${datos.id}`
        let isDelete = window.confirm(`¿Estas seguro que quieres eliminar el post "${datos.title}?"`)
        if (isDelete) axios.delete(url)
        
        const datosFiltrados = Post.filter(el => {
            return el.id !== datos.id
        })
        setPost(datosFiltrados)
    }

    const data = {
        eliminarPostsContext,
        controladorFormF,
        baseDatosPosts,
        controllForm,
        Post,
    }

    return <LoginContext.Provider value={data}>{children}</LoginContext.Provider>
}

export default LoginProvider
export { LoginContext }