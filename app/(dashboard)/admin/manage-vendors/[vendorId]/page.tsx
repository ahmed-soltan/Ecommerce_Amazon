import { getCustomerById } from "@/actions/getUserById";
import { getVendorById } from "@/actions/getVendorById";
import VendorDetails from "./_components/VendorDetails";

const page = async ({ params }: { params: { vendorId: string } }) => {
  const vendor = await getVendorById(params.vendorId);
  return (
    <div className="p-6">
      <VendorDetails vendor={vendor!} />
    </div>
  );
};

export default page;
