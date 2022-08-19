const { writeFileSync } = require('fs');
const { join } = require('path');

const { fileListFromPath } = require('filelist-utils');

const { append } = require('../lib/components/context/data/append');
const {
  getEmptyDataState,
} = require('../lib/components/context/data/getEmptyDataState');

const dataState = getEmptyDataState();
const fileList = fileListFromPath(
  join(__dirname, '../src/components/context/data/__tests__//data'),
);

async function doAll() {
  const { dataState: newDataState } = await append(fileList, dataState);

  writeFileSync(
    join(__dirname, '../stories/data/measurements.json'),
    JSON.stringify(newDataState, null, 2),
  );
  console.log(newDataState);
}

doAll();
