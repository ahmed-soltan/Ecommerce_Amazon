import { getCurrentUser } from "@/actions/getCurrentUser"
import Container from "../../../../components/Container"
import FormWrap from "../../../../components/FormWrap"
import LoginForm from "./LoginForm"
import { redirect } from "next/navigation"

const LoginPage = async() => {
  const user = await getCurrentUser();
  if(user){
    return redirect('/')
  }
  return (
    <div>
        <Container>
            <FormWrap>
                <LoginForm/>
            </FormWrap>
        </Container>
    </div>
  )
}

export default LoginPage