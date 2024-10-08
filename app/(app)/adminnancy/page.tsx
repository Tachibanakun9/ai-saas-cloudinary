import { redirect } from 'next/navigation'
import { checkRole } from '@/utils/roles'

import { SearchUsers } from './_search-users'
import { clerkClient } from '@clerk/nextjs/server'
import { setRole } from './_actions'




export default async function AdminDashboard() {
  // If the user does not have the admin role, redirect them to the home page
  if (!checkRole('admin')) {
    redirect('/')
  }

  return (
    <>
      <h1>This is the admin dashboard</h1>
      <p>This page is restricted to users with the 'admin' role.</p>
    </>
  )
}