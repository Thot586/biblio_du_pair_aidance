import { useEffect } from 'react';
import { SITE_SHORT_TITLE } from '@/content/site';

export function usePageTitle(title: string): void {
  useEffect(() => {
    document.title = `${title} | ${SITE_SHORT_TITLE}`;
  }, [title]);
}
