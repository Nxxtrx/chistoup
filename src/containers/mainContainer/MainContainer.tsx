import React, { FC, ReactNode } from 'react'

interface MainContainerProps {
  children: ReactNode,
}

const MainContainer: FC<MainContainerProps> = ({children}) => {
  return (
    <main className='main'>
      {children}
    </main>
  )
}

export default MainContainer