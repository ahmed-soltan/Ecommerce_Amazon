import prisma from '../../../../lib/prismadb'
import { DataTable } from './_components/DataTable';
import { columns } from './_components/columns';
const ManageOrdersPage = async() => {
  const customers = await prisma.user.findMany({
    where:{
      role:'CUSTOMER'
    }
  });


    return (
    <div className='p-6'>
      <DataTable columns={columns} data={customers}/>
    </div>
  )
}

export default ManageOrdersPage