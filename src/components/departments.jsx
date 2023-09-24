import { useSelector } from "react-redux"
import { levelsFromAPI } from "../redux/features/levels/levelSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const Departments = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const showLevels = async (payload) => {
        dispatch(levelsFromAPI(payload))
        navigate("/levels");
    }

    const { departments } = useSelector(store => store.departments)

    return (
        <div className="grid grid-cols-2 gap-1 w-full ">
            {
                departments.map((department, index) => {
                    return (
                        <div onClick={() => showLevels({department_id: department.id})} key={index} className="h-24 border border-white text-xl font-semibold flex justify-center items-center bg-blue-400 text-white rounded-lg">
                            {department.alias}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Departments
