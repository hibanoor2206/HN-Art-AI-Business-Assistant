import { Palette } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  onClick?: () => void;
}

export function Logo({ size = 'md', showText = true, onClick }: LogoProps) {
  const dims = { sm: 'h-9 w-9', md: 'h-11 w-11', lg: 'h-14 w-14' };
  const iconSize = { sm: 18, md: 22, lg: 28 };
  const textSize = { sm: 'text-base', md: 'text-lg', lg: 'text-2xl' };
  const subSize = { sm: 'text-[9px]', md: 'text-[10px]', lg: 'text-xs' };

  return (
    <button onClick={onClick} className="flex items-center gap-2.5 transition hover:opacity-90">
      <div className={`${dims[size]} flex-shrink-0 rounded-xl bg-gradient-to-br from-sage-700 to-sage-900 flex items-center justify-center shadow-md ring-1 ring-gold-500/20`}>
        <Palette size={iconSize[size]} className="text-gold-400" />
      </div>
      {showText && (
        <div className="text-left leading-none">
          <p className={`font-serif font-bold ${textSize[size]} text-sage-800 dark:text-beige-100`}>
            HN Art <span className="text-gradient-gold">AI</span>
          </p>
          <p className={`mt-1 font-medium ${subSize[size]} text-sage-500 dark:text-sage-400`}>
            Smart Business Assistant
          </p>
        </div>
      )}
    </button>
  );
}
