import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Datosreclamos from '../components/Academico/Datosreclamos.js';
import Swal from 'sweetalert2';
// Mock axios
jest.mock('axios');
jest.mock('sweetalert2');
describe("Renderizar reclamos de academico", () => {
    beforeEach(() => {
        axios.get.mockResolvedValue({
            data: [
                { ID_RECLAMO: 1, TITULO_RECLAMO: "Reclamo 1", NOMBRE_CATEGORIA: "Categoria 1", DESCRIPCION_RECLAMO: "Descripcion 1", NOMBRE_ESTADO: "Pendiente", FECHA_FORMATEADA: "2024-01-01" },
                { ID_RECLAMO: 2, TITULO_RECLAMO: "Reclamo 2", NOMBRE_CATEGORIA: "Categoria 2", DESCRIPCION_RECLAMO: "Descripcion 2", NOMBRE_ESTADO: "Solucionado", FECHA_FORMATEADA: "2024-02-01" }
            ]
        });
    });

    test('Renderizar los componentes', () => {
        render(<Datosreclamos />)
        expect(screen.getByTitle('Reclamos asociados'));
    });

    test('Renderizar el buscador', () => {
        render(<Datosreclamos />)
        expect(screen.getByTitle('buscadorReclamo'));
    });

    test('Cargar y mostrar los reclamos', async () => {
        render(<Datosreclamos />);
        await waitFor(() => {
            expect(screen.getByText('Reclamo 1'));
            expect(screen.getByText('Reclamo 2'));
        });
    });
});


describe('Responder reclamos', () => {
    beforeEach(() => {
      axios.get.mockResolvedValueOnce({
        data: {
          Status: 'Success',
          userid: '123',
          usertype: 'academico',
        },
      });
  
      axios.get.mockResolvedValueOnce({
        data: [
          {
            ID_RECLAMO: 1,
            TITULO_RECLAMO: 'Reclamo 1',
            DESCRIPCION_RECLAMO: 'Descripción del reclamo 1',
            NOMBRE_CATEGORIA: 'Categoría 1',
            NOMBRE_ESTADO: 'Pendiente',
            FECHA_FORMATEADA: '2024-07-01',
          },
          {
            ID_RECLAMO: 2,
            TITULO_RECLAMO: 'Reclamo 2',
            DESCRIPCION_RECLAMO: 'Descripción del reclamo 2',
            NOMBRE_CATEGORIA: 'Categoría 2',
            NOMBRE_ESTADO: 'Pendiente',
            FECHA_FORMATEADA: '2024-07-02',
          },
        ],
      });
  
      axios.post.mockResolvedValue({
        data: {
          message: 'Respuesta enviada',
        },
      });
  
      Swal.fire.mockResolvedValue({
        isConfirmed: true,
      });
    });
  
    test('Responder un reclamo', async () => {
      render(<Datosreclamos />);
  
      // Espera que los reclamos sean cargados
      await waitFor(() => {
        expect(screen.getByText('Reclamo 1'));
        expect(screen.getByText('Reclamo 2'));
      });
  
      // Simula la acción de responder un reclamo
      const responderButton = screen.getAllByText('Responder')[0];
      fireEvent.click(responderButton);
  
      // Espera que el modal sea visible
      await waitFor(() => {
        expect(screen.getByRole('dialog'));
      });
  
      // Simula el ingreso de la respuesta
      const respuestaInput = screen.getByLabelText('Responder');
      fireEvent.change(respuestaInput, { target: { value: 'Respuesta del reclamo 1' } });
  
      // Simula la acción de guardar la respuesta
      const guardarButton = screen.getByText('Guardar cambios');
      fireEvent.click(guardarButton);

      await waitFor(() => {
        expect(screen.getByText('En proceso'));
      });
      
      
    });
  });

