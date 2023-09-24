import { useState,useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Levels from "../components/levels"
import { postNewLevel } from "../redux/features/levels/levelSlice"
import { levelsFromAPI } from "../redux/features/levels/levelSlice"

const LevelsRoute = () => {
    const dispatch = useDispatch()
    const department = useSelector(store => store.levels.department)
    console.log(department)
    const id = department.id

    const [inputs, changeInputs] = useState({
        number: 0,
        department_id: id
    })
    useEffect(()=> {
        changeInputs({...inputs, department_id: id,number: parseInt(inputs.number)})
    },[id])
    const handleInputs = (e) => {
        changeInputs({ ...inputs, [e.target.name]: e.target.value })
        console.log(inputs)
    }
    const submitNewLevel = async () => {
        dispatch(postNewLevel(inputs))
        .then(()=> {
            dispatch(levelsFromAPI({department_id: inputs.department_id}))
        })
    }
    const [showPopup, changeState] = useState(false)

    return (
        <div className="min-h-[10rem] w-full">
            <p className="text-center">Levels</p>
            <h2 className="text-center" onClick={() => changeState(!showPopup)}>Add level</h2>
            {showPopup ? <div className="w-full flex flex-col gap-2">
                <input className="w-full h-10 p-3" placeholder="Enter level's number" type="text" name="number" onChange={handleInputs} />
                <button className="w-full h-10 bg-blue-300 flex justify-center items-center" onClick={submitNewLevel}>Add level</button>
            </div> : <div></div>}
            <Levels />
        </div>
    )
}

export default LevelsRoute
