
import { Button } from '@/components/ui/button';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

function BusinessList({ businessLists, title }) {

  function toProperCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return (
    <div className='mt-5'>
      <h2 className='font-bold text-2xl'>{title}</h2>
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 mt-5 gap-6'>
        {businessLists.length > 0 ? businessLists.map((business, index) => (
          <Link href={"/details/"+business.id} key={index} className='shadow-md rounded-lg hover:shadow-lg hover:shadow-primary cursor-pointer transition-transform transform hover:scale-105'>
            <Image
              src={business.image[0].url}
              alt={business.name}
              width={500}
              height={200}
              className='h-[150px] md:h-[200px] object-cover rounded-t-lg'
            />
            <div className='flex flex-col items-baseline p-3 gap-1'>
              <h2 className='p-1 text-primary bg-purple-200 px-2 rounded-full text-xs'>
                {business.category.name}
              </h2>
              <h2 className='font-bold text-lg'>{business.name}</h2>
              <h2 className='text-pretty'>{business.contactPerson}</h2>
              <h2 className='text-sm text-gray-600'>{toProperCase(business.address)}</h2>
              <Button className="rounded-full mt-3">Book Now</Button>
            </div>
          </Link>
        )) : (
          [1,2,3,4,5,6,7,8,9,10,11,12].map((_, index) => (
            <div key={index} className='w-full h-[200px] bg-slate-200 animate-pulse rounded-lg'></div>
          )) 
        )}
      </div>
    </div>
  )
}

export default BusinessList
