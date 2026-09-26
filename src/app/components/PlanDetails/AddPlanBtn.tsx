"use client";
import { DataContext } from '@/context/DataProvider';
import { IData } from '@/types/datas.type';
import React, { useContext } from 'react';
import { FaCalendarPlus } from 'react-icons/fa6';
import { toast } from 'react-toastify';

const AddPlanBtn = ({work}: {work: IData}) => {
    const {addPlan, SetAddPlan} = useContext(DataContext);

    const handleAddPlan = () => {
        SetAddPlan([...addPlan, work]);
        toast.success(`Added in Plan ${work.name}`);
    }
    return (
        <button onClick={()=> handleAddPlan()} className="rounded-lg bg-[#c6ff00] px-5 py-2.5 text-xs font-semibold text-black hover:bg-[#b5eb00] flex gap-2 items-center cursor-pointer">
              <FaCalendarPlus /> Add to todays plan
            </button>
    );
};

export default AddPlanBtn;