import React from 'react'

const BonusBox: React.FC<{ points: string, text: string}> = ({ points, text }) => {
  return (
    <div className="flex flex-col items-center justify-center">
        <img
            src="/assets/bonus2.png"
            alt= "Bonus logo"
            style={{
                width: "5.2rem",
                height: "2rem"
            }}
            className="mb-1"
        />
        <p className="text-xs font-semibold text-center text-points">{points} pts</p>
        <p className="font-black text-xs my-1"> {text} </p>
    </div>
  )
}

export default BonusBox
