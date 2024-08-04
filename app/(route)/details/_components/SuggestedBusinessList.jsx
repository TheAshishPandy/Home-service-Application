import globalApi from '@/app/_services/globalApi';
import { Button } from '@/components/ui/button'
import { NotebookPen } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import BookingSection from './BookingSection';

function SuggestedBusinessList({ business }) {
  const [businesses, setBusinesses] = useState([]);
  console.log(business);

  useEffect(() => {
    business && GetBusinessByCategory();
  }, [business]);

  const GetBusinessByCategory = () => {
    console.log("feteching business by category ");
    try {

      const res = globalApi.getBusinessByCategory(business?.category?.name);
      setBusinesses(res?.businessList);
      console(res?.businessList);
    }
    catch (error) {
      console.log("Error on feteching business by category " + error);
    }

  }

  return businesses && (
    <div className='md:pl-10'>
      <BookingSection >
      <Button className='flex gap-2 w-full'><NotebookPen /> Book Appointmenr</Button>
      </BookingSection >
      <div className='hidden md:block'>
        <h2 className='font-bold text-lg mt-3 mb-3'>Similar Business</h2>
        <div>
          {businesses && businesses.map((business, index) => {
            <Link href={'/details/' + business.id} className='flex gap-2 mb-4
               hover:border rounded-lg p-2 cursor-pointer hover:shadow-md hover:scale-110 border-primary'>
              <Image src={business.images[1].url} alt={business.name} height={80} width={80} className='rounded-full object-cover' />
              <div className=''>
                <h2 className='font-bold'>{business.name}</h2>
                <h2 className='text-primary'>{business.contactPerson}</h2>
                <h2 className='text-gray-400'>{business.address}</h2>
              </div>
            </Link>

          })}
        </div>
      </div>
    </div>
  )
}

export default SuggestedBusinessList