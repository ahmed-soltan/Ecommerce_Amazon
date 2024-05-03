import { redirect } from "next/navigation"
import DataCard from "./_components/DataCard"
import Chart from "./_components/Chart"
import { getCurrentUser } from "@/actions/getCurrentUser"
import { getAdminAnalytics } from "@/actions/getAdminAnalytics"
import { LineAnalytics } from "./_components/Line"
import prisma from '../../../../lib/prismadb'
const AnalyticsPage = async() => {
  const user = await getCurrentUser()
  if(!user || user.role!=="ADMIN"){
      return redirect('/')
  }
  const {
    data,
    totalRevenue,
    totalSales
  } = await getAdminAnalytics(user.id)

  const products= await prisma.products.findMany()
  const users= await prisma.user.findMany()
  const vendors = await prisma?.vendor.findMany()

  const usersLength = users.length
  const productsLength = products.length
  const vendorsLength = vendors.length
  return (
    <div className="p-6">
      <div className="flex items-center flex-wrap gap-4 my-5">
        <DataCard 
          label={"Total Revenue"}
          value={totalRevenue}
          shouldFormat
        />
        <DataCard 
          label={"Total Sales"}
          value={totalSales}
        />
        <DataCard 
          label={"Total Users"}
          value={usersLength}
        />
        <DataCard 
          label={"Total Vendors"}
          value={vendorsLength}
        />
        <DataCard 
          label={"Total Products"}
          value={productsLength}
        />
      </div>
      <Chart data={data}/>
    </div>
  )
}

export default AnalyticsPage