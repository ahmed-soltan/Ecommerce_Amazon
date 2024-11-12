import { redirect } from "next/navigation";

import { getCurrentUser } from "@/actions/getCurrentUser";
import { getVendor } from "@/actions/getVendor";

import AddCategoryForm from "./_components/AddCategoryForm";

const page = async ({ params }: { params: { vendorId: string } }) => {
  const user = await getCurrentUser();
  if (!user) {
    return redirect("/");
  }
  const vendor = await getVendor(user.id);
  if (!vendor) {
    return null;
  }
  return (
    <div>
      <AddCategoryForm vendorId={params.vendorId} />
    </div>
  );
};

export default page;
