import { useSelector } from "react-redux"
import { categoriesFromAPI } from "../redux/features/categories/categorySlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

const Categories = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { level_id } = useParams()
    const showBooks = async (payload) => {
        navigate(`/books/${payload}`);
    }
    const getcategories = async () => {
        if (level_id) {
            await dispatch(categoriesFromAPI(level_id))
        }
    }
    useEffect(() => {
        getcategories()
    }, [])

    const { categories } = useSelector(store => store.categories)

    return (
        <div className="grid grid-cols-2 gap-1 w-full lg:grid-cols-5">
            {
                categories.map(category => {
                    return (
                        <div key={category.id} onClick={() => { showBooks(category.id) }}
                            className="relative h-40 border border-white text-xl font-semibold p-2 flex flex-col justify-between items-center bg-blue-950 text-white rounded-lg">
                            <h3 className="font-semibold text-xl text-center">{category.alias}</h3>
                            <div className="w-full h-3/5 flex justify-center">
                                <img src={category.logo || ""} alt="" className="w-25 h-full bg-white rounded-[50%]" />
                            </div>
                            <h3 className="font-semibold text-sm text-center">{category.name.slice(0, 21) + "..."}</h3>
                            <div className="border border-white h-2/3 absolute left-2 top-6">
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Categories
