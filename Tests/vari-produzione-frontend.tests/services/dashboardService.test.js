import api from '../../../vari-produzione-frontend/src/services/api';
import { getDashboardData } from '../../../vari-produzione-frontend/src/services/dashboardService';
import '@testing-library/jest-dom';

jest.mock('../../../vari-produzione-frontend/src/services/api');

describe('Dashboard Service', () => {
    test('getDashboardData chiama l\'endpoint corretto e restituisce i dati', async () => {
        const mockResponse = { data: { ordiniTotali: 5 } };
        api.get.mockResolvedValue(mockResponse);

        const data = await getDashboardData();

        expect(api.get).toHaveBeenCalledWith('/produzione/dashboard');
        expect(data.ordiniTotali).toBe(5);
    });

    test('getDashboardData gestisce gli errori', async () => {
        api.get.mockRejectedValue(new Error('API Error'));

        await expect(getDashboardData()).rejects.toThrow('API Error');
    });
});
