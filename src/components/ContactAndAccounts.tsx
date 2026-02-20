import React, { useState } from 'react';
import { Phone, MessageCircle, Copy, X, Gift, Heart } from 'lucide-react';
import { CONTACTS, GROOM_ACCOUNTS, BRIDE_ACCOUNTS } from '@/config/constants';
import { BankAccount } from '@/types/types';

const AccountItem: React.FC<{ account: BankAccount }> = ({ account }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`${account.bank} ${account.accountNumber}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex justify-between items-center py-4 border-b border-stone-100 last:border-0">
            <div className="text-left">
                <div className="text-[13px] font-semibold text-stone-700">{account.bank}</div>
                <div className="text-[12px] text-stone-500 mt-0.5">{account.accountNumber}</div>
                <div className="text-[11px] text-stone-400 mt-0.5">예금주: {account.name}</div>
            </div>
            <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[11px] px-3 py-1.5 bg-stone-50 text-stone-600 rounded-full border border-stone-200 hover:bg-stone-100 transition-colors"
            >
                <Copy size={12} />
                {copied ? '복사됨' : '복사'}
            </button>
        </div>
    );
};

const ContactAndAccounts: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="py-16 px-6 bg-white rounded-3xl shadow-sm border border-stone-100">
            <div className="max-w-xs mx-auto text-center">
                <div className="mb-8">
                    <h3 className="text-xl font-serif text-stone-800 mb-2">연락처</h3>
                    <div className="w-8 h-[1px] bg-stone-200 mx-auto"></div>
                </div>

                {/* Contact Logic */}
                <div className="space-y-6 mb-12">
                    {CONTACTS.map((contact, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex flex-col items-start">
                                <span className="text-[11px] text-stone-400 font-medium uppercase tracking-wider">{contact.role}</span>
                                <span className="text-base text-stone-700 font-serif">{contact.name}</span>
                            </div>
                            <div className="flex gap-3">
                                <a
                                    href={`tel:${contact.phone}`}
                                    className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-500 hover:bg-stone-100 hover:text-stone-800 transition-all border border-stone-100"
                                    aria-label="전화하기"
                                >
                                    <Phone size={18} />
                                </a>
                                <a
                                    href={`sms:${contact.phone}`}
                                    className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-400 hover:bg-rose-100 hover:text-rose-500 transition-all border border-rose-100"
                                    aria-label="문자하기"
                                >
                                    <MessageCircle size={18} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Account Button */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full py-4 px-6 bg-stone-800 text-white rounded-2xl flex items-center justify-center gap-2 hover:bg-stone-700 transition-all shadow-md active:scale-95"
                >
                    <Gift size={18} className="text-stone-300" />
                    <span className="text-sm font-medium tracking-wide">마음 전하실 곳</span>
                </button>
            </div>

            {/* Account Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
                    <div className="w-full sm:max-w-sm bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden animate-slideUp">
                        <div className="p-6 border-b border-stone-50 flex justify-between items-center">
                            <h4 className="text-lg font-serif text-stone-800">마음 전하실 곳</h4>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 text-stone-400 hover:text-stone-800 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 max-h-[70vh] overflow-y-auto">
                            <div className="mb-8">
                                <div className="text-[12px] font-bold text-stone-400 mb-4 tracking-widest uppercase">신랑 측</div>
                                <div className="space-y-1">
                                    {GROOM_ACCOUNTS.map((acc, idx) => (
                                        <AccountItem key={idx} account={acc} />
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="text-[12px] font-bold text-stone-400 mb-4 tracking-widest uppercase">신부 측</div>
                                <div className="space-y-1">
                                    {BRIDE_ACCOUNTS.map((acc, idx) => (
                                        <AccountItem key={idx} account={acc} />
                                    ))}
                                </div>
                            </div>

                            <p className="mt-8 text-center text-[11px] text-stone-400 leading-relaxed">
                                축하해주시는 따뜻한 마음 감사히 받겠습니다.<br />
                                참석하셔서 자리를 빛내주시는 것만으로도 충분한 큰 선물입니다.
                            </p>
                        </div>
                    </div>
                    {/* Backdrop Close Click */}
                    <div className="absolute inset-0 -z-10" onClick={() => setIsModalOpen(false)}></div>
                </div>
            )}
        </div>
    );
};

export default ContactAndAccounts;
