'use client'

import globalApi from '@/app/_services/globalApi';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function CategorySideBar() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        GetCategoryList();
    }, []);

    // Use to Get All Category List //
    const GetCategoryList = async () => {
        try {
            const res = await globalApi.GetCategory();
            setCategories(res.categories);
        } catch (err) {
            console.error("Error fetching categories:", err);
        }
    };

    return (
        <div>
            <h2 className='font-bold mb-3 text-primary text-lg'>Categories</h2>
            <div>
                {categories.length > 0 ? categories.map((category, index) => (
                    <Link
                        href={`/search/${category.name}`}
                        key={index}
                        className={`flex gap-3 p-3 border rounded-lg mb-3 md:mr-10 cursor-pointer hover:bg-purple-50 hover:text-primary hover:border-primary hover:shadow-md items-center ${selectedCategory === category.name ? 'border-primary text-primary shadow-md bg-purple-50' : ''}`}
                        onClick={() => setSelectedCategory(category.name)}
                    >
                        <Image src={category.icon.url}
                            alt='icon'
                            width={30} height={30}
                        />
                        <h2>{category.name}</h2>
                    </Link>
                )) : (
                    [1, 2, 3, 4, 5, 6].map((_, index) => (
                        <div key={index} className='flex gap-3 p-3 h-[30px] bg-slate-200 border rounded-lg mb-3 md:mr-10 cursor-pointer animate-pulse'></div>
                    ))
                )}
            </div>
        </div>
    );
}

export default CategorySideBar;
