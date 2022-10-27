# analysis-ui-components

React components to build analysis UI

<h3 align="center">

  <a href="https://www.zakodium.com">
    <img src="https://www.zakodium.com/brand/zakodium-logo-white.svg" width="50" alt="Zakodium logo" />
  </a>

  <p>
    Maintained by <a href="https://www.zakodium.com">Zakodium</a>
  </p>
</h3>

## Introduction

Science have specific requirements to display and process data especially in chemistry for which a huge amount of techniques allow to characterize sample.

This project will allow to simplify the process of creating web application that allows not only to visualize but also to process and extract information from measurements.

This project is composed of 2 parts:

- src/components: a set of reusable components that are published in the npm package and can be developed locally using `npm run dev`
- src/app: a playground in which we combine the components and many other project to test ideas and limitation of the design. It can be tested locally using `npm run dev-app`

## Principle of the application

The application has a state containing 3 properties:

- data: containing information related to data
- view: containing the information related to what is displayed in which module
- prefs: that will contain user defined preferences for the application

### Loading new data in the application

Adding new data can be achieved either using drag/drop or by adding in the URL a link to a webservice that returns a list of files. This later will use [FileCollectionFromWebservice](https://cheminfo.github.io/filelist-utils/modules.html#fileCollectionFromWebservice). You can find an example of the webservice [here](https://zakodium-oss.github.io/analysis-dataset/jdx.json)

Both approach will generate internally a `FileCollection` (see https://cheminfo.github.io/filelist-utils/classes/FileCollection.html and https://github.com/cheminfo/filelist-utils).

To convert the various proprietary formats and add the parsed result to the application `data state` we will use `loaders`. A loader will receive a `FileCollection` and will try to parse what it can, often based on the file extension. An example of the `JCAMP-DX` loader can be found [here](https://github.com/zakodium-oss/analysis-ui-components/blob/6f36ab05af11f848d4ed98eb10c99184a713ae97/src/app/data/loaders/jcampLoader.ts)

When create a new loader you also need to specify that it should be used when processing files by adding it in the following [array](https://github.com/zakodium-oss/analysis-ui-components/blob/6f36ab05af11f848d4ed98eb10c99184a713ae97/src/app/context/load.ts#L15-L16) of the application.

## Testing the demo application

- [From some JCAMP-DX files](https://zakodium-oss.github.io/analysis-ui-components/?filelist=https://zakodium-oss.github.io/analysis-dataset/jdx.json)
- [All the example we have](https://zakodium-oss.github.io/analysis-ui-components/?filelist=https://zakodium-oss.github.io/analysis-dataset/full.json)
- [From Biologic file format](https://zakodium-oss.github.io/analysis-ui-components/?filelist=https://zakodium-oss.github.io/analysis-dataset/biologic.json)
- [From a UV-vis file format](https://zakodium-oss.github.io/analysis-ui-components/?filelist=https://zakodium-oss.github.io/analysis-dataset/uvvis.json)

# Installation

```
> npm i analysis-ui-components
> npm i react-icons
```

## Basic example

```tsx
import {
  Accordion,
  Header,
  RootLayout,
  SplitPane,
  Toolbar,
} from 'analysis-ui-components';

import {
  FaMeteor,
  FaBook,
  FaCogs,
  FaTabletAlt,
  FaGlasses,
  FaArrowsAlt,
} from 'react-icons/fa';

function BasicExample() {
  return (
    <RootLayout
      style={{
        borderStyle: 'solid',
        borderColor: 'rgb(213, 213, 213)',
        borderWidth: '1px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Header>
          <Toolbar orientation="horizontal">
            <Toolbar.Item titleOrientation="horizontal" id="logo" title="Logo">
              <FaMeteor />
            </Toolbar.Item>
          </Toolbar>
          <Toolbar orientation="horizontal">
            <Toolbar.Item id="a" title="User manual">
              <FaBook />
            </Toolbar.Item>
            <Toolbar.Item id="b" title="General settings">
              <FaCogs>
            </Toolbar.Item>
            <Toolbar.Item id="c" title="Full screen">
              <FaTabletAlt />
            </Toolbar.Item>
          </Toolbar>
        </Header>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div>
          <Toolbar orientation="vertical">
            <Toolbar.Item id="a" title="Glasses" active>
              <FaGlasses />
            </Toolbar.Item>
            <Toolbar.Item id="b" title="Open in large mode">
              <FaArrowsAlt />
            </Toolbar.Item>
          </Toolbar>
        </div>
        <div
          ref={ref}
          style={{
            width: '100%',
            height: '300px',
          }}
        >
          <SplitPane initialSize="35%">
            <div style={{ padding: 5 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              earum omnis, et voluptatum veniam repellendus similique! Sunt
              nostrum necessitatibus reprehenderit asperiores excepturi
              corrupti? Optio soluta illo quae ex nam nulla.
            </div>
            <div
              style={{
                width: '100%',
                height: '100%',
                flex: '1 1 0%',
              }}
            >
              <Accordion>
                <Accordion.Item title="Spectra" defaultOpened>
                  <p style={{ padding: 5 }}>Spectra lorem</p>
                </Accordion.Item>
                <Accordion.Item title="Integral">
                  <p style={{ padding: 5 }}>Integral lorem</p>
                </Accordion.Item>
              </Accordion>
            </div>
          </SplitPane>
        </div>
      </div>
    </RootLayout>
  );
}
```

![image](https://user-images.githubusercontent.com/30870051/133239548-fe002213-53e5-44ab-8d44-39aaebe65152.png)
