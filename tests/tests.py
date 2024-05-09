import unittest
import requests
import psycopg2

class TestSimulationsEndpoint(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.base_url = 'http://localhost:3000'  # Modifica el puerto si es necesario
        cls.payload = {
            "userId": 1,
            "userRut": "12345678-9",
            "totalAmount": 100000,
            "startDate": "2024-05-09",
            "endDate": "2025-05-09",
            "interestRate": 0.1
        }
        cls.conn = psycopg2.connect(
            dbname='software',
            user='postgres',
            password='asd123',
            host='localhost',
            port='5432'
        )
        cls.cur = cls.conn.cursor()

    @classmethod
    def tearDownClass(cls):
        # Aquí elimino los datos creados en la BD
        cls.cur.execute('DELETE FROM "Simulations" WHERE "userId" = 1')
        cls.conn.commit()


    def test_simulation_output_structure(self):
    # Realiza la solicitud POST al endpoint '/simulations'
        response = requests.post(f'{self.base_url}/simulations', json=self.payload)
        data = response.json()

        # Verifica que la respuesta tenga la estructura correcta
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(data, dict)
        self.assertIn('id_simulacion', data)
        self.assertIsInstance(data['id_simulacion'], int)
        self.assertIn('cuotas', data)
        self.assertIsInstance(data['cuotas'], list)

        for cuota in data['cuotas']:
            self.assertIsInstance(cuota, dict)
            self.assertIn('id', cuota)
            self.assertIsInstance(cuota['id'], int)
            self.assertIn('nCuota', cuota)
            self.assertIsInstance(cuota['nCuota'], int)
            self.assertIn('fechaVencimiento', cuota)
            self.assertIsInstance(cuota['fechaVencimiento'], str)
            self.assertIn('montoUF', cuota)
            self.assertIsInstance(cuota['montoUF'], int)

    def test_simulation_bad_request(self):
        # Prueba para verificar que una solicitud GET al endpoint '/simulations' retorna un código de estado 404

        # Realiza la solicitud PUT al endpoint '/simulations'
        response = requests.put(f'{self.base_url}/simulations')

        # Verifica que la solicitud retorne un código de estado 404
        self.assertEqual(response.status_code, 404)

class TestSolicitudesEndpoint(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.base_url = 'http://localhost:3000'  # Modifica el puerto si es necesario
        cls.conn = psycopg2.connect(
            dbname='software',
            user='postgres',
            password='asd123',
            host='localhost',
            port='5432'
        )
        cls.cur = cls.conn.cursor()
        #Inserto una simulacion para poder hacer la solicitud
        #Creo las variables createdAt y updatedAt para que no haya problemas con la creacion de la solicitud
        created_at = '2024-05-09 00:00:00.000000'
        updated_at = '2024-05-09 00:00:00.000000'
        cls.cur.execute(f'INSERT INTO "Simulations" ("userId", "userRut", "totalAmount", "startDate", "endDate", "interestRate", "ufValueAtCreation", "createdAt", "updatedAt") VALUES (2, \'12345678-9\', 100000, \'2024/05/09\', \'2025/05/09\', 0.1, 35000, \'{created_at}\', \'{updated_at}\') RETURNING "id"')
        cls.conn.commit()
        simulation_id = cls.cur.fetchone()[0] #Obtengo el id de la simulacion válido
        cls.valid_payload = {
            "id_simulacion": int(simulation_id),
        }
        cls.invalid_payload = {
            "id_simulacion": -1,
        }
    
    @classmethod
    def tearDownClass(cls):
        #Elimino de la bd la ultima solicitud creada
        cls.cur.execute('DELETE FROM "Solicitudes" WHERE "id_ejecutivo" = 2')
        cls.conn.commit()

    def test_create_solicitudes_with_valid_id_simulacion(self):
        response = requests.post(f'{self.base_url}/solicitud', json=self.valid_payload)
        data = response.json()
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(data, dict)
        self.assertIn('message', data)
        self.assertEqual(data['message'], 'Solicitud creada exitosamente')

    def test_create_solicitudes_with_invalid_id_simulacion(self):
        response = requests.post(f'{self.base_url}/solicitudes', json=self.invalid_payload)
        self.assertEqual(response.status_code, 400)

if __name__ == '__main__':
    unittest.main()

