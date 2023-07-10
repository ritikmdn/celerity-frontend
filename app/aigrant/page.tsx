import Editor from "@/ui/aigrant/editor";
import Sensechecker from "@/ui/aigrant/sensecheck";
import Sidebar from "@/ui/aigrant/sidebar";
// import LogoutButton from '@/ui/logout'
// import {
//   // createServerActionClient,
//   createServerComponentClient,
// } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'
// import { redirect } from 'next/navigation'
// import Link from 'next/link'

export default async function Page() {
  // const supabase = createServerComponentClient({ cookies })

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser()

  // if (!user) {
  //   // This route can only be accessed by authenticated users.
  //   // Unauthenticated users will be redirected to the `/login` route.
  //   redirect('/login')
  // }

  // const signOut = async () => {
  //   'use server'
  //   const supabase = createServerActionClient({ cookies })
  //   await supabase.auth.signOut()
  //   redirect('/login')
  // }

//   return (
//     <div className="flex min-h-screen flex-row items-start justify-between sm:px-[2%] sm:py-[2%]">
//       {/* <div>
//             {user ? (
//               <div className="flex items-center gap-4">
//                 Hey, {user.email}!
//                 <LogoutButton />
//               </div>
//             ) : (
//               <Link
//                 href="/login"
//                 className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
//               >
//                 Login
//               </Link>
//             )}
//         </div> */}
//       <Sidebar />
//       <Editor />
//       <Sensechecker />
//     </div>
//   );
// }

  return (
    <div className="flex flex-col min-h-screen sm:px-[2%] sm:py-[2%]">
      {/* <div className="flex justify-end">
        {user ? (
          <div className="flex items-center gap-4">
            Hey, {user.email}!
            <LogoutButton />
          </div>
        ) : (
          <Link
            href="/login"
            className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
          >
            Login
          </Link>
        )}
      </div> */}
      <div className="flex flex-row items-start justify-between mt-4">
        <Sidebar />
        <Editor />
        <Sensechecker />
      </div>
    </div>
  );
}