import { Button } from '@/components/ui/button';
import { Clock, MailIcon, MapPin, Share, User } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

function BusinessInfo({ business }) {
  return (
    <div>
      {business.map((businessInfo, index) => (
        <div key={index} className='flex justify-between items-center'>
          <div className='md:flex gap-4 items-center w-full'>
            <Image
              src={businessInfo.image[0]?.url}
              alt={businessInfo.name}
              width={150}
              height={200}
              className='rounded-full h-[150px] object-cover'
            />
            <div className='flex flex-col items-baseline gap-3 mt-4 md:mt-0'>
              <h2 className='text-primary bg-purple-100 rounded-full p-1 px-2 text-lg'>{businessInfo.category.name}</h2>
              <h2 className='font-bold text-[40px]'>{businessInfo.name}</h2>
              <h2 className='flex gap-2 text-lg text-gray-500'><MapPin />{businessInfo.address}</h2>
              <h2 className='flex gap-2 text-lg text-gray-500'><MailIcon />{businessInfo?.email}</h2>
            </div>
            <div className='flex flex-col gap-5 items-end'>
              <Button><Share /></Button>
              <h2 className='flex gap-2 text-xl text-primary'>
                <User /> {businessInfo.contactPerson}
              </h2>
              <h2 className='flex gap-2 text-xl text-gray-500'><Clock /> Available at 8:00 AM To 10:00 PM</h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BusinessInfo;
