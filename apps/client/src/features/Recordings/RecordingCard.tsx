import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Paper, Stack, Typography, Chip, Button } from '@mui/material';
import { Groups } from '@mui/icons-material';

interface RecordingCardProps {
  id: string;
  name: string;
  start: string;
  end: string;
}

const RecordingCard: FC<RecordingCardProps> = (props) => {
  const { id, name, start, end } = props;

  return (
    <Paper
      sx={{
        padding: '1.5em',
      }}
      elevation={3}
    >
      <Stack spacing={2}>
        <Typography variant='h5' fontWeight={500} mr={3}>
          {name}
        </Typography>
        <Stack direction='row' spacing={2}>
          <Chip label='Draft' size='small' color='warning' />
          <Stack direction='row' spacing={1}>
            <Groups />
            <Typography>O Meetings</Typography>
          </Stack>
        </Stack>
        <Typography
          sx={{
            width: 'max-content',
            whiteSpace: 'noWrap',
          }}
        >
          {`${start}  until  ${end}`}
        </Typography>
        <Stack direction='row' spacing={2}>
          <Button
            variant='contained'
            component={Link}
            to={`/recordings/${id}`}
            sx={{
              width: 'max-content',
            }}
          >
            Get Recordings
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default RecordingCard;
