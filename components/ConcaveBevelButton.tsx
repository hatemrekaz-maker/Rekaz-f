
'use client'
import { motion } from 'framer-motion'
export default function ConcaveBevelButton({children, onClick}:{children:React.ReactNode, onClick?:()=>void}){
  return (
    <motion.button
      className="btn-concave"
      whileTap={{ scale: 0.98, rotate: -2 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}
