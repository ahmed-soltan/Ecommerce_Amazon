import { redirect } from 'next/navigation';
import prisma from '../../../../../../lib/prismadb'
import OrderContainerDetails from './_components/OrderContainerDetails';
const page = async({params}:{params:{vendorId:string , orderId:string}}) => {
    const order = await prisma.order.findUnique({
        where: {
          id:params.orderId
        }
      });

      if(!order){
        return redirect(`/vendor/${params.vendorId}/manage-orders`)
      }
     
        const products= order.products.filter(product => product.vendorId === params.vendorId)
        
  return (
    <div className='p-6'>
        <OrderContainerDetails order={order} products={products} vendorId={params.vendorId}/>
    </div>
  )
}

export default page