import Container from "../../../../components/Container"
import FormWrap from "../../../../components/FormWrap"
import ConfirmUserForm from "./ConfirmUserForm"

const LoginPage = () => {
  return (
    <div>
        <Container>
            <FormWrap>
                <ConfirmUserForm/>
            </FormWrap>
        </Container>
    </div>
  )
}

export default LoginPage