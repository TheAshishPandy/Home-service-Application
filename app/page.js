'use client'
import Hero from "./_components/Hero";
import CategoryList from "./_components/CategoryList";
import globalApi from "./_services/globalApi";
import { useEffect, useState } from "react";
import BusinessList from "./_components/BusinessList";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [businessLists, setbusinessLists] = useState([]);

  useEffect(() => {
    GetCategoryList();
    GetBusinessList();
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

  
  // Use to Get All Businesslists List //

  const GetBusinessList= async()=>{
    try {
      const res = await globalApi.GetBusinessList();
      setbusinessLists(res.businessLists)
    }
    catch(err){
      console.error("Error fetching business list:", err);
    }

  }

  return (
    <div>
      <Hero />
      <CategoryList categorylist={categories} />
      <BusinessList businessLists={businessLists} title={'Popular Business'}/>
    </div>
  );
}
