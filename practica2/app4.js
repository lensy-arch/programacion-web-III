const mysql = require('mysql2');
const { performance } = require('perf_hooks');

// Configuración de la base de datos
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'testdb'
};

// Función para medir el tiempo de ejecución de una consulta
testConnectionMethods();

async function testConnectionMethods() {
  console.log("Probando métodos de conexión a MySQL...");

  await testBasicConnection();
  await testPromiseConnection();
  await testConnectionPool();
}

// Método 1: Conexión básica
function testBasicConnection() {
  return new Promise((resolve) => {
    const start = performance.now();
    const connection = mysql.createConnection(dbConfig);
    connection.connect(err => {
      if (err) {
        console.error("Error en conexión básica:", err);
      } else {
        console.log("Conexión básica establecida");
      }
      connection.query('SELECT 1', () => {
        connection.end();
        console.log(`Tiempo de ejecución (Conexión básica): ${(performance.now() - start).toFixed(2)} ms`);
        resolve();
      });
    });
  });
}

// Método 2: Usando Promesas
function testPromiseConnection() {
  return new Promise((resolve) => {
    const start = performance.now();
    const connection = mysql.createConnection(dbConfig).promise();
    connection.query('SELECT 1')
      .then(() => {
        console.log("Consulta con Promesas ejecutada correctamente");
      })
      .catch(err => console.error("Error en conexión con Promesas:", err))
      .finally(() => {
        connection.end();
        console.log(`Tiempo de ejecución (Con Promesas): ${(performance.now() - start).toFixed(2)} ms`);
        resolve();
      });
  });
}

// Método 3: Uso de agrupamiento de conexiones
function testConnectionPool() {
  return new Promise((resolve) => {
    const start = performance.now();
    const pool = mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error obteniendo conexión del pool:", err);
      } else {
        console.log("Conexión obtenida del pool");
        connection.query('SELECT 1', () => {
          connection.release();
          console.log(`Tiempo de ejecución (Pool de conexiones): ${(performance.now() - start).toFixed(2)} ms`);
          pool.end();
          resolve();
        });
      }
    });
  });
}
