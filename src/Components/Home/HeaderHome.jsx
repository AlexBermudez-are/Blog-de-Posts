import './HeaderHome.css'
import React, { useContext, useEffect } from 'react'
import alkemyLogo from '../../Assets/alkemy_logo_black.png'
import { NavLink } from 'react-router-dom'
import { LoginContext } from '../../Context/LoginProvider'
import FormularioLogin, { Datos } from '../FormLogin/FormularioLogin'

const HeaderHome = () => {

    let token = localStorage.getItem("token")
    const { controllForm, controladorFormF } = useContext(LoginContext)

    const cerrarForm = (e) => {
        controladorFormF(true)
    }

    useEffect(() => {

        if (!token) { controladorFormF(false) }
        else controladorFormF(true)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])

    return (
        <>
            <section className="contenedor-Padre-Header">
                <NavLink className="logo-Link-To-Home" exact to="/">
                    <img className="logo-Header-Home" src={alkemyLogo} alt="logo_Alkemy" />
                </NavLink>
                <NavLink className="link-Header-Home" exact to="/crear-post">Crea un nuevo post</NavLink>
            </section>
            <div onClick={cerrarForm}>
                {
                    !controllForm ? <Datos /> : false
                }
                {
                    !controllForm ? <FormularioLogin /> : false
                }
            </div>
        </>
    )
}

export default HeaderHome
