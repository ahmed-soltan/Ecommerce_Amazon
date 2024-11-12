import { redirect } from "next/navigation";

import { getCategoryById } from "@/actions/getCategoryById";
import CategoryContainer from "./_components/CategoryContainer";

const page = async ({
  params,
}: {
  params: { vendorId: string; categoryId: string };
}) => {
  const category = await getCategoryById(params.categoryId, params.vendorId);
  if (!category) {
    return redirect(`/vendor/${params.vendorId}/manage-categories`);
  }

  return (
    <CategoryContainer
      category={category}
      vendorId={params.vendorId}
      categoryId={params.categoryId}
    />
  );
};

export default page;
