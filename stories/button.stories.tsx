import { CSSObject } from '@emotion/react';
import React, { CSSProperties } from 'react';

import { Button } from '../src';

export default {
  title: 'Layout/Button',
};

const style: Record<'header' | 'section' | 'container', CSSProperties> = {
  header: {
    fontSize: '11px',
    fontWeight: '600',
    letterSpacing: '0.05em',
    marginBottom: '1em',
    paddingLeft: '0.8em',
  },

  section: {
    marginTop: '1.2em',
    marginBottom: '1.2em',
  },
  container: {
    display: 'flex',
    alignItems: 'flex-end',
  },
};

const styleCSSObject: Record<'button', CSSObject> = {
  button: {
    marginLeft: '5px',
  },
};

interface SectionProps {
  children: React.ReactNode;
  header: string;
}

function Section(props: SectionProps) {
  const { header, children } = props;
  return (
    <div style={style.section}>
      <h1 style={style.header}>{header}</h1>
      <div style={style.container}>{children}</div>
    </div>
  );
}

function ButtonsSize() {
  return (
    <Section header="Size">
      <Button
        size="xSmall"
        color={{ basic: 'white', hover: 'white' }}
        style={styleCSSObject.button}
      >
        xSmall
      </Button>
      <Button
        size="small"
        color={{ basic: 'white', hover: 'white' }}
        style={styleCSSObject.button}
      >
        small
      </Button>
      <Button
        size="medium"
        color={{ basic: 'white', hover: 'white' }}
        style={styleCSSObject.button}
      >
        medium
      </Button>
      <Button
        size="large"
        color={{ basic: 'white', hover: 'white' }}
        style={styleCSSObject.button}
      >
        large
      </Button>
    </Section>
  );
}
function ButtonsTheme() {
  return (
    <Section header="Theme">
      <Button.Success style={styleCSSObject.button}>Success</Button.Success>
      <Button.Warning style={styleCSSObject.button}>Warning</Button.Warning>
      <Button.Danger style={styleCSSObject.button}>Danger</Button.Danger>
    </Section>
  );
}

const ButtonsFill = () => {
  return (
    <Section header="Fill">
      <Button fill="solid" style={styleCSSObject.button}>
        solid
      </Button>
      <Button fill="outline" style={styleCSSObject.button}>
        outline
      </Button>
      <Button fill="clear" style={styleCSSObject.button}>
        clear
      </Button>
    </Section>
  );
};

export function Control() {
  return (
    <div>
      <ButtonsTheme />
      <ButtonsSize />
      <ButtonsFill />
    </div>
  );
}
