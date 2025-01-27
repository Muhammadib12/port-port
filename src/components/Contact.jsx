import React from 'react'
import { CONTACT } from '../constants'
import {motion} from 'framer-motion';



function Contact() {
  return (
    <div className='borderb border-neutral-900 pb-20'>

        <motion.h2 whileInView={{opacity:1,y:0}} initial={{opacity:0,y:-100}} transition={{duration:1.5}} className='text-center text-4xl text-neutral-500 my-10'>Get in touch</motion.h2>
        <motion.div whileInView={{opacity:1,y:0}} initial={{opacity:0,y:-100}} transition={{duration:2}} className='text-center tracking-tighter '>
            <motion.p whileInView={{opacity:1,x:0}} initial={{opacity:0,x:-100}} transition={{duration:2.5}} className='my-4 '>{CONTACT.address}</motion.p>
            <motion.p whileInView={{opacity:1,x:0}} initial={{opacity:0,x:100}} transition={{duration:3}} className='my-4 '>{CONTACT.phoneNo}</motion.p>
            <motion.a whileInView={{opacity:1,y:0}} initial={{opacity:0,y:-100}} transition={{duration:3.5}}  href={`mailto:${CONTACT.email}`} className='border-b'>{CONTACT.email}</motion.a>
        </motion.div>

    </div>
  )
}

export default Contact