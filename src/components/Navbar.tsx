import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='nav-barr'>
         <Link href="/"> <Image src="/taskLogo.webp" width={100} height={100} alt=""/> </Link>
            <div className="nav-links" id="navLinks">
               <Link href="/">Home</Link>
                    <Link href="/services">Services</Link>
                     <Link href="/">About Us</Link>
                     <Link href="/services">Manage Your Services</Link>
                     

                
                <UserButton afterSignOutUrl="/"/>
            </div>
                 
        </div>
  )
}

export default Navbar