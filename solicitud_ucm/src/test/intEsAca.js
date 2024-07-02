import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Profile from '../pages/vistaEstudiante/Profile.js';
import Swal from 'sweetalert2';
import Datos from '../components/Estudiante/Datos.js';

// Mock axios and SweetAlert2
jest.mock('axios');
jest.mock('sweetalert2');

beforeEach(() => {
  axios.get.mockImplementation((url) => {
    if (url === "http://localhost:8000/ShowAreas") {
      return Promise.resolve({ data: [{ ID_AREA: 1, NOMBRE_AREA: 'Area 1' }] });
    }
    if (url === "http://localhost:8000/ShowCategoria2?area=") {
      return Promise.resolve({ data: [{ ID_CATEGORIA: 1, NOMBRE_CATEGORIA: 'Categoria 1' }] });
    }
    if (url === "http://localhost:8000") {
      return Promise.resolve({ data: { Status: 'Success', userid: 20759841, username: 'Test User', useremail: 'test@example.com', usertype: 'student', userCarrera: 'Ingeniería' } });
    }
    if (url === "http://localhost:8000/api/reclamos") {
      return Promise.resolve({
        data: [
          { ID_RECLAMO: 1, TITULO_RECLAMO: "Reclamo 1", NOMBRE_CATEGORIA: "Categoria 1", DESCRIPCION_RECLAMO: "Descripcion 1", NOMBRE_ESTADO: "Pendiente", FECHA_FORMATEADA: "2024-01-01" },
          { ID_RECLAMO: 2, TITULO_RECLAMO: "Reclamo 2", NOMBRE_CATEGORIA: "Categoria 2", DESCRIPCION_RECLAMO: "Descripcion 2", NOMBRE_ESTADO: "Solucionado", FECHA_FORMATEADA: "2024-02-01" }
        ]
      });
    }
    return Promise.reject(new Error('not found'));
  });
  axios.post.mockImplementation((url, data) => {
    if (url === 'http://localhost:8000/api/crear-reclamo') {
      // After creating the new reclamo, simulate the new get response
      axios.get.mockImplementation((url) => {
        if (url === "http://localhost:8000/api/reclamos") {
          return Promise.resolve({
            data: [
              { ID_RECLAMO: 1, TITULO_RECLAMO: "Reclamo 1", NOMBRE_CATEGORIA: "Categoria 1", DESCRIPCION_RECLAMO: "Descripcion 1", NOMBRE_ESTADO: "Pendiente", FECHA_FORMATEADA: "2024-01-01" },
              { ID_RECLAMO: 2, TITULO_RECLAMO: "Reclamo 2", NOMBRE_CATEGORIA: "Categoria 2", DESCRIPCION_RECLAMO: "Descripcion 2", NOMBRE_ESTADO: "Solucionado", FECHA_FORMATEADA: "2024-02-01" },
              { ID_RECLAMO: 3, TITULO_RECLAMO: "Test Título", NOMBRE_CATEGORIA: "Categoria 1", DESCRIPCION_RECLAMO: "Test Descripción", NOMBRE_ESTADO: "Pendiente", FECHA_FORMATEADA: "2024-03-01" }
            ]
          });
        }
        return Promise.reject(new Error('not found'));
      });
      return Promise.resolve({ data: { message: 'Reclamo creado con éxito' } });
    }
    return Promise.reject(new Error('error'));
  });
});

describe("Crear reclamo y que sea visualizado por academico", () => {
  test('Crear un reclamo', async () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    // Wait for the component to load
    await screen.findByTitle('Carta-perfil');

    // Simulate opening the "Crear reclamos" modal
    fireEvent.click(screen.getByText('Crear reclamos'));

    // Ensure the modal is opened
    await waitFor(() => expect(screen.getByText('Formulario Reclamo')));

    // Fill out the claim form
    fireEvent.change(screen.getByLabelText('Título del Reclamo'), { target: { value: 'Test Título' } });
    fireEvent.change(screen.getByLabelText('Descripción del Reclamo'), { target: { value: 'Test Descripción' } });
    fireEvent.change(screen.getByLabelText('Visibilidad'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Área'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Categoría'), { target: { value: '1' } });

    // Simulate form submission
    fireEvent.click(screen.getByText('Crear reclamo'));

    // Verify that axios.post was called with the correct data
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/api/crear-reclamo', {
        userid: 20759841,
        titulo: 'Test Título',
        descripcion: 'Test Descripción',
        visibilidad: '1',
        area: '1',
        categoria: '1'
      });
    });

    // Verify that the success alert was called
    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: 'success',
        title: 'Reclamo creado con éxito',
        showConfirmButton: false,
        timer: 1500
      });
    });

    // Verify that the new reclamo appears in the Datos
    render(<Datos />);

    await waitFor(() => {
      expect(screen.findByText('Reclamo 1'));
      expect(screen.findByText('Reclamo 2'));
      expect(screen.findByText('Test Título'));
    });
  });
});
