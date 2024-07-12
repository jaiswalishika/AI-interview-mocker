"use client"
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAIModal'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment'



const AddNewInterview = () => {

  const [openDialog, setOpenDialog] = useState(false)
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExp, setJobExp] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();

  const onSubmit = async (e) => {

    setLoading(true)

    e.preventDefault()

    console.log(jobPosition, jobDesc, jobExp);

    const InputPromt = "Job Position: " + jobPosition + ", Job Description: " + jobDesc + " , Job Experience:" + jobExp + ", depending upon the Job Position,Description and Experience give us " + process.env.NEXT_PUBLIC_INTERVIEW_QUESTIONS_COUNT + " questions and answers for interview in json format";

    const result = await chatSession.sendMessage(InputPromt);
    const MockJsonResp = (result.response.text()).replace('```json', '').replace('```json', '')
    console.log(MockJsonResp);
    console.log(JSON.parse(MockJsonResp));
    setJsonResponse(MockJsonResp);

    if (MockJsonResp) {

      const resp = await db.insert(MockInterview).values({
        mockId: uuidv4(),
        jsonMockResp: MockJsonResp,
        jobPosition: jobPosition,
        jobDesc: jobDesc,
        jobExperience: jobExp,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-YYYY')
      }).returning({ mockId: MockInterview.mockId });

      console.log("Inserted ID", resp)
    }
    else {
      console.log("ERROR");
    }

    setLoading(false);

  }


  return (
    <div>
      <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
        onClick={() => setOpenDialog(true)}
      >
        <h2 className='font-bold text-lg'>+ Add New</h2>
      </div>
      <Dialog open={openDialog}>

        <DialogContent className="bg-slate-100 max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl flex justify-start ">Tell us more about your job interview</DialogTitle>
            <DialogDescription>

              <form onSubmit={onSubmit}>
                <div className='text-black'>

                  <h2>Add Details about you job position/role, Job description and years of experience.</h2>

                  <div className='mt-7 my-2 gap-2 flex flex-col items-start'>
                    <label className='text-black font-semibold py-2'>Job Role/Job Position</label>
                    <Input className="border-black" placeholder="Ex. Full Satck Developer" required
                      onChange={(event) => setJobPosition(event.target.value)} />
                  </div>
                  <div className='my-2 gap-2 flex flex-col items-start'>
                    <label className='text-black font-semibold py-2'>Job Description/Tech Stack (In Short)</label>
                    <Textarea className="border-black" placeholder="Ex. React , Angular , Node , MySQL etc." required onChange={(event) => setJobDesc(event.target.value)} />
                  </div>
                  <div className='gap-2 flex flex-col items-start'>
                    <label className='text-black font-semibold py-2'>Years Of Experience</label>
                    <Input className="border-black" placeholder="Ex. 2" type="number" required onChange={(event) => setJobExp(event.target.value)} />
                  </div>
                </div>
                <div className='flex gap-5 justify-end pt-5'>
                  <Button variant="ghost" onClick={() => setOpenDialog(false)} className="text-black" type="button" >
                    Cancel
                  </Button>
                  <Button type="Submit" disable={loading}>
                    {loading ?
                      <>
                        <LoaderCircle className='animate-spin' />Generating from AI
                      </>
                      : 'Start Interview'
                    }
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default AddNewInterview