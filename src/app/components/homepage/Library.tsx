import React from 'react';
import { Oswald, Inter } from "next/font/google";

const oswald = Oswald();
const inter = Inter();

const Library = () => {
    return (
        <section className='max-w-[97%] mx-auto'>
            <div>
                <h1 className={`${oswald.className} text-3xl font-bold text-white`}>THE LIBRARY</h1>
                <p className={`${inter.className} mt-1 mb-8 text-sm font-normal text-[#9ca3afFF]`}>Twelve lifts covering every major muscle group.</p>
            </div>
        </section>
    );
};

export default Library;