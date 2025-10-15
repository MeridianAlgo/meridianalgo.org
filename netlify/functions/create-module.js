const fs = require('fs').promises;
const path = require('path');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const adminCode = event.headers['x-admin-code'];
  if (adminCode !== Buffer.from('MERIDIAN2024').toString('base64')) {
    return { statusCode: 403, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  try {
    const moduleData = JSON.parse(event.body);
    const modulePath = path.join(process.cwd(), 'public/data/lessons/modules', moduleData.id);
    
    await fs.mkdir(modulePath, { recursive: true });
    await fs.mkdir(path.join(modulePath, 'lessons'), { recursive: true });
    
    await fs.writeFile(
      path.join(modulePath, 'module.json'),
      JSON.stringify(moduleData, null, 2)
    );
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Module created' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
