/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import FormularioLogin, { Datos } from '../FormLogin/FormularioLogin';
import { LoginContext } from '../../Context/LoginProvider';
import { useHistory } from 'react-router';


const BodyCreate = () => {
    const url = `https://jsonplaceholder.typicode.com/posts`
    let tokenInicioSesion = localStorage.getItem("token")
    const { controladorFormF, controllForm } = useContext(LoginContext)

    let historial = useHistory()

    const token = (props) => {
        alert("El post fue creado")
        historial.push("/")
    }

    return (
        <div className="padre-Edit">
            <Formik
                enableReinitialize //<= esta madre espera a que los datos esten disponibles
                initialValues={{
                    title: "",
                    body: ""
                }}
                validate={values => {

                    const errors = {};

                    if (!values.title) {
                        errors.title = 'El titulo no puede estar vacio'
                    } else if (values.title.length > 100) errors.title = "El titulo no puede exceder los 100 caracteres"
                    if (!values.body) {
                        errors.body = "El contenido no puede estar vacio"
                    } else if (values.body.length > 300) errors.body = "El contenido es demasiado largo"

                    return errors;
                }}
                onSubmit={(values, { resetForm }) => {
                    const iniciarSesionEdiarPost = () => {
                        !tokenInicioSesion ? controladorFormF(false) : controladorFormF(true)
                        if (!tokenInicioSesion) {
                            <div>
                                {
                                    !controllForm ? <Datos /> : false
                                }
                                {
                                    !controllForm ? <FormularioLogin /> : false
                                }
                            </div>
                        } else {
                            axios.post(url, {
                                title: values.title,
                                body: values.body
                            })
                                .then(res => {
                                    if (res.status === 201) {
                                        resetForm()
                                        token()
                                    }
                                })
                                .catch(err => {
                                    if (err.response) {

                                        let error = err.response.data.error,
                                            errorStatus = err.response.status

                                        alert(`Error ${errorStatus}: ${error}`)
                                        resetForm()

                                    }
                                })
                        }
                    }
                    iniciarSesionEdiarPost()
                }}
            >
                {({ errors }) => (
                    <Form className="form-Body-Edit" >
                        <div className="contenedor-Body-Edit" style={{ backgroundColor: "#6f42c1" }}>
                            <section className="contenido-Body-Edit">
                                <h1 style={{ color: "white" }}>Crea tu Post</h1>
                            </section>
                            <section style={{ paddingTop: "2rem", width: "80%", textAlign: "center" }}>
                                <h3 style={{ color: "white" }}>Titulo</h3>
                                <Field style={{ width: "100%" }} type="text" name="title" />
                                <ErrorMessage name="title" component={() => (
                                    <div style={{ color: "red" }}>{errors.title}</div>
                                )} />
                            </section>
                            <section style={{ paddingTop: "2rem", width: "80%", textAlign: "center" }}>
                                <h3 style={{ color: "white" }}>Contenido</h3>
                                <Field className='text-Area-Edit' as="textarea" name="body" />
                                <ErrorMessage name="body" component={() => (
                                    <div style={{ color: "red" }}>{errors.body}</div>
                                )} />
                            </section>
                            <Button style={{
                                marginTop: "2rem",
                                width: "30%",
                                height: "55px",
                                marginBottom: "2rem"
                            }} type="submit" variant="danger">Enviar</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export { BodyCreate }