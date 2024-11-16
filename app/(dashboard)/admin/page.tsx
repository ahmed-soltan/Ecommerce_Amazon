import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/actions/getCurrentUser";

const AdminPage = async () => {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return redirect("/");
  } else {
    redirect("/admin/analytics");
  }

  return (
    <div className="h-full flex items-center justify-center">
      <Loader2 className="w-6 h-6 animate-spin" />
    </div>
  );
};

export default AdminPage;
