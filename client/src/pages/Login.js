import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import './LoginValidation'
import Validation from "./LoginValidation"


function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const handleInput = (event) => {
    setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
  }

  const navigate = useNavigate()

  const [errors, setErrors] = useState({})

  const handleSubmit = (event) => {
    event.preventDefault()
    setErrors(Validation(values))
  }

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Enter your Email" name="email"
            onChange={handleInput} className="form-control rounded-0"></input>
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter your Password" name="password"
            onChange={handleInput} className="form-control rounded-0"></input>
            {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>
          <button type="submit" className="btn btn-success w-100 mb-2">Login</button>
          <Link to={'/signup'} className="btn btn-default border w-100 bg-light text-decoration-none">Create an account</Link>
        </form>
      </div>
    </div>
  )
}

export default Login