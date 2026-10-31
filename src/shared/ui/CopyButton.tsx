import { useState } from 'react';
import { copyRichText } from '@/shared/lib/clipboard';
import { Button } from './Button';

interface CopyButtonProps {
  label?: string;
  html: string;
  text: string;
}

export function CopyButton({ label = 'Copier', html, text }: CopyButtonProps) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  const copy = async () => {
    setStatus((await copyRichText(html, text)) ? 'copied' : 'failed');
    window.setTimeout(() => setStatus('idle'), 2500);
  };

  return (
    <>
      <Button variant="secondary" onClick={() => void copy()}>
        {status === 'copied' ? 'Copié' : label}
      </Button>
      <span role="status" className="visually-hidden">
        {status === 'copied' && 'Copié dans le presse-papier'}
      </span>
      {status === 'failed' && (
        <span role="alert">Copie impossible : sélectionnez le texte à la main.</span>
      )}
    </>
  );
}
