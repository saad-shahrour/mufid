import MoreInfo from "@/components/MoreInfoForm/MoreInfoForm"
import { getServerSession } from "next-auth"
import { options } from "../../api/auth/[...nextauth]/options"
import User from "../../models/User"
import { redirect } from "next/navigation"


async function moreinfo() {
     
     const session = await getServerSession(options)

     const existingUser = await User.findOne({ email: session?.user?.email }).lean().exec();


     // if user is signed in before (in the databse)
     if (existingUser !== null) {
          console.log("final data", existingUser);
          ////// server component redirection to another component
          redirect("/", "replace")
     }
     
     // if user is not signed in, don't let him access this page at all
     if (!session) {
          ////// server component redirection to another component
          redirect("/", "replace")
     }

     
  return (
       <div>
            <MoreInfo/>
       </div>  
  )
}

export default moreinfo