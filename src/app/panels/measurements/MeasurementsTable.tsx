import styled from '@emotion/styled';
import { FaTrash } from 'react-icons/fa';

import {
  MeasurementBase,
  MeasurementKind,
  useAppDispatch,
  useAppState,
} from '../../../app-data/index';
import { ConfirmDialog, useOnOff } from '../../../components/index';

import { MeasurementCheckbox } from './MeasurementCheckbox';
import MeasurementColorPreview from './MeasurementColorPreview';
import MeasurementVisibilityToggle, {
  MeasurementSelectedVisibilityChange,
} from './MeasurementVisibilityToggle';

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
  gap: 5px;
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
  gap: 10px;
  align-items: center;
  padding-left: 5px;

  border-bottom: 1px solid black;
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
  gap: 0.5rem;
  cursor: default;
  width: 70px;
`;

export function MeasurementsTable(props: MeasurementsTableProps) {
  const { kind } = props;

  const {
    data: { measurements },
    view: { selectedMeasurements },
  } = useAppState();
  const dispatch = useAppDispatch();
  const [isRemoveModalOpen, openRemoveModal, closeRemoveModal] = useOnOff();

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
    closeRemoveModal();
  }

  return (
    <MeasurementsTableContainer>
      <MeasurementsHeaderColumn>
        <MeasurementSelectedVisibilityChange kind={kind} openedEyes />
        <MeasurementSelectedVisibilityChange kind={kind} openedEyes={false} />
        <MeasurementsLinkButton onClick={() => onSelectLink(true)}>
          Select all
        </MeasurementsLinkButton>
        <MeasurementsLinkButton onClick={() => onSelectLink(false)}>
          Unselect all
        </MeasurementsLinkButton>

        <FaTrash
          style={
            hasSelectedMeasurements ? { cursor: 'pointer' } : { opacity: 0.6 }
          }
          onClick={hasSelectedMeasurements ? openRemoveModal : undefined}
        />
        <ConfirmDialog
          headerColor="red"
          isOpen={isRemoveModalOpen}
          onConfirm={onRemove}
          onClose={closeRemoveModal}
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

  const {
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

  return (
    <MeasurementsTableRowData>
      <MeasurementsIconsContainer>
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
