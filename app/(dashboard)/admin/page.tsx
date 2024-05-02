import { getCurrentUser } from "@/actions/getCurrentUser"
import { redirect } from "next/navigation"

const AdminPage = async() => {
    const user = await getCurrentUser()
    if(!user || user.role!=="ADMIN"){
        return redirect('/')
    }
    return redirect('/admin/analytics')
}

export default AdminPage