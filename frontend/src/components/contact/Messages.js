import React from 'react'
import './Message.css'
const Messages = ({own}) => {
  return (
    <div className={own ? 'message-wrapper-own' : 'message-wrapper'}>
        <p className={own ? 'message-own' : 'message'}>nrejnr wegw ioeguowe giwe gwe gw we gwe gwpewegw 
        </p>
        <p className='date'>23min ago</p>
    </div>
  )
}

export default Messages