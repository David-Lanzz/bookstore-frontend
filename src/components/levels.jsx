import { useSelector } from "react-redux"
import { levelsFromAPI } from "../redux/features/levels/levelSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const Levels = () => {
    const dispatch = useDispatch()

    const { levels } = useSelector(store => store.levels)

    return (
        <div className="grid grid-cols-2 gap-1 w-full pt-2">
            {
                levels.map((level, index) => {
                    return (
                        <div key={index} className="h-24 border border-white text-xl font-semibold flex justify-center items-center bg-blue-400 text-white rounded-lg">
                            {level.number}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Levels
