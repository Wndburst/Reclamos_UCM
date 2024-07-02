import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CompShowArea from '../components/Admin/ShowArea.js'
import CompShowCarrera from '../components/Admin/ShowCarrera.js';
import CompShowUsu from '../components/Admin/ShowUsuarios.js';
import axios from 'axios';


// Mock axios
jest.mock('axios');

describe('CompShowArea render component', () => {
  test('la tabla se renderiza', () => {
    render(<CompShowArea />);
    expect(screen.getByRole('table'));
  });
  test('Debe crear un área correctamente', async () => {
    // Mock de la respuesta de la API para crear área
    axios.post.mockResolvedValueOnce({ data: {} });

    render(<CompShowArea />);

    // Simular la apertura del modal
    fireEvent.click(screen.getByText('CREAR AREA'));

    // Verificar que el modal está abierto
    expect(screen.getByText('Crear Nueva Área'));

    // Simular la entrada de datos en el formulario
    fireEvent.change(screen.getByLabelText('Nombre del Área'), { target: { value: 'Nueva Área' } });

    // Simular el clic en el botón para crear el área
    fireEvent.click(screen.getByText('Crear Área'));

    // Esperar a que la función axios.post haya sido llamada
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/crear-area', {
        NOMBRE_AREA: 'Nueva Área',
      });
    });

    // Verificar que el modal se cierra después de crear el área
    expect(screen.queryByText('Crear Nueva Área')).not;
  });
});


describe("Renderizar componente carrera", ()=>{
    test('la tabla se renderiza', () => {
        render(<CompShowCarrera />);
        expect(screen.getByRole('table'));
      });

      test('Debe crear una carrera correctamente', async () => {
        // Mock de la respuesta de la API para crear área
        axios.post.mockResolvedValueOnce({ data: {} });
    
        render(<CompShowCarrera />);
    
        // Simular la apertura del modal
        fireEvent.click(screen.getByText('CREAR CARRERA'));
    
        // Verificar que el modal está abierto
        expect(screen.getByText('Crear Nueva Carrera'));
    
        // Simular la entrada de datos en el formulario
        fireEvent.change(screen.getByLabelText('Nombre del la carrera'), { target: { value: 'Nueva carrera' } });
        fireEvent.change(screen.getByLabelText('ID Facultad'), { target: { value: '3' } });
    
        // Simular el clic en el botón para crear el área
        fireEvent.click(screen.getByText('Crear Carrera'));
    
        // Esperar a que la función axios.post haya sido llamada
        await waitFor(() => {
          expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/crear-carrera', {
            N_CARRERA: 'Nueva carrera',
            ID: '3'
          });
        });
    
        // Verificar que el modal se cierra después de crear el área
        expect(screen.queryByText('Crear Nueva Carrera')).not;
      });
})


describe("Renderizar componente usuarios", () => {
    test('la tabla se renderiza', () => {
      render(<CompShowUsu />);
      expect(screen.getByRole('table'));
    });
  
    test('Debe crear un usuario correctamente', async () => {
      // Mock de la respuesta de la API para crear área
      axios.post.mockResolvedValueOnce({ data: {} });
  
      render(<CompShowUsu />);
  
      // Simular la apertura del modal
      fireEvent.click(screen.getByText('CREAR USUARIO'));
  
      // Verificar que el modal está abierto
      expect(screen.getByText('Crear nuevo usuario'));
  
      // Simular la entrada de datos en el formulario
      fireEvent.change(screen.getByLabelText('RUT'), { target: { value: '20759841'} });
      fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'MANUEL' } });
      fireEvent.change(screen.getByLabelText('Apellido'), { target: { value: 'MUÑOZ' } });
      fireEvent.change(screen.getByLabelText('Clave'), { target: { value: '123ASD' } });
      fireEvent.change(screen.getByLabelText('Generacion'), { target: { value: '2020' } });
      fireEvent.change(screen.getByLabelText('ID CARRERA'), { target: { value: '1' } });
      fireEvent.change(screen.getByLabelText('ID TIPO USUARIO'), { target: { value: '1' } });
  
      // Simular el clic en el botón para crear el usuario
      fireEvent.click(screen.getByText('Crear usuario'));
  
      // Esperar a que la función axios.post haya sido llamada
      await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/api/crear-usuario', {
          R_USUARIO: '20759841',
          N_USUARIO: 'MANUEL',
          A_USUARIO: 'MUÑOZ',
          P_USUARIO: '123ASD',
          G_USUARIO: '2020',
          ID_TIPOUSU: '1',
          ID_CARR: '1',
        });
      });
  
      // Verificar que el modal se cierra después de crear el usuario
      expect(screen.queryByText('Crear nuevo usuario'));
    });
  });