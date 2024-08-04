import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function CategoryList({ categorylist }) {  
  return (
    <div className='mx-4 md:mx-22 lg:mx-52 grid grid-cols-3 md:grid-cols-6 lg:grid-col-6 gap-4'>
      {categorylist.length>0 ? categorylist.map((category, index) => (
        <Link href={'/search/'+category.name} key={index} className={`items-center flex flex-col justify-center gap-2
        bg-purple-50 p-5 rounded-lg cursor-pointer  hover:scale-110 transition-all ease-in-out
        `}>
        <Image
          key={index}
          src={category.icon.url}
          alt='icon'
          height={35}
          width={35}
        />
        <h2 className='text-primary'>{category.name}</h2>

        </Link>
        
      )):
      [1,2,3,4,5,6].map((category,index)=>(
        <div key={index} className='h-[120px] w-full bg-slate-200 animate-pulse rounded-lg'>
            </div>
      ))
      }
    </div>
  )
}

export default CategoryList
