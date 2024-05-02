import { redirect } from 'next/navigation';
import prisma from '../../../../../lib/prismadb'
import OrderContainerDetails from './_components/OrderContainerDetails';
const page = async({params}:{params:{ orderId:string}}) => {
    const order = await prisma.order.findUnique({
        where: {
          id:params.orderId
        }
      });

      if(!order){
        return redirect(`/admin/manage-orders`)
      }
     
        
  return (
    <div className='p-6'>
        <OrderContainerDetails order={order} products={order.products}/>
    </div>
  )
}

export default page