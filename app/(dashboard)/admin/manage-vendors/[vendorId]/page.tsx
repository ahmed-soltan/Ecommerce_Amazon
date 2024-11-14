import { getVendorById } from "@/actions/getVendorById";
import VendorDetails from "./_components/VendorDetails";

interface PageProps {
  params: { vendorId: string };
}

const page = async ({ params }: PageProps) => {
  const vendor = await getVendorById(params.vendorId);
  return (
    <div className="p-6">
      <VendorDetails vendor={vendor!} />
    </div>
  );
};

export default page;
