import { useNavigate } from "react-router-dom"

const NotFound = () => {
  const navigate = useNavigate()
  // setTimeout(()=> {
  //   navigate("/")
  // },4000)
  return (
    <div className="flex h-screen w-screen justify-center items-center text-blue-400">
        The page you have requested does not exist... <br />
        You will be redirected to the main page of the project in 4s
    </div>
  )
}

export default NotFound
