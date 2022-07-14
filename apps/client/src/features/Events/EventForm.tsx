// import { FC, useEffect } from 'react';
// import { EventDTO } from '@zoom-conference-manager/api-interfaces';
// import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { Button, Stack, styled } from '@mui/material';
// import dayjs from 'dayjs';
// import eventDtoSchema from './eventDtoSchema';
// import TextInput from '../../components/forms/TextInput';
// import TextArea from '../../components/forms/TextArea';
// import DatePicker from '../../components/forms/DatePicker';
// import { axios } from '../../config/axios';
// import Confirm from './Confirmation'

// const Form = styled('form')({});

// interface IFormInput {
//   name: string;
//   description: string;
//   startDate: Date;
//   endDate: Date;
// }

// const EventInput: FC = () => {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<IFormInput>({
//     defaultValues: {
//       name: '',
//       description: '',
//       startDate: dayjs().toDate(),
//       endDate: dayjs().toDate(),
//     },
//     resolver: yupResolver(eventDtoSchema),
//   });

//   useEffect(() => {
//     console.log(errors);
//   }, [errors]);

//   const onSubmit: SubmitHandler<IFormInput> = (data) => {
//     const eventData: EventDTO = {
//       ...data,
//       startDate: dayjs(data.startDate).format('YYYY-MM-DD'),
//       endDate: dayjs(data.endDate).format('YYYY-MM-DD'),
//     };

//     axios.post('/event', { eventData });

//     console.log(eventData);
//   };

//   return (
//     <Form
//       autoComplete='off'
//       onSubmit={handleSubmit(onSubmit)}
//       sx={{
//         width: {
//           xs: '100%',
//           sm: 400,
//         },
//       }}
//     >
//       <Stack spacing={2}>
//         <TextInput
//           name='name'
//           label='Name'
//           control={control}
//           error={errors.name}
//         />
//         <TextArea
//           name='description'
//           label='Description'
//           control={control}
//           error={errors.description}
//           minRows={3}
//         />
//         <DatePicker
//           name='startDate'
//           label='Start Date'
//           control={control}
//           error={errors.startDate as FieldError | void}
//         />
//         <DatePicker<IFormInput>
//           name='endDate'
//           label='End Date'
//           control={control}
//           error={errors.endDate as FieldError | void}
//         />
//         <Button type='submit' variant='contained'> 
//         Continue <Confirm/>
//         </Button>

//       </Stack>
//     </Form>
//   );
// };

// export default EventInput;
