import React, { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import FormularioLogin, { Datos } from '../FormLogin/FormularioLogin'
import alkemyLogo from '../../Assets/alkemy_logo_black.png'
import { LoginContext } from '../../Context/LoginProvider'

const HeaderEdit = () => {
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

export default HeaderEdit
