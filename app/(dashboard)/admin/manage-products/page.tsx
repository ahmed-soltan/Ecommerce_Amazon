import { getCurrentUser } from "@/actions/getCurrentUser"
import { DataTable } from "./_components/DataTable"
import { getVendor } from "@/actions/getVendor"
import { redirect } from "next/navigation"
import { columns } from "./_components/columns"
import prisma from '../../../../lib/prismadb'
const ManageProductsPage = async() => {
  const user = await getCurrentUser()
  if(!user){
    return redirect('/')
  }

  const products = await prisma?.products.findMany({
    orderBy:{
      createdAt: 'desc'
    }
  })

  return (
    <div className="p-6">
    <DataTable columns={columns} data={products}/>
  </div>
  )
}

export default ManageProductsPage