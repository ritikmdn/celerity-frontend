import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export default async function handler(req, res) {
  const supabase = createServerComponentClient({ cookies: req.cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    res.status(401).json({ error: "Not Authorized" }); // Send a 401 status if user is not found
  } else {
    res.status(200).json(user);
  }
}
