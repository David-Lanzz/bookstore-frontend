import { useSelector } from "react-redux"
import { levelsFromAPI } from "../redux/features/levels/levelSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import fresher from "../assets/Images/freshers.jpg"
import staylite from "../assets/Images/staylites.jpg"
import finalist from "../assets/Images/finalists.jpg"

const Levels = () => {
    const dispatch = useDispatch()
    const { department_id } = useParams()
    const getLevels = async () => {
        await dispatch(levelsFromAPI(department_id))
    }
    const navigate = useNavigate()
    const showCategories = async (payload) => {
        navigate(`/categories/${payload}`);
    }
    useEffect(() => {
        if (department_id) {
            getLevels()
        }
    }, [])
    const { levels } = useSelector(store => store.levels)

    return (
        <div className="w-full">
            {levels.length > 0 ? <div className="grid grid-cols-2 gap-1 w-full pt-2"> {
                levels.map((level, index) => {
                    return (
                        <div key={level.id}
                        onClick={()=> showCategories(level.id)}
                            className="relative h-40 border border-white text-xl font-semibold p-2 flex flex-col justify-between items-center bg-blue-950 text-white rounded-lg">
                            <h3 className="font-semibold text-xl text-center">{level.number}</h3>
                            <div className="w-full h-3/5 flex justify-center">
                                <img src={level.number < 200 ? fresher : level.number > 400 ? finalist : staylite} alt="" className="w-25 h-full bg-white rounded-[50%]" />
                            </div>
                            <h3 className="font-semibold text-sm text-center">{level.number < 200 ? "Fresh Students" : level.number > 400 ? "Finalists" : "Staylites"}</h3>
                            <div className="border border-white h-2/3 absolute left-2 top-6">
                            </div>
                        </div>
                    )
                })
            }
            </div> : <div className="flex justify-center items-center">
                {/* <h3 className="text-xl text-center font-semibold">No Levels Available for this Department</h3> */}
                </div>}
        </div>
    )
}

export default Levels
