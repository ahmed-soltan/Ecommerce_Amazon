import { getCustomerById } from "@/actions/getUserById";
import CustomerDetails from "./_components/CustomerDetails";

const page = async ({ params }: { params: { customerId: string } }) => {
  const customer = await getCustomerById(params.customerId);
  return (
    <div className="p-6">
      <CustomerDetails customer={customer!} />
    </div>
  );
};

export default page;
