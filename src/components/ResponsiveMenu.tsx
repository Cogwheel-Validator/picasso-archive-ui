'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ResponsiveMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost lg:hidden" onClick={() => setIsOpen(!isOpen)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </label>
      {isOpen && (
        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <li><Link href="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link href="/search" onClick={() => setIsOpen(false)}>Search</Link></li>
          <li><Link href="/about_the_app" onClick={() => setIsOpen(false)}>About the App</Link></li>
        </ul>
      )}
    </div>
  )
}