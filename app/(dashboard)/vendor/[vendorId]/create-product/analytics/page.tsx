import { redirect } from "next/navigation"
import DataCard from "./_components/DataCard"
import Chart from "./_components/Chart"
import { getCurrentUser } from "@/actions/getCurrentUser"
import { getAdminAnalytics } from "@/actions/getAdminAnalytics"
import { LineAnalytics } from "./_components/Line"

const AnalyticsPage = async() => {
  const user = await getCurrentUser()
  if(!user){
      return redirect('/')
  }
  const {
    data,
    totalRevenue,
    totalSales
  } = await getAdminAnalytics(user.id)

  console.log(data)

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 ">
        <DataCard 
          label={"Total Revenue"}
          value={totalRevenue}
          shouldFormat
        />
        <DataCard 
          label={"Total Sales"}
          value={totalSales}
        />
      </div>
      <Chart data={data}/>
      <LineAnalytics />
    </div>
  )
}

export default AnalyticsPage