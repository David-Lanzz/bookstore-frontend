import { useState } from "react"
import { useDispatch } from "react-redux"
import Schools from "../components/schools"
import { postNewSchool } from "../redux/features/schools/schoolSlice"
import { schoolsFromAPI } from "../redux/features/schools/schoolSlice"

const SchoolsRoute = () => {
    const dispatch = useDispatch()
    const [inputs, changeInputs] = useState({
        name: "",
        alias: "",
        location: "",
        logo: ""
    })
    const handleInputs = (e) => {
        changeInputs({ ...inputs, [e.target.name]: e.target.value })
        console.log(inputs)
    }
    const submitNewSchool = async () => {
        dispatch(postNewSchool(inputs))
        dispatch(schoolsFromAPI())
    }
    const [showPopup, changeState] = useState(false)

    return (
        <div className="min-h-[10rem] w-full">
            <p className="text-center">Schools</p>
            <h2 className="text-center" onClick={() => changeState(!showPopup)}>Add School</h2>
           { showPopup? <div className="w-full flex flex-col gap-2">
                <input className="w-full h-10 p-3" placeholder="Enter school's name" type="text" name="name" onChange={handleInputs} />
                <input className="w-full h-10 p-3" placeholder="Enter school's alias" type="text" name="alias" onChange={handleInputs} />
                <input className="w-full h-10 p-3" placeholder="Enter school's location" type="text" name="location" onChange={handleInputs} />
                <input className="w-full h-10 p-3" placeholder="Enter school's image link" type="text" name="logo" onChange={handleInputs} />
                <button className="w-full h-10 bg-blue-300 flex justify-center items-center" onClick={submitNewSchool}>Add School</button>
            </div> : <div></div>}
            <Schools />
        </div>
    )
}

export default SchoolsRoute
