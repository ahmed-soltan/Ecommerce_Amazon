import prisma from '../../../../../lib/prismadb'
import { DataTable } from './_components/DataTable';
import { columns } from './_components/columns';
const ManageOrdersPage = async({params}:{params:{vendorId:string}}) => {
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

  console.log(filteredOrdersWithVendorProducts)
    return (
    <div className='p-6'>
      <DataTable columns={columns} data={filteredOrdersWithVendorProducts} vendorId={params.vendorId}/>
    </div>
  )
}

export default ManageOrdersPage