'use client'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text'
import { Mic, StopCircle } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAIModal'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'


const RecordAns = (mockInterviewQuestion, activeQuestionIndex, interviewData) => {

  const [userAnswer, setUserAnswer] = useState('');
  const {user}=useUser();
  const [loading , setLoading] = useState(false)

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    results.map((result) => (
      setUserAnswer(prevAns => prevAns + result?.transcript)
    ))
  }, [results])

  useEffect(()=>{
    if(!isRecording && userAnswer?.length>10){

           UpdateUserAnswer();

    }
  },[userAnswer])

  const StartStopRecording=async()=>{

    if(isRecording){
        stopSpeechToText();
    }
    else{
        startSpeechToText();
    }
  }

  const UpdateUserAnswer = async() => {

    setLoading(true)

    const feedbackPrompt = "Question:" + mockInterviewQuestion[activeQuestionIndex]?.question + "User Answer" + userAnswer + "Depends on user answer for given interview " + "please give us rating for answer and feedback as area of improvement(if any). " + "In just 3-5 lines to improve it in json format with rating field and feedback field."

    const result = await chatSession.sendMessage(feedbackPrompt);

    const MockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
    // console.log(MockJsonResp);

    const JsonFeedbackResp = JSON.parse(MockJsonResp)

    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: mockInterviewQuestion[activeQuestionIndex]?.question,
      correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
      userAns: userAnswer,
      feedback: JsonFeedbackResp?.feedback,
      rating: JsonFeedbackResp?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format('DD-MM-yyyy')

    })

    if(resp)
    {
      toast('User answer recorded successfully')
      setUserAnswer('');
      setResults([]);
    }
    setResults([]);
    setLoading(false);
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex flex-col justify-center items-center bg-black rounded-lg p-5 my-16'>
        <Image
          src={'/webcam.webp'}
          alt="camera"
          width={400}
          height={400}
          className='absolute'
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: '100%',
            zIndex: 10,
          }}
        />
      </div>

      <Button
      disabled={loading}
       variant="outline" className="my-10" onClick={StartStopRecording}>
        {isRecording ?
          <h2 className='text-red-600 flex gap-2'>
            <StopCircle /> Stop Recording
          </h2>
          :
          <h2 className='text-primary flex gap-2 items-center'><Mic /> Record Answer</h2>
          }
      </Button>

      <Button onClick={() => console.log(userAnswer)} className='my-5'>
        Show User Answer
      </Button>

    </div>
  )
}

export default RecordAns