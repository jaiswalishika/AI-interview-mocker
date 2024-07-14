"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Webcam from "react-webcam";
import React, { useEffect, useState } from 'react'

const Interview = ({ params }) => {

  const [interviewData, setInterviewData] = useState()
  const [webCamEnabled, setWebCamEnabled] = useState(false)


  useEffect(() => {
    console.log(params.interviewId)
    GetInterviewDetails();
  }, [])

  // used to get interview details by mockId/InterviewId

  const GetInterviewDetails = async () => {
    const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId))

    setInterviewData(result[0]);
  }

  return (
    <div className='my-40 flex flex-col items-center justify-center '>
      <h2 className='font-bold text-2xl'>Lets Get Started</h2>

      <div className='grid grid-cols-1 md:grid-cols-2'>

        <div className='flex flex-col my-5 p-5 rounded-lg gap-5'>
          <div className='flex flex-col gap-10'>
            <h2 className='text-xl  font-medium'><strong className='text-black'>Job Role/Job Position : </strong>{interviewData?.jobPosition}</h2>
            <h2 className='text-xl font-medium'><strong className='text-black'>Job Description/Tech Stack : </strong>{interviewData?.jobDesc}</h2>
            <h2 className='text-xl font-medium'><strong className='text-black'>Years of Experience : </strong>{interviewData?.jobExperience}</h2>
          </div>

          <div className='p-5 border rounded-lg bg-yellow-100 border-yellow-300'>
            <h2 className='flex gap-2 items-center text-yellow-500'><Lightbulb className='h-10 w-10' /><strong></strong></h2>
            <h2 className='mt-3 text-yellow-700'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center mx-10'>
          {webCamEnabled ? <Webcam
            onUserMedia={() => setWebCamEnabled(true)}
            onUserMediaError={() => setWebCamEnabled(false)}
            mirrored={true}
            style={{
              height: 300,
              width: 300
            }}
          />
            :
            <>
              <WebcamIcon className='my-7 h-72 w-full p-5 bg-secondary rounded-lg border' />
              <Button className='hover:bg-purple-900 w-full' onClick={() => setWebCamEnabled(true)}>Enable Web Cam</Button>
            </>
          }
        </div>
      </div>

      <Button className="hover:rounded-lg hover:bg-purple-900 w-[30%] font-medium">
        Start Interview
      </Button>
    </div>

  )
}

export default Interview