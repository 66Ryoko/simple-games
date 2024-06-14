import { clsx } from 'clsx';
import { kanit } from '@/app/[locale]/fonts';
interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  bold?: boolean;
}
export default function BaseButton({
  children,
  className,
  bold,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      className={clsx(
        className,
        `${kanit.className} flex h-full w-full items-center justify-center border border-gray-100 bg-gray-50 p-1 hover:bg-gray-100`,
        bold ? 'font-bold' : 'font-normal',
      )}
    >
      {children}
    </button>
  );
}
