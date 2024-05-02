import prisma from '../../../../lib/prismadb'
import { DataTable } from './_components/DataTable';
import { columns } from './_components/columns';
const ManageOrdersPage = async() => {
  const orders = await prisma.order.findMany({
    orderBy:{
      createdAt: 'desc'
    }
  });


    return (
    <div className='p-6'>
      <DataTable columns={columns} data={orders}/>
    </div>
  )
}

export default ManageOrdersPage