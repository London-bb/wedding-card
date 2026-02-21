import React, { useState, useEffect } from 'react';
import { saveMessage, fetchMessages, GuestMessage } from '@/services/guestbookService';
import { Loader2, Send } from 'lucide-react';

const GuestbookAI: React.FC = () => {
  const [guestName, setGuestName] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMessages = async () => {
      const data = await fetchMessages();
      setMessages(data);
      setIsLoading(false);
    };
    loadMessages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !message || isSending) return;

    setIsSending(true);

    // Google Sheet로 전송
    const success = await saveMessage(guestName, message);

    if (success) {
      alert("소중한 방명록이 신랑신부에게 전달되었습니다! 💌");

      // 화면에 즉시 반영 (임시)
      const newMessage = {
        name: guestName,
        msg: message,
        date: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
      };
      setMessages([newMessage, ...messages]);

      setGuestName('');
      setMessage('');
    } else {
      alert("전송에 실패했습니다. 다시 시도해주세요.");
    }

    setIsSending(false);
  };

  return (
    <section className="py-20 px-4 bg-white w-full" id="guestbook">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif text-stone-800 mb-2">방명록</h2>
          <p className="text-stone-500 text-sm">축하의 마음을 남겨주세요</p>
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
            disabled={isSending}
          />
          <textarea
            placeholder="축하 메시지를 작성해주세요..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border border-stone-200 rounded-lg h-32 focus:outline-none focus:ring-1 focus:ring-rose-300 resize-none"
            required
            disabled={isSending}
          />
          <button
            type="submit"
            disabled={isSending}
            className="w-full bg-rose-400 text-white py-3 rounded-lg font-medium hover:bg-rose-500 transition-colors flex items-center justify-center gap-2 shadow-md disabled:bg-stone-300"
          >
            {isSending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            {isSending ? "전송 중..." : "방명록 남기기"}
          </button>
        </form>

        {/* Messages List */}
        <div className="space-y-4 animate-fade-in">
          <h3 className="text-sm font-bold text-stone-500 text-center mb-4">
            축하 메시지
          </h3>
          {isLoading ? (
            <div className="flex justify-center p-8">
              <Loader2 size={24} className="animate-spin text-rose-300" />
            </div>
          ) : messages.length > 0 ? (
            <div className="max-h-80 overflow-y-auto space-y-3 p-2 bg-stone-50/50 rounded-lg border border-stone-100 scrollbar-thin scrollbar-thumb-rose-200 scrollbar-track-transparent">
              {messages.map((m, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg border border-stone-100 shadow-sm">
                  <div className="flex justify-between items-baseline mb-1">
                    <div className="font-bold text-stone-800 text-sm">{m.name}</div>
                    {m.date && <div className="text-xs text-stone-400">{m.date}</div>}
                  </div>
                  <div className="text-stone-600 text-sm whitespace-pre-wrap">{m.msg}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-stone-400 p-8">
              첫 번째 축하 메시지를 남겨주세요!
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default GuestbookAI;