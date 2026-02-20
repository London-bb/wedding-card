import React, { useState } from 'react';
import { GROOM_ACCOUNTS, BRIDE_ACCOUNTS } from '@/config/constants';
import { BankAccount } from '@/types/types';
import { ChevronDown, ChevronUp, Copy } from 'lucide-react';

const AccountItem: React.FC<{ account: BankAccount }> = ({ account }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${account.bank} ${account.accountNumber}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex justify-between items-center py-3 border-b border-stone-100 last:border-0">
      <div className="text-left">
        <div className="text-sm font-medium text-stone-700">{account.bank}</div>
        <div className="text-xs text-stone-500">계좌번호: {account.accountNumber}</div>
        <div className="text-xs text-stone-500">예금주: {account.name}</div>
      </div>
      <button
        onClick={handleCopy}
        className="flex items-center gap-1 text-xs px-3 py-1 bg-stone-100 text-stone-600 rounded hover:bg-stone-200 transition-colors"
      >
        <Copy size={12} />
        {copied ? '복사됨' : '복사'}
      </button>
    </div>
  );
};

const Accordion: React.FC<{ title: string; accounts: BankAccount[] }> = ({ title, accounts }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 border border-stone-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-white hover:bg-stone-50 transition-colors"
      >
        <span className="font-medium text-stone-700">{title}</span>
        {isOpen ? <ChevronUp size={18} className="text-stone-400" /> : <ChevronDown size={18} className="text-stone-400" />}
      </button>

      {isOpen && (
        <div className="bg-stone-50/50 p-4 animate-fadeIn">
          {accounts.map((acc, idx) => (
            <AccountItem key={idx} account={acc} />
          ))}
        </div>
      )}
    </div>
  );
};

const Accounts: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-serif text-stone-800 mb-2">마음 전하기</h2>
        <p className="text-stone-500 text-sm mb-8">
          참석이 가장 큰 선물입니다. 마음을 전하고 싶으신 분들을 위해 계좌번호를 안내드립니다.
        </p>

        <Accordion title="신랑 측" accounts={GROOM_ACCOUNTS} />
        <Accordion title="신부 측" accounts={BRIDE_ACCOUNTS} />
      </div>
    </section>
  );
};

export default Accounts;