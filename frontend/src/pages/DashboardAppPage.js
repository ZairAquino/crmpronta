/* eslint-disable react-hooks/exhaustive-deps */
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import { useEffect, useState } from 'react';
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppOrderTimeline,
  AppWidgetSummary,
} from '../sections/@dashboard/app';
import { apiget } from '../service/api';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  const [totalLead, setTotalLead] = useState([])
  const [totalContact, setTotalContact] = useState([])
  const [totalPolicy, setTotalPolicy] = useState([])
  const [totalEvent, setTotalEvent] = useState([])
  const userid = localStorage.getItem('user_id');
  const userRole = localStorage.getItem("userRole")

  // lead api
  const fetchLead = async () => {
    const result = await apiget(userRole === 'admin' ? `lead/list` : `lead/list/?createdBy=${userid}`)
    if (result && result.status === 200) {
      setTotalLead(result?.data?.total_recodes)
    }
  }

  // contact api
  const fetchContact = async () => {
    const result = await apiget(userRole === 'admin' ? `contact/list` : `contact/list/?createdBy=${userid}`)
    if (result && result.status === 200) {
      setTotalContact(result?.data?.total_recodes)
    }
  }

  // contact api
  const fetchPolicy = async () => {
    const result = await apiget(userRole === 'admin' ? `policy/list` : `policy/list/?createdBy=${userid}`)
    if (result && result.status === 200) {
      setTotalPolicy(result?.data?.total_recodes)
    }
  }

  // contact api
  const fetchEvent = async () => {
    const result = await apiget(userRole === 'admin' ? `task/list` : `task/list/?createdBy=${userid}`)
    if (result && result.status === 200) {
      setTotalEvent(result?.data?.total_recodes)
    }
  }

  useEffect(() => {
    fetchLead();
    fetchContact();
    fetchPolicy();
    fetchEvent();
  }, [])
  return (
    <>
      <Helmet>
        {/* <title> Dashboard | Minimal UI </title> */}
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hola, Bienvenido de vuelta 
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Leads" total={totalLead} icon={'ic:baseline-leaderboard'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Contactos" total={totalContact} color="info" icon={'fluent:book-contacts-24-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Pólizas" total={totalPolicy} color="warning" icon={'ic:baseline-policy'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Tareas" total={totalEvent} color="error" icon={'mdi:events'} />
          </Grid>











          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Timeline de Órdenes"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, órdenes, $4220',
                  '12 Facturas han sido pagadas',
                  'Órden #37745 de septiembre',
                  'Nueva orden colocada #XF-2356',
                  'Nueva orden colocada #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>



          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tareas"
              list={[
                { id: '1', label: 'Crear Logo de FireStone' },
                { id: '2', label: 'Agregar archivos SCSS y JS si son necesarios' },
                { id: '3', label: 'Reunión con Encargados' },
                { id: '4', label: 'Alcance y Estimaciones' },
                { id: '5', label: 'Exposición Sprint' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
