import { FC, useEffect } from 'react';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack, styled, FormControlLabel, Switch, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import TextInput from '../../components/forms/TextInput';
import TextArea from '../../components/forms/TextArea';
import React from 'react';
import meetingSchema from './meetingSchema'
import { MeetingDTO } from '@zoom-conference-manager/api-interfaces';

/**
 * Form needs following fields:
 * - Name of Meeting
 * - Description
 * - Meeting day + Meeting start time
 * - Meeting duration
 * */

const Form = styled('form')({});

interface IFormInput {
    name: string;
    description: string;
    meetingDate: Date,
    meetingDuration: number,
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
            meetingDuration: 0
        },
        resolver: yupResolver(meetingSchema),
    });

    useEffect(() => {
        console.log(errors);
      }, [errors]);

    const [value, setValue] = React.useState<Date | null>(
        new Date(dayjs().toDate()),
    );
      
    const handleChange = (newValue: Date | null) => {
        setValue(newValue);
    };

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        const meetingData: MeetingDTO = {
            ...data,
            meetingDate: dayjs(data.meetingDate).format('YYYY-MM-DDHH:mm:ss'),
        };

        console.log(meetingData);
    }
    
    return (
        <Form
            autoComplete='off'
            onSubmit={handleSubmit(onSubmit)}
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
            <Button type='submit' variant='contained'>
                Submit Meeting
            </Button>
        </Stack>
        </Form>
    );
 };

 export default MeetingInput;