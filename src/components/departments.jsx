import { useSelector } from "react-redux"
import { departmentsFromAPI } from "../redux/features/departments/departmentSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

const Departments = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { school_id } = useParams()
    const showLevels = async (payload) => {
        navigate(`/levels/${payload}`);
    }
    const getDepartments = async () => {
        if (school_id) {
            await dispatch(departmentsFromAPI(school_id))
        }
    }
    useEffect(() => {
        getDepartments()
    }, [])

    const { departments } = useSelector(store => store.departments)

    return (
        <div className="grid grid-cols-2 gap-1 w-full lg:grid-cols-5">
      {
        departments.map(department => {
          return (
            <div key={department.id} onClick={() => { showLevels(department.id) }}
              className="relative h-40 border border-white text-xl font-semibold p-2 flex flex-col justify-between items-center bg-blue-950 text-white rounded-lg">
              <h3 className="font-semibold text-xl text-center">{department.alias}</h3>
              <div className="w-full h-3/5 flex justify-center">
                <img src={department.logo || ""} alt="" className="w-25 h-full bg-white rounded-[50%]" />
              </div>
              <h3 className="font-semibold text-sm text-center">{department.name.slice(0, 21) + "..."}</h3>
              <div className="border border-white h-2/3 absolute left-2 top-6">

              </div>
            </div>
          )
        })
      }
    </div>
    )
}

export default Departments
