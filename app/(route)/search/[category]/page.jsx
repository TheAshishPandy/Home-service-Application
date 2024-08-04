'use client'

import BusinessList from '@/app/_components/BusinessList';
import globalApi from '@/app/_services/globalApi';
import React, { useEffect, useState } from 'react';

function BusinessByCategory({ params }) {
  const [businesses, setBusinesses] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (params && params.category) {
      setCategory(params.category);
    }
  }, [params]);

  useEffect(() => {
    if (category) {
      GetCategoryList();
    }
  }, [category]);

  const GetCategoryList = async () => {
    try {
      const res = await globalApi.getBusinessByCategory(category);
      setBusinesses(res.businessLists);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  return (
    <div>
      <BusinessList title={category} businessLists={businesses} />
    </div>
  );
}

export default BusinessByCategory;
