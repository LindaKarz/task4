import React, {useContext, useEffect, useState} from "react"
import { useHttp} from "../hooks/http.hook"
import {useMessage} from '../hooks/message.hook'
import 'materialize-css'
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { AuthContext } from "../context/AuthContext"

export function AuthPage() {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })

  useEffect(() => {
  if (error !== null) {toast.error(`${error}`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    })
  }
    clearError()
  }, [error, clearError])

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login or Signup</h2>
        
        <div className="input-field mb-3">
          <label htmlFor="name">Name</label>
          <input
            placeholder="Enter your name"
            id="name"
            type="text"
            name="name"
            className="form-control rounded-0"
            value={form.name}
            onChange={changeHandler}
          />
        </div>

        <div className="input-field mb-3">
          <label htmlFor="email">Email</label>
          <input
            placeholder="Enter your email"
            id="email"
            type="text"
            name="email"
            className="form-control rounded-0"
            value={form.email}
            onChange={changeHandler}
          />
        </div>
          
        <div className="input-field mb-3">
          <label htmlFor="password">Password</label>
          <input
            placeholder="Enter your password"
            id="password"
            type="password"
            name="password"
            className="form-control rounded-0"
            value={form.password}
            onChange={changeHandler}
          />
        </div>
          
        <button 
          type="submit" 
          className="btn btn-success w-100 mb-2"
          disabled={loading}
          onClick={loginHandler}>
          Login
        </button>
        <button 
          type="submit" 
          className="btn btn-success w-100 mb-2"
          onClick={registerHandler}
          disabled={loading}>
          Sing up
        </button>
       <ToastContainer />
      </div>
    </div>
  )
}