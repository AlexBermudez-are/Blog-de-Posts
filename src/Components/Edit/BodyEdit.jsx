/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router';
import './BodyEdit.css'
import FormularioLogin, { Datos } from '../FormLogin/FormularioLogin';
import { LoginContext } from '../../Context/LoginProvider';

const BodyEdit = (props) => {
    const { id } = useParams()
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`
    const [datosPost, setdatosPost] = useState({})
    const [verificadorId, setverificadorId] = useState(false)
    let tokenInicioSesion = localStorage.getItem("token")
    const { controladorFormF, controllForm } = useContext(LoginContext)

    const token = (props) => {
        const { history } = props;
        history.push('/')
    }

    useEffect(() => {
        const editarPost = async () => {
            if (!id) {
                alert("El post no es accesible")
                setverificadorId(true)
            } else {
                const datosPrimarios = await axios.get(url)
                const datosData = await datosPrimarios.data
                setdatosPost(datosData)
            }
        }
        editarPost()
    }, [])

    return (
        <div className="padre-Edit">
            {
                !verificadorId
                    ? <Formik
                        enableReinitialize //<= esta madre espera a que los datos esten disponibles
                        initialValues={{
                            title: datosPost.title ? datosPost.title : "",
                            body: datosPost.body ? datosPost.body : "",
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
                                    axios.put(url, {
                                        title: values.title,
                                        body: values.body
                                    })
                                        .then(res => {
                                            alert("El post se actualizó")
                                            token(props)
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
                                }
                            }
                            iniciarSesionEdiarPost()
                        }}
                    >
                        {({ errors }) => (
                            <Form className="form-Body-Edit">
                                <div className="contenedor-Body-Edit">
                                    <section className="contenido-Body-Edit">
                                        <h1 style={{ color: "white" }}>Edita tu post</h1>
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
                    : <h1>Error: El post no se encuentra disponible</h1>
            }
        </div>
    )
}

export { BodyEdit }
export default withRouter(BodyEdit)