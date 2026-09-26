"use client";
import React, { createContext, useSyncExternalStore } from "react";
import type { IData } from "@/types/datas.type";

interface DataContextValue {
  addPlan: IData[];
  SetAddPlan: React.Dispatch<React.SetStateAction<IData[]>>;
  addSave: IData[];
  SetAddSave: React.Dispatch<React.SetStateAction<IData[]>>;
  doneIds: number[];
  SetDoneIds: React.Dispatch<React.SetStateAction<number[]>>;
  isHydrated: boolean;
}

interface StoredData {
  addPlan: IData[];
  addSave: IData[];
  doneIds: number[];
}

const storageKey = "fitlog-data";
const emptyData: StoredData = { addPlan: [], addSave: [], doneIds: [] };
let cachedStorage: string | null | undefined;
let cachedData = emptyData;

const getStoredData = () => {
  if(typeof window === "undefined") return emptyData;

  const storedData = localStorage.getItem(storageKey);
  if(storedData === cachedStorage) return cachedData;
  cachedStorage = storedData;

  if(!storedData){
    cachedData = emptyData;
    return cachedData;
  }

  try{
    const parsedData = JSON.parse(storedData);
    cachedData ={
      addPlan: Array.isArray(parsedData.addPlan) ? parsedData.addPlan : [],
      addSave: Array.isArray(parsedData.addSave) ? parsedData.addSave : [],
      doneIds: Array.isArray(parsedData.doneIds) ? parsedData.doneIds : [],
    };
  }
  catch{
    localStorage.removeItem(storageKey);
    cachedStorage = null;
    cachedData = emptyData;}

  return cachedData;
};

const subscribe = (onChange: () => void) => {
  if(typeof window === "undefined") return () => {};
  window.addEventListener("storage", onChange);
  window.addEventListener("fitlog-data-change", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("fitlog-data-change", onChange);
  };
};

const saveData = (data: StoredData) => {
  cachedData = data;
  cachedStorage = JSON.stringify(data);
  localStorage.setItem(storageKey, cachedStorage);
  window.dispatchEvent(new Event("fitlog-data-change"));
};

const getServerData = () => emptyData;
const subscribeHydration = () => () => {};
const getClientHydration = () => typeof window !== "undefined";
const getServerHydration = () => false;

export const DataContext = createContext<DataContextValue>({
  addPlan: [],
  SetAddPlan: () => {},
  addSave: [],
  SetAddSave: () => {},
  doneIds: [],
  SetDoneIds: () => {},
  isHydrated: false,
});

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const { addPlan, addSave, doneIds } = useSyncExternalStore(
    subscribe,
    getStoredData,
    getServerData,
  );
  const isHydrated = useSyncExternalStore(
    subscribeHydration,
    getClientHydration,
    getServerHydration,
  );

  const SetAddPlan: DataContextValue["SetAddPlan"] = (update) => {
    const currentData = getStoredData();
    const nextPlan = typeof update === "function" ? update(currentData.addPlan) : update;
    saveData({ ...currentData, addPlan: nextPlan });
  };

  const SetAddSave: DataContextValue["SetAddSave"] = (update) => {
    const currentData = getStoredData();
    const nextSaved = typeof update === "function" ? update(currentData.addSave) : update;
    saveData({ ...currentData, addSave: nextSaved });
  };

  const SetDoneIds: DataContextValue["SetDoneIds"] = (update) => {
    const currentData = getStoredData();
    const nextDoneIds = typeof update === "function" ? update(currentData.doneIds) : update;
    saveData({ ...currentData, doneIds: nextDoneIds });
  };

  return (
    <DataContext.Provider
      value={{
        addPlan,
        SetAddPlan,
        addSave,
        SetAddSave,
        doneIds,
        SetDoneIds,
        isHydrated,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
