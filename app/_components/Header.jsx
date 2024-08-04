"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Descope } from '@descope/nextjs-sdk';
import { useDescope, useSession, useUser } from '@descope/react-sdk'
import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
function Header() {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isAuthenticated, isSessionLoading, sessionToken } = useSession();
    const { user } = useUser();
    const sdk = useDescope();

    const handleLogout = useCallback(() => {
		sdk.logout();
	}, [sdk]);
    const handleSignIn = () => {
        console.log('Sign in button clicked');
        setIsModalOpen(true);
    };
    if(isAuthenticated){
        console.log(user);
    }
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className='p-5 shadow-sm flex justify-between'>
                <div className='flex items-center gap-8'>
                    <Image src="/logo.svg" alt="logo" height={100} width={180} />
                    <div className='md:flex items-center gap-6 hidden'>
                        <h2 className='hover:scale-105 hover:text-primary cursor-pointer'>Home</h2>
                        <h2 className='hover:scale-105 hover:text-primary cursor-pointer'>Service</h2>
                        <h2 className='hover:scale-105 hover:text-primary cursor-pointer'>About Us</h2>
                    </div>
                </div>
                <div>
                    {(!user) ? (
                     <Button onClick={handleSignIn}>Login / Sign Up</Button>
                    ) : (<>
                   <DropdownMenu> <DropdownMenuTrigger> <img src={user.picture} alt={user.name} width={40} height={40} className='rounded-full'/></DropdownMenuTrigger>
                        <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                            <DropdownMenuItem>My Booking</DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogout}>LogOut</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                   </>
                    )}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50 transition-opacity duration-300 ease-in-out">
                    <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg transform scale-105 transition-transform duration-300 ease-in-out">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Welcome Back</h2>
                        <p className="mb-6 text-center text-gray-500 text-sm">Sign up or log in to access your account</p>
                        <div className="mb-6">
                            <Descope
                                flowId="sign-up-or-in"
                                onSuccess={(event) => {
                                    console.log('Successfully logged in!', event);
                                    handleCloseModal();
                                    router.push("/"); 
                                }}
                                onError={(event) => console.error('Login failed!', event)}
                                redirectAfterSuccess="/"
                                className="w-full"
                            />
                        </div>
                        <p className="text-center text-gray-400 text-xs">
                            By continuing, you agree to our <a href="/terms" className="text-blue-500 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</a>.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;
