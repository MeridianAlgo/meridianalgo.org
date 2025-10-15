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
    const { moduleId, quizData } = JSON.parse(event.body);
    const quizPath = path.join(
      process.cwd(),
      'public/data/lessons/modules',
      moduleId,
      'quiz.json'
    );
    
    await fs.writeFile(quizPath, JSON.stringify(quizData, null, 2));
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Quiz created' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
