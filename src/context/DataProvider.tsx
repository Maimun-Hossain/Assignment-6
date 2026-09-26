"use client";
import React, { createContext, useState } from 'react';


export const DataContext = createContext({});
const DataProvider = ({children}: {children: React.ReactNode}) => {
    const [addPlan, SetAddPlan] = useState([]);
    const [addSave, SetAddSave] = useState([]);

    const sharedData = {
        addPlan,
        SetAddPlan,
        addSave,
        SetAddSave
    };
    return (
        <DataContext.Provider value={sharedData}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;