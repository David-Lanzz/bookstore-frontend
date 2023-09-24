import { useState } from 'react'
import { createUser } from '../redux/features/authentication/authenticationSlice'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Signup = () => {
    const dispatch = useDispatch()
    const [inputs, changeInputs] = useState({ email: "", password: "", password_confirmation: "" })
    const handleInputChange = (e) => {
        const target = e.target.name
        changeInputs({ ...inputs, [target]: e.target.value })
    }
    const handleSubmit = async()=> {
       dispatch(createUser(inputs))
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
                <label className='w-5/6'>
                    <h3>Confirm your password:</h3>
                    <input className='w-full h-10 p-2 border border-blue-400 rounded' type="password" name="password_confirmation" placeholder='password123#' defaultValue={inputs.password_confirmation} onChange={handleInputChange} />
                </label>
                <button onClick={handleSubmit} className=' h-8 rounded border-blue-200 bg-blue-400 text-white p-3 flex justify-center items-center'>Submit</button>
            </section>
            <p>Have an existing account? <NavLink className="text-blue-400" to="/login">Login</NavLink> instead</p>
        </section>
    )
}

export default Signup
