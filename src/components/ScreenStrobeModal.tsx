import React from 'react';
import { EyeOff, AlertOctagon } from 'lucide-react';

interface ScreenStrobeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScreenStrobeModal: React.FC<ScreenStrobeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 animate-strobe select-none cursor-pointer" onClick={onClose}>
      <div className="pt-8 text-center bg-black/60 backdrop-blur-md px-6 py-4 rounded-2xl max-w-md border border-white/20 shadow-2xl">
        <div className="flex items-center justify-center gap-2 text-white font-extrabold text-xl mb-1">
          <AlertOctagon className="w-6 h-6 text-red-500 animate-bounce" />
          <span>VISUAL SOS BEACON ACTIVE</span>
        </div>
        <p className="text-sm font-semibold text-white/90">
          Point screen toward search aircraft, vehicles, or rescuers.
        </p>
      </div>

      <div className="text-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="px-8 py-4 rounded-2xl bg-black text-white text-base font-extrabold tracking-wider border-2 border-white/80 shadow-2xl hover:bg-slate-900 active:scale-95 transition flex items-center gap-3"
        >
          <EyeOff className="w-5 h-5 text-red-400" />
          <span>STOP VISUAL STROBE (TAP ANYWHERE)</span>
        </button>
      </div>
    </div>
  );
};
