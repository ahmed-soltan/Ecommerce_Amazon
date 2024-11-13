import { redirect } from "next/navigation";

import { getCurrentUser } from "@/actions/getCurrentUser";
import { getVendor } from "@/actions/getVendor";

import { DataTable } from "./_components/DataTable";
import { columns } from "./_components/columns";
import { getCategoriesByVendorId } from "@/actions/getCategoryByVendorId";

const ManageCategoriesPage = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return redirect("/");
  }

  const vendor = await getVendor(user.id);

  if (!vendor) {
    return null;
  }

  const vendorCategories = await getCategoriesByVendorId(vendor.id)

  return (
    <div className="p-6">
      <DataTable
        columns={columns}
        /*@ts-ignore*/
        data={vendorCategories!}
        vendorId={vendor.id}
      />
    </div>
  );
};

export default ManageCategoriesPage;
