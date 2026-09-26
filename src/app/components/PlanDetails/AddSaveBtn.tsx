"use client";
import { DataContext } from '@/context/DataProvider';
import { IData } from '@/types/datas.type';
import React, { useContext } from 'react';
import { FaRegBookmark } from 'react-icons/fa6';
import { toast } from 'react-toastify';

const AddSaveBtn = ({work}: {work: IData}) => {
    const {addSave, SetAddSave} = useContext(DataContext);

    const handleSave = () => {
        SetAddSave([...addSave, work]);
        toast.success(`Added in Save ${work.name}`);
    }
    return (
        <button onClick={()=> handleSave()} className="rounded-lg border border-[#343945] px-5 py-2.5 text-xs text-gray-300 hover:bg-[#181b22] flex gap-2 items-center cursor-pointer">
              <FaRegBookmark /> Save for later
            </button>
    );
};

export default AddSaveBtn;