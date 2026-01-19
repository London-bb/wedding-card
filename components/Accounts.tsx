import React, { useState } from 'react';
import { GROOM_ACCOUNTS, BRIDE_ACCOUNTS } from '../constants';
import { BankAccount } from '../types';
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
        <div className="text-xs text-stone-500">Account: {account.accountNumber}</div>
        <div className="text-xs text-stone-500">Name: {account.name}</div>
      </div>
      <button 
        onClick={handleCopy}
        className="flex items-center gap-1 text-xs px-3 py-1 bg-stone-100 text-stone-600 rounded hover:bg-stone-200 transition-colors"
      >
        <Copy size={12} />
        {copied ? 'Copied' : 'Copy'}
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
        <h2 className="text-2xl font-serif text-stone-800 mb-2">Gift for the Couple</h2>
        <p className="text-stone-500 text-sm mb-8">
          Your presence is the greatest gift. However, for those who wish to express their congratulations with a gift, we have prepared this.
        </p>

        <Accordion title="Groom Side" accounts={GROOM_ACCOUNTS} />
        <Accordion title="Bride Side" accounts={BRIDE_ACCOUNTS} />
      </div>
    </section>
  );
};

export default Accounts;