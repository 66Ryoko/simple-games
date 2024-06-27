import { clsx } from 'clsx';
import { kanit } from '@/app/[locale]/fonts';
interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  bold?: boolean;
  highlight?: boolean;
  bounce?: boolean;
}
export default function BaseButton({
  children,
  className,
  bold,
  highlight,
  bounce,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      className={clsx(
        className,
        `${kanit.className} border-primary-regular flex h-full w-full items-center justify-center border`,
        bold ? 'font-bold' : 'font-normal',
        bounce ? 'animate-bounce' : '',
        highlight
          ? 'text-secondary-text bg-secondary-light hover:bg-secondary-regular p-1'
          : 'bg-primary-light hover:bg-primary-regular p-1',
      )}
    >
      {children}
    </button>
  );
}
