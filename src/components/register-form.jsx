import { useState } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import './login-form.css'
import { Link } from 'react-router-dom'

export function RegisterForm({ onSubmit }) {
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const [validated, setValidated] = useState(false)

  async function handleSubmit(event) {
    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      await onSubmit(event, login, senha)
    }

    setValidated(true)
  }

  return (
    <Form
      className="login-form"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <Form.Group controlId="email">
        <Form.Control
          onChange={event => setLogin(event.target.value)}
          type="text"
          placeholder="Digite seu e-mail"
          className="input-form"
          required
        />
      </Form.Group>

      <Form.Group controlId="password" required>
        <Form.Control
          onChange={event => setSenha(event.target.value)}
          type="password"
          className="input-form"
          placeholder="Digite sua senha"
          required
        />
      </Form.Group>
      <Button className="login-button" variant="primary" type="submit">
        Entrar
      </Button>
      <Link className="login-form__register login-button" to="/login">
        Voltar para o login
      </Link>
    </Form>
  )
}
