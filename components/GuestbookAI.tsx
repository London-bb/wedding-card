import React, { useState } from 'react';
import { generateWeddingWish } from '../services/geminiService';
import { COUPLE } from '../constants';
import { Sparkles, Loader2, Send } from 'lucide-react';

const GuestbookAI: React.FC = () => {
  const [relationship, setRelationship] = useState('Friend');
  const [tone, setTone] = useState('Heartfelt');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [guestName, setGuestName] = useState('');

  // In a real app, this would submit to a backend. Here we just simulate.
  const [messages, setMessages] = useState<{ name: string, msg: string }[]>([
    { name: "Alice", msg: "Congratulations! So happy for you both!" },
    { name: "Bob", msg: "Wishing you a lifetime of love and joy." }
  ]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    const coupleName = `${COUPLE.groom.firstName} & ${COUPLE.bride.firstName}`;
    const wish = await generateWeddingWish(relationship, tone, coupleName);
    setGeneratedMessage(wish);
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !generatedMessage) return;

    setMessages([{ name: guestName, msg: generatedMessage }, ...messages]);
    setGuestName('');
    setGeneratedMessage('');
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif text-stone-800 mb-2">방명록</h2>
          <p className="text-stone-500 text-sm">축하의 마음을 남겨주세요</p>
        </div>

        {/* AI Helper Section */}
        <div className="bg-rose-50 rounded-xl p-6 mb-8 border border-rose-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-rose-800 font-medium">
            <Sparkles size={18} />
            <span>AI 축하 문구 도우미</span>
          </div>
          <p className="text-sm text-stone-600 mb-4">
            어떤 말을 남길지 고민되시나요? AI가 예쁜 문구를 추천해드려요.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs text-stone-500 mb-1">관계</label>
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full text-sm p-2 rounded border border-rose-200 bg-white focus:outline-none focus:border-rose-400"
              >
                <option value="Friend">친구</option>
                <option value="Family">가족</option>
                <option value="Colleague">직장동료</option>
                <option value="Relative">친척</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-stone-500 mb-1">말투</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full text-sm p-2 rounded border border-rose-200 bg-white focus:outline-none focus:border-rose-400"
              >
                <option value="Heartfelt">감동적인</option>
                <option value="Funny">유머러스한</option>
                <option value="Formal">정중한</option>
                <option value="Poetic">시적인</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-white text-rose-500 border border-rose-200 py-2 rounded-lg text-sm font-medium hover:bg-rose-50 transition-colors flex items-center justify-center gap-2"
          >
            {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
            축하 문구 생성하기!
          </button>
        </div>

        {/* Message Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-12">
          <input
            type="text"
            placeholder="성함"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className="w-full p-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-300"
            required
          />
          <textarea
            placeholder="축하 메시지를 작성해주세요..."
            value={generatedMessage}
            onChange={(e) => setGeneratedMessage(e.target.value)}
            className="w-full p-3 border border-stone-200 rounded-lg h-32 focus:outline-none focus:ring-1 focus:ring-rose-300 resize-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-rose-400 text-white py-3 rounded-lg font-medium hover:bg-rose-500 transition-colors flex items-center justify-center gap-2 shadow-md"
          >
            <Send size={18} />
            방명록 남기기
          </button>
        </form>

        {/* Messages List */}
        <div className="space-y-4">
          {messages.map((m, idx) => (
            <div key={idx} className="bg-stone-50 p-4 rounded-lg border border-stone-100">
              <div className="font-bold text-stone-800 text-sm mb-1">{m.name}</div>
              <div className="text-stone-600 text-sm">{m.msg}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuestbookAI;