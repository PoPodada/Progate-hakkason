import React from 'react'
import TeamPreview from './TeamPreview'
const Home:React.FC = () => {
  return (
    <div className='max-w-[900px] mx-auto mt-16'>
      <h2 className='text-2xl font-bold'>入っているチーム一覧</h2>
      <TeamPreview></TeamPreview>
    
    </div>
  )
}

export default Home;
