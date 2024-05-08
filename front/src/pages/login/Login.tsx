import FormLogin from "../../components/formLogin/FormLogin"
import "./login.scss"
import { Toaster } from 'react-hot-toast'

const Login = () => {
  return (
    <div className="login">
        <Toaster/>
        <FormLogin/>
    </div>
  )
}

export default Login