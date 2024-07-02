import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Login from '../pages/Login';
import CompShowUsu from '../components/Admin/ShowUsuarios';
import { AuthContext } from '../pages/AuthContext';
import { useNavigate } from 'react-router-dom';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Creacion y login de usuario', () => {
  const mockSetUser = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    axios.post.mockClear();
    axios.get.mockClear();
    mockSetUser.mockClear();
    mockNavigate.mockClear();
    useNavigate.mockReturnValue(mockNavigate);
  });

  test('Se debe crear e iniciar sesion correctamente con el usuario', async () => {
    // Respuesta del mock
    axios.post.mockResolvedValueOnce({ data: {} });

    // Renderizar componente
    render(<CompShowUsu />);

    // Simular abrir modal
    fireEvent.click(screen.getByText('CREAR USUARIO'));

    // Verificar que el modal esta abierto
    expect(screen.getByText('Crear nuevo usuario'));

    // llnar formulario
    fireEvent.change(screen.getByLabelText('RUT'), { target: { value: '20759841'} });
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'MANUEL' } });
    fireEvent.change(screen.getByLabelText('Apellido'), { target: { value: 'MUÑOZ' } });
    fireEvent.change(screen.getByLabelText('Clave'), { target: { value: '123ASD' } });
    fireEvent.change(screen.getByLabelText('Generacion'), { target: { value: '2020' } });
    fireEvent.change(screen.getByLabelText('ID CARRERA'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('ID TIPO USUARIO'), { target: { value: '1' } });

    // Simular click en boton crear usuario
    fireEvent.click(screen.getByText('Crear usuario'));

    // ejecutar la consulta post
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

    // Renderizar login
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ setUser: mockSetUser }}>
          <Login />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    // Mockear respuesta login
    axios.post.mockResolvedValueOnce({
      data: { Status: 'Success', token: 'fake-jwt-token' },
    });

    // Mockear el usuario
    axios.get.mockResolvedValueOnce({
      data: {
        userid: 20759841,
        username: 'MANUEL MUÑOZ',
        useremail: 'test@example.com',
        usertype: 1,
        userCarrera: 'Ingeniería',
      },
    });

    // Simular formulario de login
    fireEvent.change(screen.getByPlaceholderText('Ingrese su RUT'), { target: { value: '20759841' } });
    fireEvent.change(screen.getByPlaceholderText('Ingrese su contraseña'), { target: { value: '123ASD' } });
    fireEvent.click(screen.getByText('Iniciar Sesión'));

    // esperar respuesta
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/login', {
        rut: '20759841',
        password: '123ASD',
      });
    });

    // esperar los detalles del usuario
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/', {
        headers: {
          Authorization: 'Bearer fake-jwt-token',
        },
      });
    });

    // verificar datos del usuario
    await waitFor(() => {
      expect(mockSetUser).toHaveBeenCalledWith({
        userid: 20759841,
        username: 'MANUEL MUÑOZ',
        useremail: 'test@example.com',
        usertype: 1,
        userCarrera: 'Ingeniería',
      });
    });

    // redireccionar
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});
