import { useState,useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Departments from "../components/departments"
import { postNewDepartment } from "../redux/features/departments/departmentSlice"
import { departmentsFromAPI } from "../redux/features/departments/departmentSlice"

const DepartmentsRoute = () => {
    const dispatch = useDispatch()
    const school = useSelector(store => store.departments.school)
    const id = school.id

    const [inputs, changeInputs] = useState({
        name: "",
        alias: "",
        school_id: id
    })
    useEffect(()=> {
        changeInputs({...inputs, school_id: id})
    },[id])
    const handleInputs = (e) => {
        changeInputs({ ...inputs, [e.target.name]: e.target.value })
        console.log(inputs)
    }
    const submitNewdepartment = async () => {
        dispatch(postNewDepartment(inputs))
        .then(()=> {
            dispatch(departmentsFromAPI({school_id: inputs.school_id}))
        })
    }
    const [showPopup, changeState] = useState(false)

    return (
        <div className="min-h-[10rem] w-full">
            <p className="text-center">departments</p>
            <h2 className="text-center" onClick={() => changeState(!showPopup)}>Add department</h2>
            {showPopup ? <div className="w-full flex flex-col gap-2">
                <input className="w-full h-10 p-3" placeholder="Enter department's name" type="text" name="name" onChange={handleInputs} />
                <input className="w-full h-10 p-3" placeholder="Enter department's alias" type="text" name="alias" onChange={handleInputs} />
                <button className="w-full h-10 bg-blue-300 flex justify-center items-center" onClick={submitNewdepartment}>Add department</button>
            </div> : <div></div>}
            <Departments />
        </div>
    )
}

export default DepartmentsRoute
