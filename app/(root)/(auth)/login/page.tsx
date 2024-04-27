import Container from "../../../../components/Container"
import FormWrap from "../../../../components/FormWrap"
import LoginForm from "./LoginForm"

const LoginPage = () => {
  return (
    <div className="p-6">
        <Container>
            <FormWrap>
                <LoginForm/>
            </FormWrap>
        </Container>
    </div>
  )
}

export default LoginPage