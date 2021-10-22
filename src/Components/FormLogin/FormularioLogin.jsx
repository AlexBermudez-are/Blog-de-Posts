import { ErrorMessage, Field, Form, Formik } from 'formik'
import Button from 'react-bootstrap/Button';
import React from 'react'
import { withRouter } from 'react-router';
import { useContext } from 'react';
import axios from 'axios';
import './FormularioLogin.css'
import { LoginContext } from '../../Context/LoginProvider';

const alInicio = (props) => {
    const { history } = props;
    history.push('/')
}

const Datos = () => {
    const { controllForm, controladorFormF } = useContext(LoginContext)
    return (
        <>
            <Button onClick={
                () => { controladorFormF() }}
                variant="danger"
                className="btn-Cerrar-Form"
            >
                <p style={{ margin: "0" }}>X</p>
            </Button>
            {
                controllForm
                    ? <FormularioLogin />
                    : false}
        </>
    )
}

const FormularioLogin = (props) => (
    <div className="div-Padre-Form" onClick={(e) => { e.stopPropagation() }}>
        <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {

                const errors = {};

                if (!values.email) {
                    errors.email = 'El email no puede estar vacio';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                    errors.email = 'El correo ingresado no es valido';
                }
                if (!values.password) {
                    errors.password = "Porfavor ingresa una contraseña"
                } return errors;
            }}
            onSubmit={(values, { resetForm }) => {
                const url = 'http://challenge-react.alkemy.org/'

                axios.post(url, {
                    email: values.email,
                    password: values.password
                })
                    .then(res => {
                        const tokenA = res.data
                        localStorage.setItem('token', tokenA.token)
                        alInicio(props)
                        resetForm()
                    })
                    .catch(err => {
                        if (err.response) {

                            let error = err.response.data.error,
                                errorStatus = err.response.status

                            alert(`Error ${errorStatus}: ${error}`)
                            resetForm()

                        }
                    })
            }}
        >
            {({ errors }) => (
                <Form className="form-Sesion">
                    <div className="contenedor-Form-Sesion">
                        <section className="contenido-Form-Sesion">
                            <h1 style={{ color: "darkturquoise" }}>Inicia Sesión</h1>
                        </section>
                        <section style={{ paddingTop: "2rem", paddingLeft: "17%" }}>
                            <Field style={{ width: "80%" }} type="email" name="email" placeholder="ejemplo@email.com" />
                            <ErrorMessage name="email" component={() => (
                                <div style={{ color: "red" }}>{errors.email}</div>
                            )} />
                        </section>
                        <section style={{ paddingTop: "2rem", paddingLeft: "17%" }}>
                            <Field style={{ width: "80%" }} type="password" name="password" placeholder="contraseña" />
                            <ErrorMessage name="password" component={() => (
                                <div style={{ color: "red" }}>{errors.password}</div>
                            )} />
                        </section>
                        <Button style={{ marginTop: "2rem", marginLeft: "40%" }} type="submit" variant="primary">Enviar</Button>
                    </div>
                </Form>
            )}
        </Formik>
    </div>
)

export default withRouter(FormularioLogin)
export { Datos }