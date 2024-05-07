import { getCurrentProfile } from "@/actions/getCurrentProfile"
import { getProfileById } from "@/actions/getProfileById"
import ProfileDetails from "./_components/ProfileDetails"

const page = async({params}:{params:{customerId:string , profileId:string}}) => {
    const profile = await getProfileById(params.profileId)
  return (
    <div className="p-6">
      {/*@ts-ignore*/}

        <ProfileDetails profile={profile!}/>
    </div>
  )
}

export default page