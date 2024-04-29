import Container from "../../../../components/Container"
import FormWrap from "../../../../components/FormWrap"
import RegisterForm from "./RegisterForm"

const RegisterPage = () => {
  return (
    <div>
        <Container>
            <FormWrap>
                <RegisterForm/>
            </FormWrap>
        </Container>
    </div>
  )
}

export default RegisterPage