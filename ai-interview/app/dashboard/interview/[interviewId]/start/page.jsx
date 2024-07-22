'use client'
import { db } from '@/utils/db.js'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import RecordAns from './_components/RecordAns'

const StartInterview = ({ params }) => {

  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId))

    try {
      const jsonMockResp = await JSON.parse(result[0].jsonMockResp);
      setMockInterviewQuestion(jsonMockResp);
      setInterviewData(result[0]);
    } catch (error) {
      console.error(`Error parsing JSON: ${error}`);
    }
  }

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-64 gap-10'>
        {/* QuestionsSection */}
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />

        {/* Video Audio Recording */}
        <RecordAns
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>

      <div className='flex justify-end gap-6'>
      {activeQuestionIndex>0 &&
      <Button onClick = {() => {
        setActiveQuestionIndex(activeQuestionIndex-1)
      }}>
        Previous Question
      </Button>}
      {activeQuestionIndex!=mockInterviewQuestion?.length-1 && 
      <Button onClick = {() => {
        setActiveQuestionIndex(activeQuestionIndex+1)
      }}>
        Next Question
      </Button>}
      {/* {activeQuestionIndex==mockInterviewQuestion?.length-1 &&  
      <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
      <Button>
        End Interview
      </Button>
      </Link>} */}
       <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
      <Button>
        End Interview
      </Button>
      </Link>
      </div>
    </div>
  )
}

export default StartInterview
