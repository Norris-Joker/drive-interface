import { motion } from 'framer-motion';
import { ArrowLeft, MessageSquare, Mic, Send, User } from 'lucide-react';
import { useState } from 'react';

interface MessagesScreenProps {
  onBack: () => void;
}

const MessagesScreen = ({ onBack }: MessagesScreenProps) => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);

  const conversations = [
    {
      id: 1,
      name: 'Marie Dupont',
      lastMessage: 'D\'accord, à tout à l\'heure !',
      time: '14:32',
      unread: 2,
    },
    {
      id: 2,
      name: 'Jean Martin',
      lastMessage: 'Tu arrives bientôt ?',
      time: '12:15',
      unread: 0,
    },
    {
      id: 3,
      name: 'Groupe Famille',
      lastMessage: 'Papa: On se retrouve dimanche',
      time: 'Hier',
      unread: 5,
    },
    {
      id: 4,
      name: 'Sophie Bernard',
      lastMessage: 'Merci pour ton aide !',
      time: 'Hier',
      unread: 0,
    },
  ];

  const messages = [
    { id: 1, text: 'Salut ! Tu es en route ?', sent: false, time: '14:28' },
    { id: 2, text: 'Oui, je serai là dans 15 minutes', sent: true, time: '14:30' },
    { id: 3, text: 'D\'accord, à tout à l\'heure !', sent: false, time: '14:32' },
  ];

  if (selectedConversation !== null) {
    const conversation = conversations.find((c) => c.id === selectedConversation);
    return (
      <div className="screen-transition h-full pt-16 pb-28 px-6 flex flex-col">
        <motion.button
          onClick={() => setSelectedConversation(null)}
          className="flex items-center gap-2 text-primary mb-4"
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">{conversation?.name}</span>
        </motion.button>

        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  message.sent
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-secondary text-foreground rounded-bl-md'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sent ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}
                >
                  {message.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="glass-effect rounded-2xl p-3 flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-secondary/50 transition-colors">
            <Mic className="w-5 h-5 text-primary" />
          </button>
          <input
            type="text"
            placeholder="Message..."
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
          />
          <button className="p-2 rounded-full bg-primary hover:bg-primary/80 transition-colors">
            <Send className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen-transition h-full pt-16 pb-28 px-6">
      <motion.button
        onClick={onBack}
        className="flex items-center gap-2 text-primary mb-6"
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Retour</span>
      </motion.button>

      <h1 className="text-2xl font-bold text-foreground mb-6">Messages</h1>

      <div className="space-y-3">
        {conversations.map((conversation, index) => (
          <motion.button
            key={conversation.id}
            onClick={() => setSelectedConversation(conversation.id)}
            className="w-full glass-effect rounded-xl p-4 flex items-center gap-4 text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
              <User className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium text-foreground">{conversation.name}</p>
                <span className="text-xs text-muted-foreground">{conversation.time}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
            </div>
            {conversation.unread > 0 && (
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground">
                  {conversation.unread}
                </span>
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default MessagesScreen;
