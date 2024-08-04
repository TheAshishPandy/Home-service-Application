'use client'

import React, { useEffect, useCallback, useState } from 'react';
import { useDescope, useSession } from '@descope/nextjs-sdk/client';
import { useRouter } from 'next/navigation';
import globalApi from '@/app/_services/globalApi';
import BusinessInfo from '../_components/BusinessInfo';
import BusinessDescription from '../_components/BusinessDescription';
import SuggestedBusinessList from '../_components/SuggestedBusinessList';

function BusinessDetails({ params }) {
    const router = useRouter();
    const { isAuthenticated, isSessionLoading } = useSession();
    const sdk = useDescope();
    const [businessDetails, setBusinessDetails] = useState([]);
    console.log(params.businessId);

    const GetBusinessById = useCallback(async () => {
        console.log("Call GetBusinessById fetching the record " + params.businessId);
        try {
            const res = await globalApi.GetBusinessById(params.businessId);
            setBusinessDetails(res?.businessList);
        } catch (error) {
            console.error("Error GetBusinessById fetching the record " + params.businessId + ":" + error);
        }
    }, [params.businessId]);

    useEffect(() => {
            GetBusinessById();
    }, [isAuthenticated, isSessionLoading, params.businessId, GetBusinessById, router]);

    const handleLogout = useCallback(() => {
        sdk.logout();
    }, [sdk]);

    if (isSessionLoading) {
        return <p>Loading...</p>;
    }


    return (
        <div className='py-8 md:py-20 px-10 md:px-36'>
            {/* <BusinessInfo business={businessDetails} /> */}

            <div className='grid grid-cols-3 mt-16'>
                <div className='col-span-3 md:col-span-2 order-last md:order-first'>
                    <BusinessDescription business={businessDetails} />
                </div>
                {/* <div className='hidden md:block'>
                    <SuggestedBusinessList business={businessDetails} />
                </div> */}
            </div>
        </div>
    );
}

export default BusinessDetails;
