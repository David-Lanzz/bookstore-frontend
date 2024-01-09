import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { schoolsFromAPI } from "../redux/features/schools/schoolSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const Schools = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(schoolsFromAPI())
  }, [])
  const { schools } = useSelector(store => store.schools)
  const showDepartments = async (payload) => {
    navigate(`/departments/${payload}`);
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-1 w-full ">
      {
        schools.map(school => {
          return (
            <div key={school.id} onClick={() => { showDepartments(school.id) }}
              className= "relative h-40 border items cursor-pointer border-white text-xl font-semibold p-2 flex flex-col justify-between items-center bg-blue-950 text-white rounded-lg">
              <h3 className="font-semibold text-xl text-center">{school.alias}</h3>
              <div className="w-full h-3/5 flex justify-center">
                <img src={school.logo} alt="" className="w-25 h-full bg-white rounded-[50%]" />
              </div>
              <h3 className="font-semibold text-sm text-center">{school.name.slice(0, 20) + "..."}</h3>
              <div className="border border-white h-2/3 absolute left-2 top-6">

              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Schools
