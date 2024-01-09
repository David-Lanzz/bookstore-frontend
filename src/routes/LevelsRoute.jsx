import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Levels from "../components/levels"
import { postNewLevel } from "../redux/features/levels/levelSlice"
import { levelsFromAPI } from "../redux/features/levels/levelSlice"
import { useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCancel } from "@fortawesome/free-solid-svg-icons"

const LevelsRoute = () => {
    const dispatch = useDispatch()
    const { department_id } = useParams()
    const [showPopup, changeState] = useState(false)
    const [inputs, changeInputs] = useState({
        number: 0,
        department_id: department_id
    })
    const handleInputs = (e) => {
        changeInputs({ ...inputs, [e.target.name]: e.target.value })
    }
    const submitNewLevel = async () => {
        dispatch(postNewLevel(inputs))
            .then(() => {
                dispatch(levelsFromAPI(department_id))
            })
        changeState(false)
    }
    const options = [100, 200, 300, 400, 500]
    const style = "w-full h-full flex flex-col items-center relative gap-2"


    return (
        <div className="min-h-[10rem] w-full">
            {showPopup ? <div className="w-[80%] border-2 border-gray-500 p-2 bg-white rounded-lg flex flex-col gap-2 max-w-[30rem] fixed z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-full relative">
                    <div className="absolute top-2 right-2">
                        <FontAwesomeIcon icon={faCancel} className="text-red-500" onClick={() => changeState(false)} />
                    </div>
                </div>
                <h2 className="text-xl text-black text-center">Add Level</h2>
                <select className="w-full h-10 p-3" placeholder="Enter level's number" type="text" name="number" onChange={handleInputs}>
                    {options.map((option) => {
                        return (
                            <option value={option} className="w-full h-10 p-3 rounded-lg bg-blue-950 text-gray-200 border-2">
                                {option}
                            </option>
                        )
                    })}
                </select>
                <button className="w-full h-10 bg-blue-300 flex justify-center items-center" onClick={submitNewLevel}>Add level</button>
            </div> : <div></div>}
            <div className={showPopup ? style + " blur-sm" : style} style={showPopup ? { pointerEvents: "none" } : { pointerEvents: "all" }}>
                <p className="text-center text-xl font-semibold">Available Levels</p>
                <div className="absolute top-2 right-2 h-content">
                    <button className="bg-blue-400 px-2 rounded-lg text-white" onClick={() => changeState(!showPopup)}>+</button>
                </div>
                <Levels />
            </div>
        </div>
    )
}

export default LevelsRoute
