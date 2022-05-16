import { FC, useEffect } from 'react';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack, styled, FormControlLabel, Switch, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import TextInput from '../../components/forms/TextInput';
import TextArea from '../../components/forms/TextArea';
import React from 'react';

/**
 * Form needs following fields:
 * - Name of Meeting
 * - Description
 * - Meeting day + Meeting start time
 * - Meeting duration
 * - Breakout rooms?
 *      -> name, participants of rooms
 */

const Form = styled('form')({});

interface IFormInput {
    name: string;
    description: string;
    meetingDate: Date,
    meetingDuration: string,
    breakoutRooms: boolean,
    breakoutNames: string
    breakoutParticipants: string
}
 const MeetingInput: FC = () => {
    const {
        control,
        handleSubmit,
        formState: {errors}
    } = useForm<IFormInput>({
        defaultValues: {
            name: '',
            description: '',
            meetingDate: dayjs().toDate(),
            meetingDuration: '',
            breakoutRooms: false,
            breakoutNames: '',
            breakoutParticipants: ''
        },
        //resolver: yupResolver(null),
    });

    const [value, setValue] = React.useState<Date | null>(
        new Date(dayjs().toDate()),
    );
      
    const handleChange = (newValue: Date | null) => {
        setValue(newValue);
    };
    
    return (
        <Form
            autoComplete='off'
            sx={{
                width: {
                    xs: '100%',
                    sm: 400,
                },
            }}
        >
        <Stack spacing={2}>
            <TextInput 
                name='name'
                label='Name'
                control={control}
                error={errors.name}
            />
            <TextArea 
                name='description'
                label='Description'
                control={control}
                error={errors.description}
                minRows={3}
            />
            <DateTimePicker
                label='Meeting Date'
                value={value}
                renderInput={(props) => <TextField {...props} />}
                onChange= {handleChange}
            />
            <TextInput 
                name='meetingDuration'
                label='Meeting Duration (minutes)'
                control={control}
                error={errors.meetingDuration}
            />
            <FormControlLabel control = {
                <Switch />
            } label="Breakout Rooms"
            />
        </Stack>
        </Form>
    );
 };

 export default MeetingInput;