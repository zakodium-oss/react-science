import styled from '@emotion/styled';
import { FaTrash } from 'react-icons/fa';

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

const MeasurementsLinkButton = styled.span`
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
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
  justify-content: center;
  align-items: center;
  justify-items: center;
  height: 50px;
  flex-direction: row;
  cursor: default;
  width: 120px;
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

  function onSelectLink(select: boolean) {
    dispatch({
      type: 'SELECT_ALL_MEASUREMENTS',
      payload: {
        kind,
        select,
      },
    });
  }

  function onRemove() {
    dispatch({ type: 'REMOVE_SELECTED_MEASUREMENTS', payload: { kind } });
    closeRemoveDialog();
  }

  return (
    <MeasurementsTableContainer>
      <MeasurementsHeaderColumn>
        <MeasurementsHeaderGroup>
          <MeasurementsLinkButton onClick={() => onSelectLink(true)}>
            Select all
          </MeasurementsLinkButton>
          <MeasurementsLinkButton onClick={() => onSelectLink(false)}>
            Unselect all
          </MeasurementsLinkButton>
        </MeasurementsHeaderGroup>
        <MeasurementsHeaderGroup>
          <MeasurementSelectedVisibilityChange kind={kind} openedEyes />
          <MeasurementSelectedVisibilityChange kind={kind} openedEyes={false} />
          <FaTrash
            style={
              hasSelectedMeasurements ? { cursor: 'pointer' } : { opacity: 0.6 }
            }
            onClick={hasSelectedMeasurements ? openRemoveDialog : undefined}
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
        <MeasurementsTableHeader />
        <MeasurementsTableBody>
          {measurements[kind].entries.map((element) => (
            <MeasurementsTableRow key={element.id} item={element} kind={kind} />
          ))}
        </MeasurementsTableBody>
      </MeasurementsTableRoot>
    </MeasurementsTableContainer>
  );
}

const TableHeaderEmpty = styled.th`
  display: flex;
  gap: 5px;
  align-items: center;
  width: 70px;
`;

const TableHeaderFilename = styled.th`
  width: 60%;
`;

const TableHeaderTechnique = styled.th`
  width: 150px;
`;

const TableDataHeaderName = styled.td`
  width: 60%;
  overflow: hidden;
`;

function MeasurementsTableHeader() {
  return (
    <thead>
      <MeasurementsTableHeaderStyled>
        <TableHeaderEmpty />
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

  return (
    <MeasurementsTableRowData>
      <MeasurementsIconsContainer>
        <Button
          icon="info-sign"
          minimal
          onClick={() =>
            openPanel?.({
              title: item.info.file?.name ?? item.info.title,
              renderPanel: ({ closePanel }) => (
                <div>
                  <PanelPreferencesToolbar
                    title={item.info.file?.name ?? item.info.title}
                    onClose={closePanel}
                    onSave={closePanel}
                  />
                  <InfoPanel data={infoPanelData} title="" />
                </div>
              ),
            })
          }
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
        <MeasurementCheckbox
          checked={selectedMeasurements[kind]?.includes(item.id) || false}
          onSelectCheckbox={onSelectCheckbox}
        />
      </MeasurementsIconsContainer>
      <TableDataHeaderName onClick={onSelectRow} title={item.id}>
        {item.info.file?.name ?? item.info.title}
      </TableDataHeaderName>
      <td onClick={onSelectRow}>{item.meta.technique}</td>
    </MeasurementsTableRowData>
  );
}
