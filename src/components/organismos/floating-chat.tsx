"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { ScrollArea } from "../../components/ui/scroll-area"
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?",
    sender: "bot",
    timestamp: new Date(),
  },
]

const botResponses = [
  "¿Necesitas ayuda con la creación de paralelos?",
  "Puedo ayudarte a gestionar horarios académicos.",
  "¿Tienes alguna pregunta sobre el sistema?",
  "Estoy aquí para asistirte con cualquier duda.",
  "¿Te gustaría que te explique cómo usar alguna funcionalidad?",
  "Puedo ayudarte a navegar por el panel de administración.",
  "¿Necesitas soporte técnico?",
  "¿Hay algo específico que te gustaría saber?",
]

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0)
      inputRef.current?.focus()
    }
  }, [isOpen])

  const sendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simular respuesta del bot
    setTimeout(
      () => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponses[Math.floor(Math.random() * botResponses.length)],
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)

        if (!isOpen) {
          setUnreadCount((prev) => prev + 1)
        }
      },
      1000 + Math.random() * 2000,
    )
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div>
      {/* Botón flotante */}
      <div className="fixed bottom-6 right-10 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 relative cursor-pointer"
          >
            <MessageCircle className="h-6 w-6 text-white" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </Badge>
            )}
          </Button>
        )}
      </div>

      {/* Panel de chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-10 z-50 transition-all duration-500">
          <Card className={`w-96 shadow-xl/30 p-0 border-0 transition-all duration-300 ${isMinimized ? "h-16" : "h-auto"} `}>
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg p-2" >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-sm">Asistente Virtual</CardTitle>
                    <p className="text-xs text-blue-100">En línea</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="h-8 w-8 p-0 text-white hover:bg-white/20"
                  >
                    {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 p-0 text-white hover:bg-white/20"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {!isMinimized && (
              <CardContent className="p-0 flex flex-col h-96">
                {/* Área de mensajes */}
                <ScrollArea className="flex-1 p-3 overflow-y-auto">
                  <div className="space-y-1">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-2 ${
                            message.sender === "user" ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-800"
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            {message.sender === "bot" && <Bot className="h-4 w-4 mt-0.5 text-blue-500 flex-shrink-0" />}
                            {message.sender === "user" && <User className="h-4 w-4 mt-0.5 text-white flex-shrink-0" />}
                            <div className="flex-1">
                              <p className="text-sm">{message.text}</p>
                              <p
                                className={`text-xs text-end ${
                                  message.sender === "user" ? "text-blue-100" : "text-slate-500"
                                }`}
                              >
                                {formatTime(message.timestamp)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-slate-100 rounded-lg p-3 max-w-[80%]">
                          <div className="flex items-center gap-2">
                            <Bot className="h-4 w-4 text-blue-500" />
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                              <div
                                className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Área de input */}
                <div className="p-4 border-t bg-slate-50">
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Escribe tu mensaje..."
                      className="flex-1 border-slate-300 focus:border-blue-500"
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={!inputValue.trim()}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                        ¿Cómo crear paralelos?
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                        Ayuda con horarios
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      )}
    </div>
  )
}
