/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const aboutInformationCss = {
  root: css`
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
  `,
  link: css`
    color: rgb(150, 150, 150);
    &:hover {
      color: rgb(0, 188, 212);
    }
  `,
  separator: css`
    border-bottom: 1px solid gray;
    width: 15px;
    height: 1px;
    margin: 10px 0px;
  `,
};

export function AboutInformation() {
  return (
    <div css={aboutInformationCss.root}>
      <p>LOGO</p>
      <div>
        <p>Version</p>
        <a
          css={aboutInformationCss.link}
          href="https://github.com/zakodium-oss/react-science"
        >
          HEAD
        </a>
      </div>
      <span css={aboutInformationCss.separator} />
      <a
        css={aboutInformationCss.link}
        href="https://github.com/zakodium-oss/react-science"
      >
        GitHub ( https://github.com/zakodium-oss/react-science )
      </a>
      <span css={aboutInformationCss.separator} />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, officiis
        saepe natus illo tenetur eaque porro nihil reprehenderit magnam ipsa
        ipsam dolores ipsum? Ad vero eos, consequuntur voluptatum incidunt
        voluptatem.
      </p>
    </div>
  );
}
