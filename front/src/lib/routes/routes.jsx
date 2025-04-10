
import {createBrowserRouter} from 'react-router'
import Layout from '@/Layout'
import Home from '@/pages/Home';
import RedactarCorreo from '@/pages/RedactarCorreo';
import ListaCorreos from '@/pages/ListaCorreos';


const router = createBrowserRouter(
    [{
        path: '/',
        element: <Layout />,
        children: [
            {
            path: '/',
            element: <Home />
            },
            {
            path: '/nuevo',
            element: <RedactarCorreo />
            },
            {
            path: '/correos',
            element: <ListaCorreos />
            }
        ],
    }]
);

export default router;