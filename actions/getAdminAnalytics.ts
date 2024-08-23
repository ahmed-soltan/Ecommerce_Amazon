import prisma from '../lib/prismadb'


export const groupByCourse = async(orders:any[])=>{
    const grouped : {[orderId: string]:number} = {}
    orders.forEach((order) =>{
        const courseTitle = order.id
        if(!grouped[courseTitle]){
            grouped[courseTitle] = 0
        }
        grouped[courseTitle] += order.amount!
    })
    return grouped
}
export const getAdminAnalytics = async(userId:string)=>{
   try {
        const orders = await prisma.order.findMany()


        const groupEarning = await groupByCourse(orders)
        const data = Object.entries(groupEarning).map(([orderId , total])=>({
            id:orderId,
            total:total
        }))

        const totalRevenue = data.reduce((acc , curr)=>acc+curr.total,0)
        const totalSales = orders.reduce((totalAmount, order) => (
            totalAmount + order.products.reduce((orderAmount, product) => (
              orderAmount +product.quantity
            ), 0)
          ), 0);

        return {
            data,
            totalRevenue,
            totalSales
        }

   } catch (error) {
        console.log("GET_ANALYTICS : " , error)
        return {
            data:[],
            totalRevenue:0,
            totalSales:0,
        }
   }
}