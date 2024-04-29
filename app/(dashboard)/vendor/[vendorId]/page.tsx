import { getCurrentUser } from "@/actions/getCurrentUser";
import { getVendor } from "@/actions/getVendor";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import BusinessInformation from "./_components/BusinessInformation";
import SellerInformation from "./_components/SellerInformation";
import StoreInformation from "./_components/StoreInformation";

const VendorPage = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return redirect("/");
  }
  const vendor = await getVendor(user.id);

  if (!vendor) {
    return redirect("/");
  }
  return (
    <div className="flex flex-col items-start gap-4 mt-5 p-4">
      <h1 className="text-3xl text-slate-800 font-medium">Vendor Profile</h1>
      <Separator />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        <BusinessInformation vendor={vendor} />
        <SellerInformation vendor={vendor} />
        <StoreInformation vendor={vendor} />
      </div>
    </div>
  );
};

export default VendorPage;
