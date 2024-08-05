'use client'

import React, { useEffect, useState } from 'react';
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
    const [businessDetails, setBusinessDetails] = useState([]); // Change initial state to null
    console.log(params.businessId);

    const getBusinessById = async () => {
        console.log("Call GetBusinessById fetching the record " + params.businessId);
        try {
            const res = await globalApi.GetBusinessById(params.businessId);
            console.log(res);
            setBusinessDetails(res?.businessLists);
        } catch (error) {
            console.error("Error GetBusinessById fetching the record " + params.businessId + ":" + error);
        }
    };

    useEffect(() => {
       params&& getBusinessById();    
    }, [params.businessId]);

    const handleLogout = () => {
        sdk.logout();
    };

    if (isSessionLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className='py-8 md:py-20 px-10 md:px-36'>
            {businessDetails && <BusinessInfo business={businessDetails} />}
            <div className='grid grid-cols-3 mt-16'>
                <div className='col-span-3 md:col-span-2 order-last md:order-first'>
                    {businessDetails && <BusinessDescription business={businessDetails} />}
                </div>
                {businessDetails && (
                    // <div className='hidden md:block'>
                    //     <SuggestedBusinessList business={businessDetails} />
                    // </div>
                )}
            </div>
        </div>
    );
}

export default BusinessDetails;
