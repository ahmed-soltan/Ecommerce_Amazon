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
  return redirect(`/vendor/${vendor.id}/profile`);
};

export default VendorPage;
