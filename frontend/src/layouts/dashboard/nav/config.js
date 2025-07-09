// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;


const navConfig = [
  {
    title: 'Panel Principal',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Gestión de Leads',
    path: '/dashboard/lead',
    icon: icon('ic_lead'),
  },
  {
    title: 'Gestión de Contactos',
    path: '/dashboard/contact',
    icon: icon('ic_contact'),
  },
  {
    title: 'Gestión de Pólizas',
    path: '/dashboard/policy',
    icon: icon('ic_policy'),
  },
  {
    title: 'Tareas',
    path: '/dashboard/task',
    icon: icon('ic_task'),
  },
  {
    title: 'Reuniones',
    path: '/dashboard/meeting',
    icon: icon('ic_meeting'),
  },
  {
    title: 'Llamadas',
    path: '/dashboard/call',
    icon: icon('ic_call'),
  },
  {
    title: 'Correos',
    path: '/dashboard/email',
    icon: icon('ic_email'),
  },
  {
    title: 'Calendario',
    path: '/dashboard/calendar',
    icon: icon('ic_calendar'),
  },
  {
    title: 'Gestión de Documentos',
    path: '/dashboard/document',
    icon: icon('ic_document'),
  },
  {
    title: 'Plantillas de Email',
    path: '/dashboard/emailtemplate',
    icon: icon('ic_emailTemplate'),
  },
  {
    title: 'Gestión de Usuarios',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },

  // {
  //   title: 'History',
  //   path: '/dashboard/history',
  //   icon: icon('ic_history'),
  // },

];

export default navConfig;
