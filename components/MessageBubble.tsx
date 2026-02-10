'use client'

import { motion } from 'framer-motion'
import { ChatMessage } from '../types'
import { User, Bot } from 'lucide-react'

interface Props {
  message: ChatMessage
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-medical-500' : 'bg-gradient-to-br from-medical-400 to-medical-600'
      }`}>
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>

      <div className={`flex-1 ${isUser ? 'flex justify-end' : ''}`}>
        <div className={`inline-block max-w-[85%] px-4 py-3 rounded-2xl ${
          isUser 
            ? 'bg-medical-500 text-white rounded-tr-sm' 
            : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    </motion.div>
  )
}
