const { CosmosClient } = require('@azure/cosmos');

let tasksContainer;

const getCosmosConfig = () => {
  const endpoint = process.env.COSMOS_ENDPOINT;
  const key = process.env.COSMOS_KEY;
  const databaseId = process.env.COSMOS_DATABASE || 'taskmanagerdb';
  const containerId = process.env.COSMOS_CONTAINER || 'tasks';

  if (!endpoint || !key) {
    throw new Error('COSMOS_ENDPOINT and COSMOS_KEY are required');
  }

  return { endpoint, key, databaseId, containerId };
};

const connectDB = async () => {
  try {
    const { endpoint, key, databaseId, containerId } = getCosmosConfig();
    const client = new CosmosClient({ endpoint, key });
    const database = client.database(databaseId);

    tasksContainer = database.container(containerId);
    await tasksContainer.read();

    console.log(`Azure Cosmos DB connected: ${databaseId}/${containerId}`);
  } catch (error) {
    console.error('Error connecting to Azure Cosmos DB:', error.message);
    process.exit(1);
  }
};

const getTasksContainer = () => {
  if (!tasksContainer) {
    throw new Error('Azure Cosmos DB container is not initialized');
  }

  return tasksContainer;
};

module.exports = {
  connectDB,
  getTasksContainer
};
