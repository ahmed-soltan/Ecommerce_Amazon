import { redirect } from "next/navigation";

import { getCurrentUser } from "@/actions/getCurrentUser";
import { getVendor } from "@/actions/getVendor";

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
