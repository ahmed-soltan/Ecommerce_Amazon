import { getCurrentUser } from "@/actions/getCurrentUser"
import { DataTable } from "./_components/DataTable"
import { getVendor } from "@/actions/getVendor"
import { redirect } from "next/navigation"
import { columns } from "./_components/columns"

const ManageProductsPage = async() => {
  const user = await getCurrentUser()
  if(!user){
    return redirect('/')
  }
  const vendor = await getVendor(user.id)
  if(!vendor){
    return null
  }
  return (
    <div className="p-6">
    <DataTable columns={columns} data={vendor.Products} vendorId={vendor.id}/>
  </div>
  )
}

export default ManageProductsPage