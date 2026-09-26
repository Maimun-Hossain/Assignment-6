"use client";
import { DataContext } from "@/context/DataProvider";
import type { IData } from "@/types/datas.type";
import { useContext } from "react";
import { FaCalendarPlus } from "react-icons/fa6";
import { toast } from "react-toastify";

const AddPlanBtn = ({ work }: { work: IData }) => {
  const { addPlan, SetAddPlan } = useContext(DataContext);
  const alreadyAdded = addPlan.some((item) => item.id === work.id);
  const atLimit = addPlan.length >= 5;

  const handleAddPlan = () => {
    if (alreadyAdded) {
      toast.info("This workout is already in today's plan.");
      return;
    }
    if (atLimit) {
      toast.info("Today's plan is limited to five workouts.");
      return;
    }
    SetAddPlan((currentPlan) => [...currentPlan, work]);
    toast.success(`${work.name} Added to today's plan.`);
  };

  return (
    <button
      onClick={handleAddPlan}
      disabled={atLimit || alreadyAdded}
      className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#c6ff00] px-5 py-2.5 text-xs font-semibold text-black hover:bg-[#b5eb00] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <FaCalendarPlus /> Add to today&apos;s plan
    </button>
  );
};

export default AddPlanBtn;
