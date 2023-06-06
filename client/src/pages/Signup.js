import React, {useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import Validation from "./SignupValidation"
import {useHttp} from "../hooks/http.hook"

function Signup() {
  const {loading, request} = useHttp()
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleInput = (event) => {
    setValues({...values, [event.target.name]: [event.target.value]})
  }

  const registerHandler = async () => {
    try {
      const data = await request('/signup', 'POST', {...values})
      console.log('Data', data)
    } catch(e) {}
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
        <h2>Sign up</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input type="text" placeholder="Enter your Name" name="name"
            onChange={handleInput} className="form-control rounded-0"></input>
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
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
          <button type="submit" className="btn btn-success w-100 mb-2" onClick={registerHandler} disabled={loading}>Sing up</button>
          <Link to={'/'} className="btn btn-default border w-100 bg-light text-decoration-none">Login</Link>
        </form>
      </div>
    </div>
  )
}

export default Signup