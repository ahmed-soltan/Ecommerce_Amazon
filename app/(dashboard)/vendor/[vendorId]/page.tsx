import { getCurrentUser } from "@/actions/getCurrentUser"
import { getVendor } from "@/actions/getVendor";
import { redirect } from "next/navigation";

const VendorPage = async() => {
  const user = await getCurrentUser();
  if(!user){
    return redirect('/')
  }
  const vendor = await getVendor(user.id)
  return (
    <div>VendorPage</div>
  )
}

export default VendorPage