import React from 'react'
import VideoPlayer from './VideoPlayer'
import V1 from './V1.mp4'
import V2 from "./V2.mp4"
import V3 from "./V3.mp4"
const App = () => {
  return (
    <div>
      <VideoPlayer src={V1} title={"Crackers"}/>
      <VideoPlayer src={V2} title={"Moon"}/>
      <VideoPlayer src={V3} title={"Beach"}/>
    </div>
  )
}

export default App