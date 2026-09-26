"use client";
import { DataContext } from "@/context/DataProvider";
import type { IData } from "@/types/datas.type";
import { useContext } from "react";
import { FaRegBookmark } from "react-icons/fa6";
import { toast } from "react-toastify";

const AddSaveBtn = ({ work }: { work: IData }) => {
  const { addSave, SetAddSave } = useContext(DataContext);
  const alreadySaved = addSave.some((item) => item.id === work.id);

  const handleSave = () => {
    if(alreadySaved){
      toast.info("This workout is already saved.");
      return;
    }
    SetAddSave((currentSave) => [...currentSave, work]);
    toast.success(`${work.name} Workout saved for later.`);
  };

  return (
    <button
      onClick={handleSave}
      disabled={alreadySaved}
      className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#343945] px-5 py-2.5 text-xs text-gray-300 hover:bg-[#181b22] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <FaRegBookmark /> Save for later
    </button>
  );
};

export default AddSaveBtn;
