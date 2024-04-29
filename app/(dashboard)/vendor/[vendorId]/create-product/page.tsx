import { getCurrentUser } from "@/actions/getCurrentUser";
import { getVendor } from "@/actions/getVendor";
import { redirect } from "next/navigation";
import AddProductsForm from "./_components/AddProductsForm";
import { Separator } from "@/components/ui/separator";

const page = async ({params}:{params:{vendorId:string}}) => {
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
        <AddProductsForm vendorId={params.vendorId} />
    </div>
  );
};

export default page;
