"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"



const AddNewInterview = () => {

  const[openDialog , setOpenDialog] = useState(false)


  return (
    <div>
      <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
      onClick={() => setOpenDialog(true)}
      >
        <h2 className='font-bold text-lg'>+ Add New</h2>
      </div>
      <Dialog open = {openDialog}>
        
        <DialogContent className="bg-slate-100">
          <DialogHeader>
            <DialogTitle className="text-2xl flex justify-start ">Tell us more about your job interview</DialogTitle>
            <DialogDescription>
              <div className='flex justify-start text-black'>
                <h2>Add Details about you job position/role, Job description and years of experience.</h2>
              </div>
              <div className='flex gap-5 justify-end pt-5'>
                <Button variant="ghost" onClick={()=>setOpenDialog(false)} className="text-black">Cancel</Button>
                <Button>Start Interview</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default AddNewInterview