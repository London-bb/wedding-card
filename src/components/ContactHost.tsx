import React, { useState } from 'react';
import { Phone, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { CONTACTS, COUPLE } from '@/config/constants';

const ContactHost: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Expanded contact list derived from constants if possible, 
    // but standard practice is Groom/Bride + Parents. 
    // Since we only have basic CONTACTS in constants.ts, we'll try to use COUPLE data if we want to expand, 
    // but for now let's stick to the CONTACTS array for simplicity as per existing data.
    // We can also hardcode parents if we assume standard structure, but safer to use what's there.

    return (
        <div className="py-12 px-6 bg-stone-50">
            <div className="max-w-xs mx-auto text-center">
                <h3 className="text-xl font-serif text-stone-600 mb-2">Contact</h3>
                <p className="text-stone-400 text-sm mb-6">Call or Text us with any questions</p>

                <div className="space-y-4">
                    {CONTACTS.map((contact, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-stone-100">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-serif text-lg text-stone-700">{contact.role} <span className="font-sans text-sm font-bold text-stone-500 ml-1">{contact.name}</span></span>
                            </div>
                            <div className="flex gap-2">
                                <a href={`tel:${contact.phone}`} className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-600 py-2 rounded-md flex items-center justify-center gap-2 transition-colors">
                                    <Phone size={16} />
                                    <span className="text-sm">Call</span>
                                </a>
                                <a href={`sms:${contact.phone}`} className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-600 py-2 rounded-md flex items-center justify-center gap-2 transition-colors">
                                    <MessageCircle size={16} />
                                    <span className="text-sm">Message</span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContactHost;
