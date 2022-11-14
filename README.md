# analysis-ui-components

React components to build analysis UI.

<h3 align="center">

  <a href="https://www.zakodium.com">
    <img src="https://www.zakodium.com/brand/zakodium-logo-white.svg" width="50" alt="Zakodium logo" />
  </a>

  <p>
    Maintained by <a href="https://www.zakodium.com">Zakodium</a>
  </p>
</h3>

## Installation

```console
> npm i analysis-ui-components
```

## Introduction

Science has specific requirements to display and process data. This is especially true in chemistry where a large number of techniques are used to extract important information (or characterize) samples.

This project simplifies the process of creating web applications for visualizing, processing and extracting information from measurements.

This project is composed of 2 parts:

- src/components: a set of reusable components that are published in the npm package and can be developed locally using `npm run dev-stories`
- src/pages: playgrounds in which we combine the components and many other project to test ideas and limitation of the design. It can be tested locally using `npm run dev-app`

## Principle of the application

The application has a state containing 3 properties:

- data: containing information related to data
- view: containing the information related to what is displayed in which module
- prefs: that will contain user defined preferences for the application

### Loading new data in the application

New data can be added by drag/drop or by adding in the URL a link to a webservice that returns a list of files. This later will use [FileCollectionFromWebservice](https://cheminfo.github.io/filelist-utils/modules.html#fileCollectionFromWebservice). You can find an example of the webservice [here](https://zakodium-oss.github.io/analysis-dataset/jdx.json)

Both approach will generate internally a `FileCollection` (see https://cheminfo.github.io/filelist-utils/classes/FileCollection.html and https://github.com/cheminfo/filelist-utils).

To convert the various proprietary formats and add the parsed result to the application `data state` we will use `loaders`. A loader will receive a `FileCollection` and will try to parse what it can, often based on the file extension. An example of the `JCAMP-DX` loader can be found [here](https://github.com/zakodium-oss/analysis-ui-components/blob/6f36ab05af11f848d4ed98eb10c99184a713ae97/src/app/data/loaders/jcampLoader.ts)

When create a new loader you also need to specify that it should be used when processing files by adding it in the following [array](https://github.com/zakodium-oss/analysis-ui-components/blob/6f36ab05af11f848d4ed98eb10c99184a713ae97/src/app/context/load.ts#L15-L16) of the application.

## Testing the demo application

- [From some JCAMP-DX files](https://analysis-ui-components.pages.dev/pages/demo.html#?filelist=https%3A%2F%2Fzakodium-oss.github.io%2Fanalysis-dataset%2Fjdx.json)
- [From Biologic file format](https://analysis-ui-components.pages.dev/pages/demo.html#?filelist=https%3A%2F%2Fzakodium-oss.github.io%2Fanalysis-dataset%2Fbiologic.json)
- [From a UV-vis file format](https://analysis-ui-components.pages.dev/pages/demo.html#?filelist=https%3A%2F%2Fzakodium-oss.github.io%2Fanalysis-dataset%2Fuvvis.json)
- [All the examples we have](https://analysis-ui-components.pages.dev/pages/demo.html#?filelist=https%3A%2F%2Fzakodium-oss.github.io%2Fanalysis-dataset%2Ffull.json)
