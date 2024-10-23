"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, getSession, getProviders } from "next-auth/react";

const Nav = () => {
  const isUserLoggedIn : boolean = true
  return (
    <nav className="flex-between w-full mb-16 pt-3 pb-3 border-b shadow-sm">
      <Link href='/' className="flex gap-2 flex-center" >
        <Image
          src="/assets/images/logo.svg"
          alt="PromptVerse Logo"
          width={30}
          height={30}
          className="object-contain "
        />
        <p className="logo_text">PromptVerse</p>
      </Link>

        {/* {desktop Navigation} */}

      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt"
            className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={() => signOut()} className="outline_btn">
              Sign Out 
            </button>

            <Link href="/profile">
              <Image
               src="/assets/images/logo.svg"
               width={30}
               height={30}
               alt="Profile"
               className="rounded-full"
               />
            </Link>

          </div>
        ) : (
          <>

          </>
        )}


      </div>

    </nav>
  )
}
export default Nav;