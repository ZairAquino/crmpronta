import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { useFormik } from 'formik';
import * as yup from "yup";

import CircularProgress from '@mui/material/CircularProgress';
import { apipost } from '../../../service/api';
import Iconify from '../../../components/iconify';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLogin] = useState(false)

  const initialValues = {
    emailAddress: "",
    password: ""
  }

  // -----------  validationSchema
  const validationSchema = yup.object({
    emailAddress: yup.string().email('Email inválido').required("El email es requerido"),
    password: yup.string().required("La contraseña es requerida"),

  });

  const Adddata = async (values) => {
    setIsLogin(true)
    const data = values
    try {
      const result = await apipost('user/login', data)

      if (result && result.status === 200) {
        localStorage.setItem('user', JSON.stringify(result?.data?.user))
        localStorage.setItem('user_id', result?.data?.user?._id)
        localStorage.setItem('userRole', result?.data?.user?.role)
        localStorage.setItem('token', result?.data?.token)
        navigate('/dashboard/app')
      }
    } catch (error) {
      console.error('Login error:', error)
      // El error ya se maneja en la función apipost con toast
    } finally {
      setIsLogin(false)
    }
  }

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      Adddata(values)
    },
  });


  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3} mb={2}>
          <TextField
            name="emailAddress"
            label="Email"
            value={formik.values.emailAddress}
            onChange={formik.handleChange}
            error={
              formik.touched.emailAddress &&
              Boolean(formik.errors.emailAddress)
            }
            helperText={
              formik.touched.emailAddress && formik.errors.emailAddress
            }
          />

          <TextField
            name="password"
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={
              formik.touched.password &&
              Boolean(formik.errors.password)
            }
            helperText={
              formik.touched.password && formik.errors.password
            }
          />
        </Stack>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" disabled={!!isLoading}>
          {isLoading ? <CircularProgress /> : 'Iniciar Sesión'}
        </LoadingButton>
      </form>
    </>
  );
}
