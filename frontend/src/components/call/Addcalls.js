/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import { useFormik } from "formik";
import * as yup from "yup";
import { Autocomplete, FormControl, FormHelperText, FormLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
import { useState , useEffect } from "react";
import { apiget, apipost } from "../../service/api";

const Addcalls = (props) => {
    const { open, handleClose, _id, setUserAction } = props
    const [leadData, setLeadData] = useState([])
    const [contactData, setContactData] = useState([])
    const userRole = localStorage.getItem("userRole");

    const userid = localStorage.getItem('user_id')

    // -----------  validationSchema
    const validationSchema = yup.object({
        subject: yup.string().required("El asunto es requerido"),
        status: yup.string().required("El estado es requerido"),
        startDateTime: yup.string().required("La fecha y hora de inicio es requerida"),
        duration: yup.string().required("La duración es requerida"),
        relatedTo: yup.string().required("Relacionado con es requerido"),
        note: yup.string().required("La nota es requerida"),

    });

    // -----------   initialValues
    const initialValues = {
        subject: "",
        status: "",
        startDateTime: "",
        duration: "",
        relatedTo: "",
        note: "",
        createdBy: userid,
        lead_id: _id,
        contact_id: _id,
    };

    // add call api
    const addCall = async (values) => {
        const data = values;
        const result = await apipost('call/add', data)
        setUserAction(result)

        if (result && result.status === 201) {
            formik.resetForm();
            handleClose();
            toast.success(result.data.message)
        }
    }

    // lead api
    const fetchLeadData = async () => {
        const result = await apiget(userRole === 'admin' ? `lead/list` : `lead/list/?createdBy=${userid}`)
        if (result && result.status === 200) {
            setLeadData(result?.data?.result)
        }
    }

    // contact api
    const fetchContactData = async () => {
        const result = await apiget(userRole === 'admin' ? `contact/list` : `contact/list/?createdBy=${userid}`)
        if (result && result.status === 200) {
            setContactData(result?.data?.result)
        }
    }

    // formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            addCall(values)
            resetForm();
        },
    });

    useEffect(() => {
        fetchLeadData();
        fetchContactData();
    }, [])

    return (
        <div>
            <Dialog
                open={open}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle
                    id="scroll-dialog-title"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",

                    }}
                >
                    <Typography variant="h6">Crear Llamada </Typography>
                    <Typography>
                        <ClearIcon
                            onClick={handleClose}
                            style={{ cursor: "pointer" }}
                        />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        <DialogContentText
                            id="scroll-dialog-description"
                            tabIndex={-1}
                        >
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                            >
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Asunto</FormLabel>
                                    <TextField
                                        id="subject"
                                        name="subject"
                                        size="small"
                                        fullWidth
                                        value={formik.values.subject}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.subject &&
                                            Boolean(formik.errors.subject)
                                        }
                                        helperText={
                                            formik.touched.subject && formik.errors.subject
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormControl fullWidth>
                                        <FormLabel>Estado</FormLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="status"
                                            name="status"
                                            size="small"
                                            value={formik.values.status}
                                            onChange={formik.handleChange}
                                            error={formik.touched.status && Boolean(formik.errors.status)}
                                        >
                                            <MenuItem value="Planned">Planificada</MenuItem>
                                            <MenuItem value="Held">Realizada</MenuItem>
                                            <MenuItem value="Not Held">No Realizada</MenuItem>
                                        </Select>
                                        <FormHelperText
                                            error={
                                                formik.touched.status && Boolean(formik.errors.status)
                                            }
                                        >
                                            {formik.touched.status && formik.errors.status}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormLabel>Fecha y Hora de Inicio</FormLabel>
                                    <TextField
                                        id="startDateTime"
                                        name="startDateTime"
                                        size="small"
                                        type="datetime-local"
                                        fullWidth
                                        value={formik.values.startDateTime}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.startDateTime &&
                                            Boolean(formik.errors.startDateTime)
                                        }
                                        helperText={
                                            formik.touched.startDateTime && formik.errors.startDateTime
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <FormLabel>Duración</FormLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="duration"
                                            name="duration"
                                            size="small"
                                            value={formik.values.duration}
                                            onChange={formik.handleChange}
                                            error={formik.touched.duration && Boolean(formik.errors.duration)}
                                        >
                                            <MenuItem value="15 minutes">15 minutos</MenuItem>
                                            <MenuItem value="30 minutes">30 minutos</MenuItem>
                                            <MenuItem value="45 minutes">45 minutos</MenuItem>
                                            <MenuItem value="1 hour">1 hora</MenuItem>
                                            <MenuItem value="1.5 hours">1.5 horas</MenuItem>
                                            <MenuItem value="2 hours">2 horas</MenuItem>
                                            <MenuItem value="3 hours">3 horas</MenuItem>
                                        </Select>
                                        <FormHelperText
                                            error={
                                                formik.touched.duration && Boolean(formik.errors.duration)
                                            }
                                        >
                                            {formik.touched.duration && formik.errors.duration}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <FormLabel>Relacionado Con</FormLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="relatedTo"
                                            name="relatedTo"
                                            size="small"
                                            value={formik.values.relatedTo}
                                            onChange={formik.handleChange}
                                            error={formik.touched.relatedTo && Boolean(formik.errors.relatedTo)}
                                        >
                                            <MenuItem value="Lead">Lead</MenuItem>
                                            <MenuItem value="Contact">Contact</MenuItem>
                                        </Select>
                                        <FormHelperText
                                            error={
                                                formik.touched.relatedTo && Boolean(formik.errors.relatedTo)
                                            }
                                        >
                                            {formik.touched.relatedTo && formik.errors.relatedTo}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                {
                                    formik.values.relatedTo === "Lead" &&
                                    <Grid item xs={12} sm={6}>
                                        <FormLabel>Lead</FormLabel>
                                        <Autocomplete
                                            id="lead-autocomplete"
                                            options={leadData}
                                            getOptionLabel={(lead) => `${lead.firstName} ${lead.lastName}`}
                                            value={leadData.find(lead => lead._id === formik.values.lead_id) || null}
                                            onChange={(event, newValue) => {
                                                formik.setFieldValue("lead_id", newValue ? newValue._id : "");
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    size="small"
                                                    error={formik.touched.lead_id && Boolean(formik.errors.lead_id)}
                                                    helperText={formik.touched.lead_id && formik.errors.lead_id}
                                                />
                                            )}
                                        />
                                    </Grid>
                                }
                                {
                                    formik.values.relatedTo === "Contact" &&
                                    <Grid item xs={12} sm={6}>
                                        <FormLabel>Contacto</FormLabel>
                                        <Autocomplete
                                            id="contact-autocomplete"
                                            options={contactData}
                                            getOptionLabel={(contact) => `${contact.firstName} ${contact.lastName}`}
                                            value={contactData.find(contact => contact._id === formik.values.contact_id) || null}
                                            onChange={(event, newValue) => {
                                                formik.setFieldValue("contact_id", newValue ? newValue._id : "");
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    size="small"
                                                    error={formik.touched.contact_id && Boolean(formik.errors.contact_id)}
                                                    helperText={formik.touched.contact_id && formik.errors.contact_id}
                                                />
                                            )}
                                        />
                                    </Grid>
                                }
                                <Grid item xs={12} sm={12}>
                                    <FormLabel>Nota</FormLabel>
                                    <TextField
                                        id="note"
                                        name="note"
                                        size="small"
                                        fullWidth
                                        rows={4}
                                        multiline
                                        value={formik.values.note}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.note &&
                                            Boolean(formik.errors.note)
                                        }
                                        helperText={
                                            formik.touched.note && formik.errors.note
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </DialogContentText>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        type="submit"
                        variant="contained"
                        onClick={formik.handleSubmit}
                        style={{ textTransform: "capitalize" }}
                        color="secondary"
                    >
                        Guardar
                    </Button>
                    <Button
                        type="reset"
                        variant="outlined"
                        style={{ textTransform: "capitalize" }}
                        onClick={() => {
                            formik.resetForm()
                            handleClose()
                        }}
                        color="error"
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Addcalls