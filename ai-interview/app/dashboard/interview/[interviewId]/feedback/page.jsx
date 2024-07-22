'use client'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React , {useState , useEffect} from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const Feedback = ({params}) => {

  const[feedbackList , setFeedbackList] = useState([]);
  const router= useRouter();

  useEffect(() => {
    GetFeedback();
  },[])

  const GetFeedback= async()=>{
    const result = await db.select()
    .from(UserAnswer)
    .where(eq(UserAnswer.mockIdRef,params.interviewId))
    .orderBy(UserAnswer.id)


    console.log(result);
    setFeedbackList(result);
  }

  return (
    <div className='mt-40'>
      <h2 className='text-2xl font-bold text-green-500'>Congratulations...!</h2>
      <h2 className='font-bold text-2xl'>Here is your interview Feedback.</h2>
      <h2 className='text-primary text-lg my-3 font-medium'>Your Overall Interview Rating :<strong> 7/10</strong></h2>

      <h2 className='text-gray-800 font-medium'>Find below interview question with correct answer ,Your answer and feedback for improvement.</h2>
      {feedbackList && feedbackList.map((item, index) => {
        <Collapsible key={index} className='mt-7'>
        <CollapsibleTrigger className='p-2 bg-secondary flex justify-between rounded-lg my-2 text-left gap-7 w-full'>{item?.question} <ChevronsUpDown className='h-5 w-5' />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className='flex flex-col gap-2'>
          <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating : </strong>{item.rating}</h2>
          <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer : </strong>{item.UserAns}</h2>
          <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer : </strong>{item.correctAns}</h2>
          <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-blue-900'><strong>Feedback : </strong>{item.feedback}</h2>
          </div>
        </CollapsibleContent>
      </Collapsible>
      })}

      <Button onClick ={() => router.replace('/dashboard')}>Go Home</Button>
    </div>
  )
}

export default Feedback