import { FC, useState } from 'react';
import { IRehearsal } from '@zoom-conference-manager/api-interfaces';
import { Collapse, Alert, AlertTitle, Stack } from '@mui/material';
import RehearsalsCard from './RehearsalsCard';

interface Props {
  rehearsals: IRehearsal[];
}

const RehearsalsList: FC<Props> = ({ rehearsals }) => {
  const [showNoRehearsals, setShowNoRehearsals] = useState(true);

  if (rehearsals && rehearsals?.length < 1) {
    return (
      <Collapse in={showNoRehearsals}>
        <Alert
          onClose={() => {
            setShowNoRehearsals(false);
          }}
          severity='success'
          variant='outlined'
        >
          <AlertTitle>No Rehearsals</AlertTitle>
          No rehearsals found...
        </Alert>
      </Collapse>
    );
  }

  if (!rehearsals) {
    return (
      <Collapse in={showNoRehearsals}>
        <Alert
          onClose={() => {
            setShowNoRehearsals(false);
          }}
          severity='success'
          variant='outlined'
        >
          <AlertTitle>No Rehearsals</AlertTitle>
          No rehearsals found...
        </Alert>
      </Collapse>
    );
  }

  return (
    <Stack spacing={3}>
      {rehearsals.map((rehearsal) => (
        <RehearsalsCard rehearsal={rehearsal} />
      ))}
    </Stack>
  );
};

export default RehearsalsList;
