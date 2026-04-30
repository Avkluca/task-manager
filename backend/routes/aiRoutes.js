const express = require('express');
const OpenAI = require('openai');

const router = express.Router();

router.post('/generate-task', async (req, res) => {
  const title = req.body.title;

  if (!title || !title.trim()) {
    return res.status(400).json({ message: 'Task title is required' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ message: 'OpenAI API key is not configured' });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      input: [
        {
          role: 'system',
          content:
            'You are an AI task assistant. Generate concise, practical task details. Return only JSON that matches the schema.'
        },
        {
          role: 'user',
          content: `Task title: ${title.trim()}\n\nGenerate a better description, 3 to 5 subtasks, and a priority.`
        }
      ],
      text: {
        format: {
          type: 'json_schema',
          name: 'task_assistant_response',
          strict: true,
          schema: {
            type: 'object',
            properties: {
              description: {
                type: 'string'
              },
              subtasks: {
                type: 'array',
                items: {
                  type: 'string'
                }
              },
              priority: {
                type: 'string',
                enum: ['High', 'Medium', 'Low']
              }
            },
            required: ['description', 'subtasks', 'priority'],
            additionalProperties: false
          }
        }
      }
    });

    const generatedTask = JSON.parse(response.output_text);

    res.json({
      description: generatedTask.description,
      subtasks: generatedTask.subtasks,
      priority: generatedTask.priority
    });
  } catch (error) {
    console.error('Error generating task with AI:', error);
    res.status(500).json({ message: 'Failed to generate task with AI' });
  }
});

module.exports = router;
