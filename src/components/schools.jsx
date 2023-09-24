import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { schoolsFromAPI } from "../redux/features/schools/schoolSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { departmentsFromAPI } from "../redux/features/departments/departmentSlice"

const Schools = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(schoolsFromAPI())
  }, [])
  const { schools } = useSelector(store => store.schools)
  const showDepartments = async (payload) => {
    dispatch(departmentsFromAPI(payload))
    navigate("/departments");
  }

  return (
    <div className="grid grid-cols-2 gap-1 w-full ">
      {
        schools.map(school => {
          return (
            <div key={school.id} onClick={() => { showDepartments({ school_id: school.id }) }} className="h-24 border border-white text-xl font-semibold flex justify-center items-center bg-blue-400 text-white rounded-lg">
              {school.alias}
            </div>
          )
        })
      }
    </div>
  )
}

export default Schools
