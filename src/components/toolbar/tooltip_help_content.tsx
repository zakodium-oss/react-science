import styled from '@emotion/styled';
import type { Mandatory } from '@zakodium/utils';
import type { CSSProperties } from 'react';

const shortcutBoxSize = 1.5;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
`;

interface TitleProps {
  size: CSSProperties['fontSize'];
}

const Title = styled.span<TitleProps>`
  font-size: ${({ size }) => size};
  flex: 1;
  padding: 5px 0;
  text-align: start;
`;
const Description = styled.p`
  padding-top: 1rem;
  font-size: 0.7rem;
  text-align: start;
`;

const ShortcutItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.2rem;
  border: 1px solid;
  border-radius: 4px;
  height: ${shortcutBoxSize}rem;
  min-width: ${shortcutBoxSize}rem;
  margin-left: 5px;
  font-size: 0.75rem;
  font-weight: bold;
`;

const SubtitleItem = styled.div`
  position: relative;
  padding-left: 15px;
  box-sizing: border-box;

  ::before {
    position: absolute;
    top: ${shortcutBoxSize / 2}rem;
    left: 0;
    width: 10px;
    height: 1px;
    margin: auto;
    content: '';
    border-bottom: 1px solid;
  }

  ::after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 1px;
    height: 100%;
    content: '';
    border-left: 1px solid;
  }

  :last-child::after {
    height: ${shortcutBoxSize / 2}rem;
  }
`;

export type TooltipHelpContentSubtitle = Pick<
  TooltipHelpContentProps,
  'title' | 'shortcuts'
>;

export interface TooltipHelpContentProps {
  title: string;
  shortcuts?: string[];
  subTitles?: TooltipHelpContentSubtitle[];
  description?: string;
  link?: string;
  style?: CSSProperties;
}

/**
 * @deprecated Use TooltipHelpContentProps instead.
 */
export type TooltipItem = TooltipHelpContentProps;

const defaultShortcuts: Mandatory<TooltipHelpContentProps['shortcuts']> = [];
const defaultSubtitles: Mandatory<TooltipHelpContentProps['subTitles']> = [];
const defaultStyle: Mandatory<TooltipHelpContentProps['style']> = {};

export function TooltipHelpContent(props: TooltipHelpContentProps) {
  const {
    title,
    shortcuts = defaultShortcuts,
    subTitles = defaultSubtitles,
    description = '',
    link,
    style = defaultStyle,
  } = props;

  return (
    <div
      style={{
        color: 'white',
        width: '250px',
        padding: '0.5rem',
        ...style,
      }}
    >
      <FlexContainer>
        <Title size="0.9rem">{title}</Title>
        <Shortcuts shortcuts={shortcuts} />
      </FlexContainer>
      <Subtitles items={subTitles} />

      {(description || link) && (
        <Description>
          {description}
          {link && (
            <a
              style={description ? { paddingLeft: '5px' } : {}}
              target="_blank"
              href={link}
              rel="noreferrer"
            >
              Learn more
            </a>
          )}
        </Description>
      )}
    </div>
  );
}

function Shortcuts({ shortcuts }: { shortcuts: string[] }) {
  return (
    <div
      style={{
        display: 'flex',
        textWrap: 'nowrap',
      }}
    >
      {shortcuts.map((shortcut, index) => {
        return (
          // eslint-disable-next-line @eslint-react/no-array-index-key
          <ShortcutItem key={index}>
            <span>{shortcut}</span>
          </ShortcutItem>
        );
      })}
    </div>
  );
}

function Subtitles({ items }: { items: TooltipHelpContentSubtitle[] }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <ul
      style={{
        paddingLeft: '5px',
        listStyle: 'none',
      }}
    >
      {items.map(({ shortcuts = [], title }) => (
        <SubtitleItem key={title}>
          <FlexContainer>
            <Title size="0.7rem">{title}</Title>
            <Shortcuts shortcuts={shortcuts} />
          </FlexContainer>
        </SubtitleItem>
      ))}
    </ul>
  );
}
