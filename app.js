const { Pool } = require('pg');

// Configuração do pool de conexões com o banco de dados PostgreSQL
const pool = new Pool({
    connectionString: 'postgresql://default:kaDLqePyI4b9@ep-crimson-poetry-a4wbybo0.us-east-1.aws.neon.tech:5432/verceldb',
    ssl: {
      rejectUnauthorized: false,
    },
  });

// Função para obter as tarefas do banco de dados
const getTarefas = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM tarefas');
    client.release();
    return result.rows;
  } catch (error) {
    console.error('Erro ao obter tarefas:', error);
    throw error;
  }
};

// Função para adicionar uma nova tarefa ao banco de dados
const adicionarTarefa = async (tarefa) => {
  try {
    const client = await pool.connect();
    await client.query('INSERT INTO tarefas (tarefa, status) VALUES ($1, $2)', [tarefa, '']);
    client.release();
  } catch (error) {
    console.error('Erro ao adicionar tarefa:', error);
    throw error;
  }
};

// Event listener para o botão de adicionar tarefa
document.getElementById('adicionarTarefa').addEventListener('click', () => {
    const texto = document.getElementById('newItem').querySelector('input[type="text"]').value.trim();
    if (texto !== '') {
        adicionarTarefa(texto)
            .then(() => {
                console.log('Tarefa adicionada com sucesso.');
                atualizarTela();
                document.getElementById('newItem').querySelector('input[type="text"]').value = ''; // Limpar campo de texto
            })
            .catch((err) => {
                console.error('Erro ao adicionar tarefa:', err);
            });
    }
});
