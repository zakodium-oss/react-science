/** @jsxImportSource @emotion/react */
import { SerializedStyles, css } from '@emotion/react';
import { CSSProperties } from 'react';

const shortcutBoxSize = 1.5;
const color: CSSProperties['color'] = 'white';

const styles: Record<
  | 'titleContainer'
  | 'title'
  | 'description'
  | 'shortcutContainer'
  | 'shortcutItem',
  CSSProperties
> &
  Record<'subTitleListItem' | 'subTitleList', SerializedStyles> = {
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  title: {
    fontSize: '0.9rem',
    flex: 1,
    padding: '5px 0',
    textAlign: 'left',
    color,
  },
  description: {
    paddingTop: '1rem',
    fontSize: '0.7rem',
    textAlign: 'left',
    color,
  },
  shortcutContainer: {
    display: 'flex',
    textWrap: 'nowrap',
    color,
  },
  shortcutItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.2rem',
    border: `1px solid ${color}`,
    borderRadius: '4px',
    height: `${shortcutBoxSize}rem`,
    minWidth: `${shortcutBoxSize}rem`,
    marginLeft: '5px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
  },
  subTitleList: css({
    paddingLeft: '5px',
    listStyle: 'none',
  }),
  subTitleListItem: css({
    position: 'relative',
    paddingLeft: '15px',
    boxSizing: 'border-box',
    '&::before': {
      position: 'absolute',
      top: `${shortcutBoxSize / 2}rem`,
      left: '0',
      width: '10px',
      height: '1px',
      margin: 'auto',
      content: "''",
      backgroundColor: color,
    },
    '&::after': {
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '0',
      width: '1px',
      height: '100%',
      content: "''",
      backgroundColor: color,
    },
    '&:last-child::after': {
      height: `${shortcutBoxSize / 2}rem`,
    },
  }),
};

export interface TooltipItem {
  title: string;
  shortcuts?: string[];
  subTitles?: Array<Pick<TooltipItem, 'title' | 'shortcuts'>>;
  description?: string;
  link?: string;
  style?: CSSProperties;
}

export function TooltipTemplate(props: TooltipItem) {
  const {
    title,
    shortcuts = [],
    subTitles = [],
    description = '',
    link,
    style = {},
  } = props;

  return (
    <div
      style={{
        width: 250,
        padding: '0.5rem',
        ...style,
      }}
    >
      <div style={styles.titleContainer}>
        <span style={styles.title}>{title}</span>
        <ShortCuts shortcuts={shortcuts} />
      </div>
      <SubTitles items={subTitles} />

      {(description || link) && (
        <p style={styles.description}>
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
        </p>
      )}
    </div>
  );
}

function ShortCuts({
  shortcuts,
  style = {},
}: {
  shortcuts: string[];
  style?: CSSProperties;
}) {
  return (
    <div style={styles.shortcutContainer}>
      {shortcuts.map((key, index) => {
        return (
          <div
            key={key}
            style={{
              ...styles.shortcutItem,
              ...(index === 0 && { margin: 0 }),
              ...style,
            }}
          >
            <span>{key}</span>
          </div>
        );
      })}
    </div>
  );
}

function SubTitles({ items }: { items: TooltipItem[] }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <ul css={styles.subTitleList}>
      {items.map(({ shortcuts = [], title }) => (
        <li css={styles.subTitleListItem} key={title}>
          <div style={styles.titleContainer}>
            <span style={{ ...styles.title, fontSize: '0.7rem' }}>{title}</span>
            <ShortCuts shortcuts={shortcuts} />
          </div>
        </li>
      ))}
    </ul>
  );
}
