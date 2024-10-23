"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, getSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import Provider from "./Provider";

type Providers = {
  [key: string]: {
    id: string;
    name: string;
    type: string;
    signinUrl: string;
    callbackUrl: string;
  }
} | null;

const Nav = () => {
  const isUserLoggedIn: boolean = true;
  const [providers, setProviders] = useState<Providers>(null);
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

  useEffect(() => {
    const setupProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setupProviders();
  }, []);

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
            {providers && Object.values(providers).map((provider) => (
              <button 
              type="button"
              key={provider.name}
              onClick={()=> signIn(provider.id)}
              className="black_btn"
              >
                Sign In
              </button>
            ))}
          </>
        )}
      </div>

        {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image
               src="/assets/images/logo.svg"
               width={30}
               height={30}
               alt="Profile"
               className="rounded-full"
               onClick={()=> {setToggleDropdown((prev)=> !prev)}}
               />
               {toggleDropdown && (
                <div className="dropdown">
                  <Link 
                    href="/profile"
                    className="dropdown_link"
                    onClick={()=>setToggleDropdown(false)}
                  >
                  My Profile
                  </Link>
                  <Link 
                    href="/create-prompt"
                    className="dropdown_link"
                    onClick={()=>setToggleDropdown(false)}
                  >
                  Create Prompt
                  </Link>
                  <button 
                  type="button"
                  onClick={()=> {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                  >
                    Sign Out
                  </button>
                </div>

               )}
          </div>
        ) : (
          <>
            {providers && Object.values(providers).map((provider) => (
              <button 
              type="button"
              key={provider.name}
              onClick={()=> signIn(provider.id)}
              className="black_btn"
              >
                Sign In
              </button>
            ))}
          </>
        )}

      </div>

    </nav>
  )
}
export default Nav;