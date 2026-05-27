import { useState } from 'react'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

export const AIAgent = () => {
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', text: 'Hello! I\'m your AI assistant. How can I help you today?' },
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return

    setMessages([
      ...messages,
      { id: messages.length + 1, role: 'user', text: input },
      {
        id: messages.length + 2,
        role: 'ai',
        text: 'I\'m processing your request. This is a demo interface. Connect to a backend AI service for real responses.',
      },
    ])
    setInput('')
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#F1F5F9]">AI Agent Assistant</h2>

      <Card className="p-6 flex flex-col h-[500px]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-md ${
                  msg.role === 'user'
                    ? 'bg-[#6366F1] text-white'
                    : 'bg-white/5 border border-white/10 text-[#F1F5F9]'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            className="!m-0"
          />
          <Button variant="primary" onClick={handleSend}>
            Send
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default AIAgent
