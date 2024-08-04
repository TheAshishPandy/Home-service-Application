import { Button } from '@/components/ui/button'
import { Clock, MailIcon, MapPin, Share, User } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function BusinessInfo({ business }) {
  return  (
    <div className='flex justify-between items-center w-full'>
      <div className='md:flex gap-4 items-center'>
        <Image src={business.image[0]?.url}
          alt={business.name}
          width={150}
          height={200}
          className='rounded-full h-[150px] object-cover'
        />
        <div className='flex flex-col items-baseline gap-3 mt-4 md:mt-0'>
          <h2 className='text-primary bg-purple-100 rounded-full p-1 px-2 text-lg'>{business.category.name}</h2>

          <h2 className='font-bold text-[40px]'>{business.name}</h2>
          <h2 className='flex gap-2 text-lg text-gray-500'><MapPin />{business.address}</h2>
          <h2 className='flex gap-2 text-lg text-gray-500' ><MailIcon />{business?.email}</h2>
        </div>
        <div className='flex flex-col gap-5 items-center'>
          <Button ><Share /></Button>
          <h2 className='flex gap-2 text-xl text-primary'>
            <User /> {business.contactperson}
          </h2>
          <h2 className='flex gap-2 text-xl text-gray-500'><Clock /> Avilable at 8:00 AM To 10:00 PM
          </h2>
        </div>
      </div>
    </div>
  )
}

export default BusinessInfo