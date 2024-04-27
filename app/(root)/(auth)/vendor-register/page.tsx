import { getCurrentUser } from "@/actions/getCurrentUser"
import Container from "../../../../components/Container"
import FormWrap from "../../../../components/FormWrap"
import VendorRegisterForm from "./VendorRegisterForm"
import { redirect } from "next/navigation"

const VendorRegisterPage = async() => {
  const user = await getCurrentUser();
  if(!user){
    return redirect('/')
  }
  return (
    <div className="p-6">
        <Container>
                <VendorRegisterForm user={user!}/>
        </Container>
    </div>
  )
}

export default VendorRegisterPage