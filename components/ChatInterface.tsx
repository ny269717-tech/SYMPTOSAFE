'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader2, RotateCcw } from 'lucide-react'
import { ChatMessage, AnalysisResult } from '../types'
import MessageBubble from './MessageBubble'

interface Props {
  onAnalysisComplete: (result: AnalysisResult) => void
  onReset: () => void
  disabled?: boolean
}

export default function ChatInterface({ onAnalysisComplete, onReset, disabled }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m here to help you understand your symptoms. Please describe what you\'re experiencing, and I\'ll ask follow-up questions to better understand your situation.',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading || disabled) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setIsTyping(true)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage]
        })
      })

      const data = await response.json()
      setIsTyping(false)

      if (data.needsMoreInfo) {
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.followUpQuestion,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, assistantMessage])
      } else {
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Thank you for providing that information. I\'ve completed my analysis. Please review the results on the right.',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, assistantMessage])
        onAnalysisComplete(data.result)
      }
    } catch (error) {
      setIsTyping(false)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again or seek immediate medical attention if your symptoms are severe.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: 'Hello! I\'m here to help you understand your symptoms. Please describe what you\'re experiencing, and I\'ll ask follow-up questions to better understand your situation.',
        timestamp: new Date()
      }
    ])
    onReset()
  }

  return (
    <div className="glass-card rounded-3xl p-6 h-[600px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Symptom Chat</h2>
        {messages.length > 1 && (
          <button
            onClick={handleResetChat}
            className="flex items-center gap-2 px-4 py-2 text-sm text-medical-600 hover:bg-medical-50 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
        <AnimatePresence>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-gray-500"
          >
            <div className="typing-indicator flex gap-1">
              <span className="w-2 h-2 bg-medical-400 rounded-full"></span>
              <span className="w-2 h-2 bg-medical-400 rounded-full"></span>
              <span className="w-2 h-2 bg-medical-400 rounded-full"></span>
            </div>
            <span className="text-sm">Analyzing...</span>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your symptoms..."
          disabled={isLoading || disabled}
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-medical-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim() || disabled}
          className="px-6 py-3 bg-gradient-to-r from-medical-500 to-medical-600 text-white rounded-xl hover:from-medical-600 hover:to-medical-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </form>
    </div>
  )
}
