import { RadioGroup } from '@headlessui/react'
import React, { useEffect, useState } from 'react'


const CtaPointChoice: React.FC<{ leftBtnPoint: string, rightBtnPoint: string, value:{matchId: string, teamId: string, bonusChoice:string}, onChange: ()=> void}> = ({ leftBtnPoint, rightBtnPoint, value, onChange }) => {
  const [selectedChoice, setSelectedChoice] = useState(null);
  useEffect(()=>{
    console.log(selectedChoice)
  }, [selectedChoice])
  return (
    
    <RadioGroup value={selectedChoice} onChange={setSelectedChoice} className="flex justify-center font-sans text-xs my-3 font-medium">
        <RadioGroup.Option value={"1"}  className="mr-2 bg-transparent border border-black text-black hover:bg-green-500 hover:text-white py-2 px-5 rounded-3xl">
            {leftBtnPoint}
        </RadioGroup.Option >
        <RadioGroup.Option  value={"2"} className="bg-green-500 text-white hover:bg-green-600 py-2 px-5 rounded-3xl">
            {rightBtnPoint}
        </RadioGroup.Option >
    </RadioGroup>

  )
}

export default CtaPointChoice
