/** @jsxImportSource @emotion/react */
import { AnchorButton, IconProps } from '@blueprintjs/core';
import { css } from '@emotion/react';

import { Button } from '../index';

import {
  dbURL,
  findCommonParentFolder,
  NMREntry,
  NMREntryChild,
  SpectrumKinds,
} from './utils';

export function NMRFileSpectraLink(props: {
  entry: NMREntry;
  showAll: boolean;
  setSpectra?: (ids: string | string[]) => void;
  useTag?: boolean;
}) {
  const { entry, showAll, setSpectra, useTag } = props;
  const labels: Record<SpectrumKinds, string> = {
    all: 'All',
    oneD: '1D',
    twoD: '2D',
    fid: 'FID',
    ft: 'FT',
  };
  const icons: Record<SpectrumKinds, IconProps['icon'] | null> = {
    all: 'multi-select',
    oneD: 'pulse',
    twoD: 'scatter-plot',
    fid: null,
    ft: null,
  };
  const otherKinds: SpectrumKinds[] = ['oneD', 'twoD', 'fid', 'ft'];
  const kindsRender: SpectrumKinds[] = ['all'];

  if (showAll) {
    kindsRender.unshift(...otherKinds);
  }
  return kindsRender.map((kind) => {
    const label = labels[kind];
    const icon = icons[kind];
    const ids = entry.links[kind].ids;

    return (
      <Button
        tag={ids.length > 0 && useTag ? ids.length : null}
        tagProps={{
          style: {
            margin: '-4px -1px',
          },
          intent: 'none',
        }}
        key={kind}
        onClick={(e) => {
          e.stopPropagation();
          setSpectra?.(ids);
        }}
        tooltipProps={
          ids.length > 0
            ? {
                content: `Select ${useTag ? '' : ids.length} ${label} ${ids.length === 1 ? 'spectrum' : 'spectra'}`,
                position: 'bottom-left',
              }
            : {}
        }
        css={css({
          borderRadius: '5px',
          width: '30px',
          height: '30px',
        })}
        disabled={ids.length === 0}
        icon={icon}
        minimal={ids.length > 0}
      >
        {icon ? null : label}
      </Button>
    );
  });
}

export function NMRFileDownload({ entry }: { entry: NMREntry }) {
  if (entry.children.length === 0) {
    return null;
  }
  const source = entry.children[0].source;
  const relativePath = findCommonParentFolder(
    entry.children.map((child: NMREntryChild) => child.relativePath),
  );
  const params = new URLSearchParams();
  params.set('source', source);
  params.set('relativePath', relativePath);
  const link = `${dbURL}getZip?${params.toString()}`;

  return (
    <AnchorButton
      href={link}
      onClick={(e) => {
        e.stopPropagation();
      }}
      style={{
        borderRadius: '5px',
        width: '30px',
        height: '30px',
      }}
      minimal
      icon="import"
    />
  );
}
