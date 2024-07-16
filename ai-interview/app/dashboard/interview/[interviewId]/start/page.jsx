'use client'
import { db } from '@/utils/db.js'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection'
// import RecordAns from './_components/RecordAns'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import RecordAns from './_components/RecordAns'

const StartInterview = ({params}) => {

    const [interviewData,setInterviewData]=useState();
    const [mockInterviewQuestion,setMockInterviewQuestion]=useState();
    const [activeQuestionIndex,setActiveQuestionIndex]=useState(0);

    useEffect(()=>{
        GetInterviewDetails();
    },[]);

    const GetInterviewDetails=async()=>{
      const result=await db.select().from(MockInterview).where(eq(MockInterview.mockId,params.interviewId))
   
    //  const jsonMockResp=await JSON.parse(result[0].jsonMockResp);

    try {
      const jsonMockResp = await JSON.parse(result[0].jsonMockResp);
      setMockInterviewQuestion(jsonMockResp);
    } catch (error) {
      console.error(`Error parsing JSON: ${error}`);
    }
  
     setMockInterviewQuestion(jsonMockResp);
     setInterviewData(result[0]);
  }

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-64 gap-10'>
        {/* QuestionsSection */}
        <QuestionsSection
      mockInterviewQuestion={mockInterviewQuestion}
      activeQuestionIndex ={activeQuestionIndex}
      />


        {/* Audio/video recrding */}
        <RecordAns />

      </div>
    </div>
  )
}

export default StartInterview
