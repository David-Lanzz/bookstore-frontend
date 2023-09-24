import { loginUser } from "../redux/features/authentication/authenticationSlice"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { NavLink } from "react-router-dom"

const Login = () => {
    const dispatch = useDispatch()
    const [inputs, changeInputs] = useState({ email: "", password: "" })
    const handleInputChange = (e) => {
        const target = e.target.name
        changeInputs({ ...inputs, [target]: e.target.value })
    }
    const handleSubmit = () => {
        dispatch(loginUser(inputs))
    }

    return (
        <section className='flex flex-col h-screen w-full items-center justify-center'>
            <h1 className='text-xl lg:text-3xl font-bold pb-8'>Welcome to Lanzz's Bookstore</h1>
            <section className="inputs flex flex-col w-full items-center gap-4">
                <label className='w-5/6'>
                    <h3>Enter your Email:</h3>
                    <input className='w-full h-10 p-2 border border-blue-400 rounded' type="text" name="email" placeholder='email@example.com' defaultValue={inputs.email} onChange={handleInputChange} />
                </label>
                <label className='w-5/6'>
                    <h3>Enter your Password:</h3>
                    <input className='w-full h-10 p-2 border border-blue-400 rounded' type="password" name="password" placeholder='password123#' defaultValue={inputs.password} onChange={handleInputChange} />
                </label>
                <button onClick={handleSubmit} className=' h-8 rounded border-blue-200 bg-blue-400 text-white p-3 flex justify-center items-center'>Submit</button>
            </section>
            <p>Don't have an account? <NavLink className="text-blue-400" to="/sign_up">Sign Up</NavLink> instead</p>
        </section>
    )
}

export default Login
