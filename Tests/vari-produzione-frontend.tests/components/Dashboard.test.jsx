import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import DashboardPage from '../../vari-produzione-frontend/src/pages/DashboardPage';
import * as dashboardService from '../../vari-produzione-frontend/src/services/dashboardService';
import '@testing-library/jest-dom';

jest.mock('../../vari-produzione-frontend/src/services/dashboardService');

const mockData = {
    ordiniTotali: 10,
    ordiniInRitardo: 2,
    taskInCorsso: 5,
    efficienza: 85.5,
    alerts: [
        { severita: 3, messaggio: 'Test Alert', tipoAlert: 'ritardo' }
    ],
    macchineStatus: []
};

describe('DashboardPage Component', () => {
    beforeEach(() => {
        dashboardService.getDashboardData.mockResolvedValue(mockData);
    });

    test('mostra il caricamento iniziale', () => {
        render(<DashboardPage />);
        expect(screen.getByText(/Caricamento dashboard.../i)).toBeInTheDocument();
    });

    test('renderizza i dati KPI correttamente dopo il caricamento', async () => {
        render(<DashboardPage />);

        await waitFor(() => {
            expect(screen.getByText('10')).toBeInTheDocument();
            expect(screen.getByText('2')).toBeInTheDocument();
            expect(screen.getByText('85.5%')).toBeInTheDocument();
        });
    });

    test('mostra gli alert ricevuti dal servizio', async () => {
        render(<DashboardPage />);

        await waitFor(() => {
            expect(screen.getByText('Test Alert')).toBeInTheDocument();
        });
    });
});
