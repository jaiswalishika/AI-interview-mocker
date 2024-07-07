"use client"
import Image from 'next/image';
import Link from 'next/link';
import { FaAlignJustify } from "react-icons/fa6";
import { useState } from 'react';
import { UserButton } from '@clerk/nextjs';


function Header() {
  const [navbar, setNavbar] = useState(false);
  return (
    <div>
      <nav className="w-full bg-purple-400 md:bg-purple-500 fixed top-0 left-0 right-0 z-10">
        <div className="justify-between px-4 py-2 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              {/* LOGO */}
              <Image 
              src={'logo.svg'}
              height={80}
              width={80}
              alt='logo'
              />

              {/* Mobile Screen Logo */}
              
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border delay-100 ease-out"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <FaAlignJustify
                     width={50} 
                     height={50} 
                     alt="logo" 
                     />
                  ) : (
                    <FaAlignJustify
                      width={50}
                      height={50}
                      alt="logo"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? 'p-12 md:p- block' : 'hidden'
              }`}
            >
              <ul className="h-screen md:h-16 md:flex items-center justify-center">
                <li className="text-xl font-semibold text-black md:py-2 py-4 md:px-6 text-center border-b hover:text-slate-700 hover:font-extrabold md:border-b-0  hover:bg-purple-400  border-slate-600  md:hover:text-slate-700 md:hover:font-bold md:hover:bg-transparent">
                  <Link href="/dashboard" onClick={() => setNavbar(!navbar)}>
                    Dashboard
                  </Link>
                </li>
                <li className="text-xl font-semibold text-black md:py-2 py-4 md:px-6 text-center border-b hover:text-slate-700 hover:font-extrabold md:border-b-0  hover:bg-purple-400  border-slate-600  md:hover:text-slate-700 md:hover:font-bold md:hover:bg-transparent">
                  <Link href="/dashboard/questions" onClick={() => setNavbar(!navbar)}>
                    Questions
                  </Link>
                </li>
                <li className="text-xl font-semibold text-black md:py-2 py-4 md:px-6 text-center border-b hover:text-slate-700 hover:font-extrabold md:border-b-0  hover:bg-purple-400  border-slate-600  md:hover:text-slate-700 md:hover:font-bold md:hover:bg-transparent">
                  <Link href="/dashboard/upgrade" onClick={() => setNavbar(!navbar)}>
                    Upgrade
                  </Link>
                </li>
                <li className="text-xl font-semibold text-black md:py-2 py-4 md:px-6 text-center border-b hover:text-slate-700 hover:font-extrabold md:border-b-0  hover:bg-purple-400  border-slate-600  md:hover:text-slate-700 md:hover:font-bold md:hover:bg-transparent">
                  <Link href="/dashboard/how" onClick={() => setNavbar(!navbar)}>
                    How it works?
                  </Link>
                </li>
                <UserButton 
                height = {50}
                width ={ 50}
                className = "border-2 border-white"
                />
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;