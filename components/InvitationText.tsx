import React from 'react';
import { INVITATION_TEXT, COUPLE } from '../constants';
import { Heart } from 'lucide-react';

const InvitationText: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-stone-50 text-center">
      <div className="max-w-2xl mx-auto space-y-12">
        <div className="flex justify-center text-rose-300 mb-8">
          <Heart size={24} fill="currentColor" />
        </div>

        <h2 className="text-3xl font-serif text-stone-800 mb-6">Invitation</h2>

        <p className="whitespace-pre-line text-stone-600 leading-loose font-light text-lg">
          {INVITATION_TEXT}
        </p>

        <div className="mt-12 pt-12 border-t border-stone-200">
          <div className="grid grid-cols-1 gap-6 text-stone-700">
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="text-sm text-stone-500 uppercase tracking-wider mb-1">신랑</div>
              <div className="text-xl font-serif">{COUPLE.groom.firstName}</div>
              <div className="text-xs text-stone-500">
                {COUPLE.groom.father} & {COUPLE.groom.mother} 의 장남
              </div>
            </div>

            <div className="text-rose-300 font-script text-2xl">&</div>

            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="text-sm text-stone-500 uppercase tracking-wider mb-1">신부</div>
              <div className="text-xl font-serif">{COUPLE.bride.firstName}</div>
              <div className="text-xs text-stone-500">
                {COUPLE.bride.father} & {COUPLE.bride.mother} 의 장녀
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvitationText;