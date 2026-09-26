"use client";
import { DataContext } from '@/context/DataProvider';
import React, { useContext } from 'react';
import { Oswald, Inter } from "next/font/google";

const oswald = Oswald();
const inter = Inter();

const Page = () => {
    const {addPlan, addSave} = useContext(DataContext);
    // console.log(addPlan);
    // console.log(addSave);
    return (
        <div className={`text-white max-w-[97%] mx-auto ${inter.className}`}>
            add plan {addPlan.length} | add Save {addSave.length}
            <h1 className={`text-3xl font-bold ${oswald.className}`}>MY PLAN</h1>
            <p className='text-sm text-[#8a92a0FF]'>Cap of five lifts for today. Finish them, then load more.</p>
            <div className='bg-amber-100 flex justify-between items-center'>
                <div className='border-r-2 border-amber-950'>
                    <p className='text-sm text-[#8a92a0FF]'>Exercises</p>
                    <h1 className={`${oswald.className} text-4xl font-bold`}>{addPlan.length}</h1>
                </div>
                <div className='border-r-2 border-amber-950'>
                    <p className='text-sm text-[#8a92a0FF]'>Minutes</p>
                    <h1 className={`${oswald.className} text-4xl font-bold`}>{addPlan.length}</h1>
                </div>
                <div className='border-r-2 border-amber-950'>
                    <p className='text-sm text-[#8a92a0FF]'>Calories</p>
                    <h1 className={`${oswald.className} text-4xl font-bold`}>{addPlan.length}</h1>
                </div>
            </div>
        </div>
    );
};

export default Page;