import { redirect } from "next/navigation"
import DataCard from "./_components/DataCard"
import Chart from "./_components/Chart"
import { getCurrentUser } from "@/actions/getCurrentUser"
import { getAdminAnalytics } from "@/actions/getAdminAnalytics"
import { LineAnalytics } from "./_components/Line"
import prisma from '../../../../../lib/prismadb'
const AnalyticsPage = async({params}:{params:{vendorId:string}}) => {
  const user = await getCurrentUser()
  if(!user){
      return redirect('/')
  }
  const products = await prisma.products.findMany({
    where:{
      vendorId:params.vendorId
    }
  })

  const ordersWithVendorProducts = await prisma.order.findMany({
    where: {
      products: {
        some: {
          vendorId: params.vendorId
        }
      }
    }
  });
  const filteredOrdersWithVendorProducts = ordersWithVendorProducts.map(order => ({
    ...order,
    products: order.products.filter(product => product.vendorId === params.vendorId)
  }));

  const amount = filteredOrdersWithVendorProducts.reduce((totalAmount, order) => (
    totalAmount + order.products.reduce((orderAmount, product) => (
      orderAmount + product.priceAfterDiscount * product.quantity
    ), 0)
  ), 0);
  const sales = filteredOrdersWithVendorProducts.reduce((totalAmount, order) => (
    totalAmount + order.products.reduce((orderAmount, product) => (
      orderAmount +product.quantity
    ), 0)
  ), 0);

  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center gap-4 mb-4 ">
        <DataCard 
          label={"Total Revenue"}
          value={amount}
          shouldFormat
        />
        <DataCard 
          label={"Total Sales"}
          value={sales}
        />
        <DataCard 
          label={"Total Products"}
          value={products.length}
        />
      </div>
      <Chart data={ordersWithVendorProducts}/>
      <LineAnalytics />
    </div>
  )
}

export default AnalyticsPage