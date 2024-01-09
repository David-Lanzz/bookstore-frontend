import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Categories from "../components/categories"
import { useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCancel } from "@fortawesome/free-solid-svg-icons"
import { categoriesFromAPI, postNewCategory } from "../redux/features/categories/categorySlice"

const CategoriesRoute = () => {
    const dispatch = useDispatch()
    const { level_id } = useParams()
    const [showPopup, changeState] = useState(false)
    const [inputs, changeInputs] = useState({
        name: "",
        alias: "",
        logo: "",
        level_id: level_id
    })
    const handleInputs = (e) => {
        changeInputs({ ...inputs, [e.target.name]: e.target.value })
        console.log(inputs)
    }
    const submitNewCategory = async () => {
        dispatch(postNewCategory(inputs))
            .then(() => {
                dispatch(categoriesFromAPI(level_id))
            })
        changeState(false)
    }
    const style = "w-full h-full flex flex-col items-center relative gap-2"

    return (
        <div className="min-h-[10rem] w-full pt-2">
            {showPopup ? <div className="w-[80%] border-2 bordper-gray-500 p-2 bg-white rounded-lg flex flex-col gap-2 max-w-[30rem] fixed z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-full relative">
                    <div className="absolute top-2 right-2">
                        <FontAwesomeIcon icon={faCancel} className="text-red-500" onClick={() => changeState(false)} />
                    </div>
                </div>
                <h2 className="text-xl text-black text-center">Add Category</h2>
                <div className="flex flex-col w-full gap-2">
                    <input className="w-full h-10 p-3 rounded-lg bg-blue-950 text-gray-200 border-2" placeholder="Enter Category's name" type="text" name="name" onChange={handleInputs} />
                    <input className="w-full h-10 p-3 rounded-lg bg-blue-950 text-gray-200 border-2" placeholder="Enter Category's alias" type="text" name="alias" onChange={handleInputs} />
                    <input className="w-full h-10 p-3 rounded-lg bg-blue-950 text-gray-200 border-2" placeholder="Enter Category's image link" type="text" name="logo" onChange={handleInputs} />
                </div>
                <div className="flex justify-center items-center">
                    <button className="w-full max-w-[10rem] rounded-lg h-10 bg-blue-300 flex justify-center items-center" onClick={submitNewCategory}>Add Category</button>
                </div>
            </div> : <div></div>}
            <div className={showPopup ? style + " blur-sm" : style} style={showPopup ? { pointerEvents: "none" } : { pointerEvents: "all" }}>
                <p className="text-center text-xl font-semibold">Available Categories</p>
                <div className="absolute top-2 right-2 h-content">
                    <button className="bg-blue-400 px-2 rounded-lg text-white" onClick={() => changeState(!showPopup)}>+</button>
                </div>
                <Categories />
            </div>
        </div>
    )
}

export default CategoriesRoute
