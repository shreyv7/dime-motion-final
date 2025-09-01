import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { MessageCircle, X, Send, Bot, User, Settings, Plus, Trash2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Dime Motion's AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  // Training data - easily customizable responses
  const trainingData = {
    services: {
      keywords: ['service', 'offer', 'what do you do', 'capabilities', 'expertise'],
      responses: [
        "We offer video production, web development, AI-powered design, and creative consulting. What type of project are you interested in?",
        "Our services include: 🎬 Video Production, 💻 Web Development, 🤖 AI-Powered Design, and 🎨 Creative Consulting. Which area interests you most?",
        "We specialize in turning ideas into motion through video, web, and AI solutions. What's your project about?"
      ]
    },
    pricing: {
      keywords: ['price', 'cost', 'rate', 'how much', 'budget', 'quote'],
      responses: [
        "Our pricing varies based on project scope and requirements. The best way to get an accurate quote is to schedule a free consultation call. Would you like to book one?",
        "Pricing depends on project complexity, timeline, and deliverables. We offer free consultations to provide accurate estimates. Ready to discuss your project?",
        "We provide custom quotes based on your specific needs. Let's schedule a call to discuss your project and give you a detailed estimate."
      ]
    },
    contact: {
      keywords: ['contact', 'call', 'meeting', 'consultation', 'get in touch', 'reach out'],
      responses: [
        "Absolutely! You can schedule a free 30-minute consultation call through our website, or email us directly. What works best for you?",
        "Great! We offer free 30-minute consultation calls. You can book directly on our website or email us at hello@dimemotion.com. Which would you prefer?",
        "Perfect timing! We have availability for free consultation calls this week. Would you like to schedule one now?"
      ]
    },
    portfolio: {
      keywords: ['portfolio', 'work', 'examples', 'show me', 'previous work', 'case studies'],
      responses: [
        "We have a diverse portfolio including brand videos, web applications, and AI-powered solutions. Check out our reels section for some examples!",
        "Our portfolio showcases projects across video production, web development, and AI design. You can see examples in our Reels section. Any specific type of work you'd like to see?",
        "We've worked with clients across various industries. Check out our Reels section for video examples, or I can tell you about specific projects we've done."
      ]
    },
    greeting: {
      keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
      responses: [
        "Hello! Thanks for reaching out. How can I assist you with your creative project today?",
        "Hi there! Welcome to Dime Motion. I'm here to help you bring your creative vision to life. What can I help you with?",
        "Hey! Great to meet you. I'm here to help you explore our creative services. What's on your mind?"
      ]
    },
    process: {
      keywords: ['process', 'how does it work', 'workflow', 'timeline', 'steps'],
      responses: [
        "Our process is simple: 1) Discovery call to understand your needs, 2) Proposal and planning, 3) Creative development, 4) Review and revisions, 5) Final delivery. Want to learn more?",
        "We follow a streamlined 5-step process from initial consultation to final delivery. Each project is unique, so we customize our approach. Should I walk you through it?",
        "Our workflow starts with understanding your vision, then we plan, create, iterate, and deliver. We keep you involved every step of the way. Interested in the details?"
      ]
    },
    expertise: {
      keywords: ['experience', 'years', 'clients', 'industry', 'specialize'],
      responses: [
        "We have 3+ years of experience working with clients across various industries. We've created 2356+ videos and generated 100M+ views. What industry are you in?",
        "Our team brings together expertise in video production, web development, and AI technology. We've worked with startups, agencies, and established brands. Tell me about your industry!",
        "We specialize in creative technology solutions and have experience across multiple sectors. Our portfolio includes work for tech companies, creative agencies, and more. What's your field?"
      ]
    }
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Find the best matching category
    let bestMatch = null;
    let highestScore = 0;
    
    for (const [category, data] of Object.entries(trainingData)) {
      let score = 0;
      for (const keyword of data.keywords) {
        if (input.includes(keyword)) {
          score += 1;
        }
      }
      if (score > highestScore) {
        highestScore = score;
        bestMatch = category;
      }
    }
    
    // Return a random response from the best matching category
    if (bestMatch && trainingData[bestMatch as keyof typeof trainingData]) {
      const responses = trainingData[bestMatch as keyof typeof trainingData].responses;
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Fallback responses for unmatched queries
    const fallbackResponses = [
      "That's interesting! I'd love to help you with your project. Could you tell me more about what you're looking for?",
      "Great question! I'm here to help you understand how we can bring your vision to life. What specific aspect would you like to know more about?",
      "I'm excited to help you explore our services! Could you provide a bit more detail about your project or what you'd like to learn?",
      "That's a good point! Let me help you find the right information. Are you looking for details about our services, process, or something else?"
    ];
    
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Training functions
  const addNewCategory = () => {
    const categoryName = prompt('Enter new category name (e.g., "pricing", "services"):');
    if (categoryName && !trainingData[categoryName as keyof typeof trainingData]) {
      // In a real app, you'd save this to a database
      alert(`New category "${categoryName}" added! You can now add keywords and responses.`);
    }
  };

  const addNewResponse = (category: string) => {
    const response = prompt(`Add new response for ${category}:`);
    if (response) {
      // In a real app, you'd save this to a database
      alert(`New response added to ${category}!`);
    }
  };

  const addNewKeyword = (category: string) => {
    const keyword = prompt(`Add new keyword for ${category}:`);
    if (keyword) {
      // In a real app, you'd save this to a database
      alert(`New keyword "${keyword}" added to ${category}!`);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-end p-4">
          <Card className="w-full max-w-md h-[500px] bg-card border border-border shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Dime Motion AI</h3>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsTraining(!isTraining)}
                  className="h-8 w-8"
                  title="Training Mode"
                >
                  <Settings className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex items-start gap-2 max-w-[80%] ${
                      message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      message.sender === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div
                      className={`px-3 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-muted text-foreground px-3 py-2 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Training Interface */}
            {isTraining && (
              <div className="p-4 border-t border-border bg-muted/20">
                <h4 className="font-semibold text-sm mb-3 text-foreground">🤖 AI Training Mode</h4>
                <div className="space-y-3">
                  <Button
                    onClick={addNewCategory}
                    size="sm"
                    variant="outline"
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Category
                  </Button>
                  
                  <div className="text-xs text-muted-foreground space-y-2">
                    <p><strong>Current Categories:</strong></p>
                    {Object.keys(trainingData).map((category) => (
                      <div key={category} className="flex items-center gap-2">
                        <span className="capitalize">{category}</span>
                        <Button
                          onClick={() => addNewKeyword(category)}
                          size="sm"
                          variant="ghost"
                          className="h-6 px-2 text-xs"
                        >
                          + Keyword
                        </Button>
                        <Button
                          onClick={() => addNewResponse(category)}
                          size="sm"
                          variant="ghost"
                          className="h-6 px-2 text-xs"
                        >
                          + Response
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  size="icon"
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default Chatbot;
