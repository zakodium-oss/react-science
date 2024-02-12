import { Menu, MenuItem, Popover } from '@blueprintjs/core';
import styled from '@emotion/styled';
import { useMemo } from 'react';

import {
  MeasurementBase,
  MeasurementKind,
  getMeasurement,
  useAppDispatch,
  useAppState,
} from '../../../app-data';
import {
  Button,
  ConfirmDialog,
  InfoPanel,
  InfoPanelData,
  PanelPreferencesToolbar,
  useOnOff,
} from '../../../components';
import { MeasurementConfigPanel } from '../index';

import {
  MeasurementColorPreview,
  MeasurementCheckbox,
  MeasurementVisibilityToggle,
  MeasurementSelectedVisibilityChange,
  useMeasurementPanel,
} from '.';

export interface MeasurementsTableProps {
  kind: MeasurementKind;
}

interface MeasurementsTableRowProps {
  item: MeasurementBase;
  kind: MeasurementsTableProps['kind'];
}

const MeasurementsTableContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MeasurementsTableRoot = styled.table`
  font-size: 0.875rem;
  line-height: 1.25rem;
  border-collapse: collapse;
  table-layout: fixed;
`;

const MeasurementsTableHeaderStyled = styled.tr`
  border-bottom-width: 1px;
  font-weight: 500;
  text-align: left;
  padding-bottom: 10px;
  padding-top: 10px;
  padding-left: 2rem;
`;

const MeasurementsTableBody = styled.tbody`
  background-color: white;
`;

const MeasurementsHeaderColumn = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom: 1px solid black;
`;
const MeasurementsHeaderGroup = styled.div`
  display: flex;
  gap: 6px;
`;

const MeasurementsTableRowData = styled.tr`
  height: 50px;
  max-height: 50px;
  overflow: hidden;
  cursor: pointer;
  padding-left: 2rem;
  padding-bottom: 10px;
  padding-top: 10px;
  border-bottom-width: 1px;

  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const MeasurementsIconsContainer = styled.td`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  justify-items: center;
  height: 50px;
  flex-direction: row;
  cursor: default;
  gap: 2px;
  width: 100px;
`;

export function MeasurementsTable(props: MeasurementsTableProps) {
  const { kind } = props;

  const {
    data: { measurements },
    view: { selectedMeasurements },
  } = useAppState();
  const dispatch = useAppDispatch();
  const [isRemoveDialogOpen, openRemoveDialog, closeRemoveDialog] = useOnOff();

  const hasSelectedMeasurements = (selectedMeasurements[kind]?.length ?? 0) > 0;

  function onRemove() {
    dispatch({ type: 'REMOVE_SELECTED_MEASUREMENTS', payload: { kind } });
    closeRemoveDialog();
  }

  return (
    <MeasurementsTableContainer>
      <MeasurementsHeaderColumn>
        <MeasurementsHeaderGroup>
          <Button
            minimal
            icon="trash"
            intent="danger"
            style={{ opacity: hasSelectedMeasurements ? 1 : 0.6 }}
            onClick={hasSelectedMeasurements ? openRemoveDialog : undefined}
            tooltipProps={{ content: 'Remove all', position: 'bottom' }}
          />
        </MeasurementsHeaderGroup>
        <ConfirmDialog
          headerColor="red"
          isOpen={isRemoveDialogOpen}
          onConfirm={onRemove}
          onClose={closeRemoveDialog}
          saveText="Remove"
        >
          <div style={{ fontWeight: 'bold', padding: 10 }}>
            Remove selected measurements?
          </div>
        </ConfirmDialog>
      </MeasurementsHeaderColumn>

      <MeasurementsTableRoot>
        <MeasurementsTableHeader kind={kind} />
        <MeasurementsTableBody>
          {measurements[kind].entries.map((element) => (
            <MeasurementsTableRow key={element.id} item={element} kind={kind} />
          ))}
        </MeasurementsTableBody>
      </MeasurementsTableRoot>
    </MeasurementsTableContainer>
  );
}

const TableHeaderFilename = styled.th`
  width: 50%;
`;

const TableHeaderTechnique = styled.th`
  width: 150px;
`;

const TableDataHeaderName = styled.td`
  width: 50%;
  overflow: hidden;
`;

function MeasurementsTableHeader({
  kind,
}: {
  kind: MeasurementsTableProps['kind'];
}) {
  const {
    data: { measurements: measurementsData },
    view: { selectedMeasurements, measurements },
  } = useAppState();
  const dispatch = useAppDispatch();
  function onSelectLink(select: boolean) {
    dispatch({
      type: 'SELECT_ALL_MEASUREMENTS',
      payload: {
        kind,
        select,
      },
    });
  }
  const allSelected = useMemo(
    () =>
      selectedMeasurements[kind]?.length ===
      measurementsData[kind]?.entries.length,
    [kind, measurementsData, selectedMeasurements],
  );
  const selectedVisible = useMemo(() => {
    const ids = selectedMeasurements[kind];
    if (ids) {
      return ids.every((id) => measurements[id]?.visible);
    }
    return false;
  }, [selectedMeasurements, kind, measurements]);
  return (
    <thead>
      <MeasurementsTableHeaderStyled>
        <th>
          <MeasurementsIconsContainer
            style={{
              paddingLeft: '26px',
            }}
          >
            <MeasurementCheckbox
              checked={allSelected}
              onSelectCheckbox={() => {
                onSelectLink(!allSelected);
              }}
            />
            <MeasurementSelectedVisibilityChange
              kind={kind}
              isVisible={selectedVisible}
            />
          </MeasurementsIconsContainer>
        </th>
        <TableHeaderFilename>Filename</TableHeaderFilename>
        <TableHeaderTechnique>Technique</TableHeaderTechnique>
      </MeasurementsTableHeaderStyled>
    </thead>
  );
}

function MeasurementsTableRow(props: MeasurementsTableRowProps) {
  const { item, kind } = props;
  const { openPanel } = useMeasurementPanel();

  const {
    data,
    view: { selectedMeasurements, measurements },
  } = useAppState();

  const dispatch = useAppDispatch();

  function onSelectRow() {
    dispatch({
      type: 'SELECT_MEASUREMENT',
      payload: { id: item.id, kind, acc: 'replace' },
    });
  }

  function onSelectCheckbox() {
    const isAlreadyChecked = selectedMeasurements[kind]?.includes(item.id);

    dispatch({
      type: 'SELECT_MEASUREMENT',
      payload: { id: item.id, kind, acc: isAlreadyChecked ? 'remove' : 'add' },
    });
  }
  const { info = {}, meta = {} } =
    getMeasurement(data.measurements, kind, item.id) || {};

  const infoPanelData: InfoPanelData[] = [
    {
      description: 'Information',
      data: info,
    },
    {
      description: 'Metadata',
      data: meta,
    },
  ];
  const content = (
    <Menu
      style={{
        minWidth: 0,
      }}
    >
      <MenuItem
        text="Information"
        icon="info-sign"
        onClick={() =>
          openPanel?.({
            title: item.info.file?.name ?? item.info.title,
            renderPanel: ({ closePanel }) => (
              <div>
                <PanelPreferencesToolbar
                  title={item.info.file?.name ?? item.info.title}
                  onClose={closePanel}
                />
                <InfoPanel data={infoPanelData} title="" />
              </div>
            ),
          })
        }
      />
      <MenuItem
        text="Configuration"
        icon="settings"
        onClick={() =>
          openPanel?.({
            title: item.info.file?.name ?? item.info.title,
            renderPanel: ({ closePanel }) => (
              <div>
                <PanelPreferencesToolbar
                  title={item.info.file?.name ?? item.info.title}
                  onClose={closePanel}
                />
                <MeasurementConfigPanel />
              </div>
            ),
          })
        }
      />
    </Menu>
  );

  return (
    <MeasurementsTableRowData>
      <MeasurementsIconsContainer>
        <Popover content={content} position="bottom-left">
          <Button
            minimal
            icon="more"
            style={{
              transform: 'rotate(90deg)',
            }}
            small
          />
        </Popover>
        <MeasurementCheckbox
          checked={selectedMeasurements[kind]?.includes(item.id) || false}
          onSelectCheckbox={onSelectCheckbox}
        />
        <MeasurementVisibilityToggle
          id={item.id}
          isVisible={measurements[item.id].visible}
        />
        <MeasurementColorPreview
          measurementId={item.id}
          kind={kind}
          color={measurements[item.id].color}
        />
      </MeasurementsIconsContainer>
      <TableDataHeaderName onClick={onSelectRow} title={item.id}>
        {item.info.file?.name ?? item.info.title}
      </TableDataHeaderName>
      <td onClick={onSelectRow}>{item.meta.technique}</td>
    </MeasurementsTableRowData>
  );
}
