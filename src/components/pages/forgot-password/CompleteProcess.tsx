import React from 'react'
import { Props } from './pages.types'

const CompleteProcess: React.FC<Props> = () => {
  return (
    <>
      <div className='flex flex-col gap-4 items-start max-w-96 w-full'>
        <h1 className='text-xl font-bold'>All done!</h1>
        <p className='text-sm'>Your password has been reset successfully</p>
      </div>
    </>
  )
}

export default CompleteProcess
