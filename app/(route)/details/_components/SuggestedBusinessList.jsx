import globalApi from '@/app/_services/globalApi';
import { Button } from '@/components/ui/button';
import { NotebookPen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import BookingSection from './BookingSection';

function SuggestedBusinessList({ business }) {
  const [businesses, setBusinesses] = useState([]);
  const [storedCategoryName, setStoredCategoryName] = useState(null);

  // Call this function directly if business is available
  if (business && business?.category?.name !== storedCategoryName) {
    setStoredCategoryName(business.category.name);
    GetBusinessByCategory(business.category.name);
  }

  const GetBusinessByCategory = async (categoryName) => {
    console.log("Fetching business by category: " + categoryName);
    try {
      const res = await globalApi.getBusinessByCategory(categoryName);
      setBusinesses(res?.businessLists);
      console.log(res?.businessLists);
    } catch (error) {
      console.log("Error on fetching business by category " + error);
    }
  };

  return (
    businesses.length > 0 && (
      <div className='md:pl-10'>
        <BookingSection>
          <Button className='flex gap-2 w-full'>
            <NotebookPen /> Book Appointment
          </Button>
        </BookingSection>
        <div className='hidden md:block'>
          <h2 className='font-bold text-lg mt-3 mb-3'>Similar Business</h2>
          <div>
            {businesses.map((businessItem, index) => (
              <Link
                key={index}
                href={'/details/' + businessItem.id}
                className='flex gap-2 mb-4 hover:border rounded-lg p-2 cursor-pointer hover:shadow-md hover:scale-110 border-primary'
              >
                <Image
                  src={businessItem.images[1]?.url}
                  alt={businessItem.name}
                  height={80}
                  width={80}
                  className='rounded-full object-cover'
                />
                <div>
                  <h2 className='font-bold'>{businessItem.name}</h2>
                  <h2 className='text-primary'>{businessItem.contactPerson}</h2>
                  <h2 className='text-gray-400'>{businessItem.address}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  );
}

export default SuggestedBusinessList;
