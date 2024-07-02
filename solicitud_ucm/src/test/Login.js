import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Login from '../pages/Login'; // Adjust the import path as needed
import { AuthContext } from '../pages/AuthContext'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Login Component', () => {
  const mockSetUser = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    axios.post.mockClear();
    axios.get.mockClear();
    mockSetUser.mockClear();
    mockNavigate.mockClear();
    useNavigate.mockReturnValue(mockNavigate);
  });

  test('successful login', async () => {
    axios.post.mockResolvedValueOnce({
      data: { Status: 'Success', token: 'fake-jwt-token' },
    });
    axios.get.mockResolvedValueOnce({
      data: {
        userid: 20759841,
        username: 'Test User',
        useremail: 'test@example.com',
        usertype: 1,
        userCarrera: 'Ingeniería',
      },
    });

    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ setUser: mockSetUser }}>
          <Login />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Ingrese su RUT'), { target: { value: '20759841' } });
    fireEvent.change(screen.getByPlaceholderText('Ingrese su contraseña'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Iniciar Sesión'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/login', {
        rut: '20759841',
        password: 'password',
      });
    });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/', {
        headers: {
          Authorization: 'Bearer fake-jwt-token',
        },
      });
    });

    await waitFor(() => {
      expect(mockSetUser).toHaveBeenCalledWith({
        userid: 20759841,
        username: 'Test User',
        useremail: 'test@example.com',
        usertype: 1,
        userCarrera: 'Ingeniería',
      });
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  test('unsuccessful login', async () => {
    axios.post.mockResolvedValueOnce({
      data: { Status: 'Error', Error: 'Invalid credentials' },
    });

    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ setUser: mockSetUser }}>
          <Login />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Ingrese su RUT'), { target: { value: '20759841' } });
    fireEvent.change(screen.getByPlaceholderText('Ingrese su contraseña'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByText('Iniciar Sesión'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/login', {
        rut: '20759841',
        password: 'wrongpassword',
      });
    });

    await waitFor(() => {
      expect(screen.queryByText('Invalid credentials'));
    });
  });
});
