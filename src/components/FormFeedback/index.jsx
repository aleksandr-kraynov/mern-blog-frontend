import { Box, Button, CircularProgress, Modal, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { green } from '@mui/material/colors';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedback, selectFeedback } from "../../redux/slices/feedback";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const FormFeedback = ({
    showFormFeedback,
    handleCloseFormFeedback
}) => {

    const dispatch = useDispatch();
    const { status } = useSelector(selectFeedback);

    const isLoading = status === 'loading';
    const isLoaded = status === 'loaded';

    const {
        register,
        handleSubmit,
        watch,
        formState,
        resetField
    } = useForm({
        defaultValues: {
            to: '',
            name: '',
            subject: ''
        }
    })

    const buttonSx = {
        mt: 3,
        mb: 2,
        ...(isLoaded && !formState.isDirty && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    const onSubmit = (data) => {
        dispatch(fetchFeedback(data));
    }

    useEffect(() => {
        if(isLoaded) {
            resetField('to', { keepError: true })
            resetField('name', { keepError: true })
            resetField('subject', { keepError: true })
        }
    }, [isLoaded])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Modal
                open={showFormFeedback}
                onClose={handleCloseFormFeedback}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box component="form" onSubmit={handleSubmit} noValidate sx={style}>
                    <TextField
                        {...register('to')}
                        margin="normal"
                        required
                        fullWidth
                        label='Почта получателя'
                    />
                    <TextField
                        {...register('name')}
                        margin="normal"
                        required
                        fullWidth
                        label='Имя получателя'
                    />
                    <TextField
                        {...register('subject')}
                        margin="normal"
                        required
                        fullWidth
                        label='Тема письма'
                    />
                    <Box sx={{ position: 'relative' }}>
                        <Button
                            type='submit'
                            fullWidth
                            variant="contained"
                            sx={buttonSx}
                            disabled={isLoading}
                        >
                            {isLoaded && !formState.isDirty ?
                                'Письмо отправленно'
                            :
                                'Отправить'
                            }
                        </Button>
                        {isLoading && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                }}
                            />
                        )}
                    </Box>
                </Box>
            </Modal>
        </form>
    );
};
