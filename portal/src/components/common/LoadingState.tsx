import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  message?: string;
  className?: string;
}

export function LoadingState({ message = 'Loading...', className }: Props) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 py-10 text-sm text-slate-600', className)}>
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
      <p>{message}</p>
    </div>
  );
}
