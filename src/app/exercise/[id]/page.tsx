import React from 'react';


interface IDataDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

const page = async ({params}: IDataDetailsPageProps) => {
    const {id} = await params;
    console.log(id);
    return (
        <div>
            
        </div>
    );
};

export default page;