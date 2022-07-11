import { Text } from './Text';
import { TitleProps } from './Title';

interface HeaderProps extends TitleProps {
  sorted?: 'asc' | 'desc' | false;
}
export function Header({ sorted = false, ...other }: HeaderProps) {
  return (
    <div>
      <Text {...other}>Header</Text>
      {sorted
        ? {
            asc: ' 🔼',
            desc: ' 🔽',
          }[sorted]
        : null}
    </div>
  );
}
