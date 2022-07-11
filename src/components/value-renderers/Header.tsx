import { Title, TitleProps } from './Title';

interface HeaderProps extends TitleProps {
  sorted?: 'asc' | 'desc' | false;
}
export function Header({ sorted = false, ...other }: HeaderProps) {
  return (
    <div>
      <Title {...other}>Header</Title>
      {sorted
        ? {
            asc: ' 🔼',
            desc: ' 🔽',
          }[sorted]
        : null}
    </div>
  );
}
