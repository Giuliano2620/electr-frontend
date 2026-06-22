'use client';

import { useEffect } from 'react';

export default function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 bg-black text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium animate-in slide-in-from-bottom z-50">
      {message}
    </div>
  );
}