import React from 'react';
import { HiSpeakerphone } from 'react-icons/hi';
import RComments from '../../components/dashboard/reports/RComments';
import Rgames from '../../components/dashboard/reports/Rgames';
import Rpost from '../../components/dashboard/reports/Rpost';
import Rreview from '../../components/dashboard/reports/Rreview';


export default function DReports() {




    return (

        <>
            <div className='flex flex-wrap gap-10 m-9 p-10 rounded-3xl border-t-4 shadow-lg border-indigo  dark:bg-slate-800'>
                <span className='flex items-center gap-5'>

                    <HiSpeakerphone color='indigo' size={25} /> <p className='text-lg'>You can manage all the reports from here</p>
                </span>
                <div className=' w-full   flex gap-5 justify-center '>
                    <div className='grid  flex-1 gap-5'>

                        <RComments />
                        <Rreview />
                        <Rpost />
                      
                    </div>
                
                </div>


            </div>

        </>

    );
}
