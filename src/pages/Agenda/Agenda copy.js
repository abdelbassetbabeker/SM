import React, { useEffect, useState } from 'react';
import { Hourse, agendaData } from './db';
import ModalComponent from '../../components/modal/ModalComponent';
import { Autocomplete, TextField } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Button } from 'semantic-ui-react';
import { ChromePicker, TwitterPicker } from 'react-color';

import './style.css'

const Agenda = () => {




    const [agenda, setAgenda] = useState(agendaData)

    const [h, setH] = useState([])

    useEffect(() => {
        setH(() => Hourse.map((i) => i.value))

    }, [])

    const schema = yup
        .object()
        .shape({
            name: yup.string().required('Course Name is required'),
            from: yup.number().required('From is required'),
            to: yup.number().required('To is required'),
        })
        .required();

    const [open, setOpen] = useState(false)
    const [timeIndex, setTimeIndex] = useState(null)
    const [dayIndex, setDayIndex] = useState(null)


    const handleClick = (d, t) => {
        setOpen(() => true)
        setDayIndex(() => d)
        setTimeIndex(() => t)
    }

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm(
        {
            resolver: yupResolver(schema)
        }
    );

    const onSubmit = (data) => {
        console.log(data);
        setOpen(false)
        setTimeIndex(null)
        setDayIndex(null)

        console.log("index of from", h.indexOf(data.from));
        console.log("index of to", h.indexOf(data.to));

        agenda[dayIndex].day_events[h.indexOf(data.from)].name = data.name

        for (let index = h.indexOf(data.from); index < h.indexOf(data.to); index++) {
            console.log("loop couner", index);
            console.log("timeIndex", timeIndex);
            agenda[dayIndex].day_events[index].from = data.from
            agenda[dayIndex].day_events[index].to = data.to
            agenda[dayIndex].day_events[index].color = data.color
        }

    }


    // Function to check if a color is light
    const isLightColor = (color) => {
        // Calculate the relative luminance of the color
        // Use the formula: Y = 0.2126*R + 0.7152*G + 0.0722*B
        const luminance = 0.2126 * color.rgb.r + 0.7152 * color.rgb.g + 0.0722 * color.rgb.b;

        // You can adjust the luminance threshold as needed
        // Here, we are using a simple check to determine if the color is light
        // You may experiment with different thresholds to suit your preference
        return luminance >= 150;
    };

    return (
        <div className='p-6 '>
            <div className='mb-7'>
                <h1 className=' m-0'>Class Agenda</h1>
                <p className='text-gray-500 text-lg'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, vel.</p>
            </div>
            <div className='flex items-start'>
                <ul className=''>
                    <li className='border p-2 h-[50px] w-[100px]  '>
                        <p>Dayes/Houre</p>
                    </li>
                    {agenda.map((day, index) => (
                        <li key={index} className='border p-5 h-[70px] w-[100px] text-center text-gray-800 font-bold font-roboto capitalize '>
                            <p>{day.dayName}</p>
                        </li>
                    ))}
                </ul>
                <div>
                    <ul className=' flex  h-fit bg-500  text-center text-gray-800 font-bold font-roboto'>
                        {Hourse.map((day, index) => (
                            <li key={index} className=' border-l p-5 h-[50px] w-[100px]  '>
                                <p>{`${day.label}:00h`}</p>
                            </li>
                        ))}
                    </ul>
                    {agenda.map((day, day_index) => (
                        <ul key={day_index} className='flex'>
                            {day.day_events.map((time, time_index) => (
                                <li key={time_index}
                                    onClick={() => (handleClick(day_index, time_index))}
                                    className={`
                                    ${time.from === null ? "border" : ""}
                                    ${time.name === "" ? "" : "z-10 text-ellipsis whitespace-"}
                                    text-[20px] font-roboto font-bold flex items-center justify-center h-[70px] w-[100px]  hover:bg-black/5 `}

                                    style={{
                                        background: `${time.color}`
                                    }}
                                >
                                    <p>{time.name}</p>
                                </li>
                            ))}
                        </ul>
                    ))}

                </div>
            </div>
            <ModalComponent
                open={open}
                setOpen={setOpen}
                title='Add To Agenda'
                subTitle='Lorem ipsum dolor, sit amet consectetur !'
            >
                <form autoComplete='off' onSubmit={handleSubmit(data => onSubmit(data))} >
                    <TextField
                        name='name'
                        label='Course Name'
                        size='small'
                        fullWidth
                        {...register('name')}
                        multiline
                        helperText={(errors.name && errors.name.message) || 'Enter Course Name Here'}
                        error={Boolean(errors.name)}
                    />

                    <Controller
                        name='from'
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <Autocomplete
                                options={Hourse}
                                size='small'
                                renderInput={(params) => {
                                    return (
                                        <TextField
                                            {...params}
                                            label='From'
                                            type='number'
                                            margin="normal"
                                            variant="outlined"
                                            onChange={onChange}
                                            error={!!error}
                                            helperText={error?.message || "Enter When The Course Starts"}
                                        />
                                    );
                                }}
                                onChange={(event, values, reason) => onChange(values ? values.value : 'null')}
                            />
                        )}
                    />
                    <Controller
                        name='to'
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <Autocomplete
                                options={Hourse}
                                size='small'
                                renderInput={(params) => {
                                    return (
                                        <TextField
                                            {...params}
                                            label='To'
                                            type='number'
                                            margin="normal"
                                            variant="outlined"
                                            onChange={onChange}
                                            error={!!error}
                                            helperText={error?.message || "Enter When The Course Ends"}
                                        />
                                    );
                                }}
                                onChange={(event, values, reason) => onChange(values ? values.value : 'null')}
                            />
                        )}
                    />

                    <Controller
                        name="color"
                        control={control}
                        defaultValue={{ hex: '#ffffff', a: 1 }} // Set the default color value with alpha
                        render={({ field }) => (
                            <TwitterPicker
                                colors={['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']}
                                color={field.value}
                                onChange={(color) => field.onChange(color.hex)}
                            />
                        )}
                    />
                    <br />
                    <br />
                    <Button type='submit' color='green' >Submit</Button>
                    <Button type='button' floated='right' onClick={() => setOpen(false)}>Cancel</Button>

                </form>

            </ModalComponent>
        </div >
    );
}

export default Agenda;




const textFieldStyle = {
    margin: 'px 0'
}
