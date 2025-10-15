# MeridianAlgo Financial AI Integration

This project now includes a lightweight financial AI assistant that can answer user questions about financial topics.

## Features

- **Financial AI Chat Interface**: Interactive chat with a financial AI assistant
- **Multiple AI Models**: Support for different lightweight models from Hugging Face
- **Local Backend**: Optional Python backend for better performance
- **Fallback System**: Graceful fallback between local and cloud-based AI services
- **Educational Focus**: Provides educational information with appropriate disclaimers

## Directory Organization

The project has been reorganized with the following structure:

```
src/
├── ai/                          # AI-related utilities
├── features/
│   └── financial-chat/          # Financial chat feature
├── lib/
│   └── ai/                      # AI service implementations
├── types/
│   └── ai/                      # AI-related TypeScript types
└── pages/
    └── FinancialAI.tsx         # Financial AI page
```

## Setup Instructions

### 1. Frontend Setup (React/TypeScript)

The frontend is already configured with the necessary dependencies:

```bash
npm install
npm run dev
```

### 2. Optional: Local AI Backend (Python)

For better performance and reliability, you can run a local Python backend:

```bash
# Install Python dependencies
pip install -r requirements.txt

# Run the backend server
python ai_backend.py
```

The backend will run on `http://localhost:5000` and the frontend will automatically detect and use it.

### 3. AI Models

The system uses lightweight models that work well in browser environments:

- **Primary**: Microsoft DialoGPT (small/medium)
- **Fallback**: GPT-2
- **Cloud**: Hugging Face Inference API

## Usage

1. **Access the AI Assistant**: Navigate to `/financial-ai` or click "AI Assistant" in the dashboard
2. **Ask Questions**: Type any financial question in the chat interface
3. **Get Responses**: The AI will provide educational responses with appropriate disclaimers

## Key Components

### FinancialChat Component
- Real-time chat interface
- Message history
- Loading states
- Error handling

### FinancialAIService
- Handles AI model communication
- Fallback between local and cloud services
- Response processing and cleaning

### FinancialAI Page
- Full-page chat interface
- Sidebar with tips and popular topics
- Responsive design

## Configuration

### Environment Variables (Optional)
```bash
# For Hugging Face API (if using cloud inference)
HUGGINGFACE_API_KEY=your_api_key_here

# For local backend
AI_BACKEND_URL=http://localhost:5000
```

### Model Configuration
You can modify the AI models in `src/lib/ai/financialAIService.ts`:

```typescript
const models = [
  {
    name: 'microsoft/DialoGPT-small',
    displayName: 'DialoGPT Small',
    maxTokens: 256,
    temperature: 0.7,
    topP: 0.9,
    isAvailable: true
  }
  // Add more models as needed
];
```

## Important Notes

1. **Educational Purpose**: The AI provides educational information only, not personalized financial advice
2. **Professional Consultation**: Users are always reminded to consult qualified financial professionals
3. **Privacy**: All conversations are processed locally when using the Python backend
4. **Performance**: The system is optimized for lightweight operation and fast responses

## Troubleshooting

### Common Issues

1. **AI Not Responding**: Check if the local backend is running or if Hugging Face API is accessible
2. **Slow Responses**: Consider using the local Python backend for better performance
3. **Model Errors**: The system will automatically fallback to alternative models

### Debug Mode

Enable debug logging by setting:
```javascript
localStorage.setItem('ai-debug', 'true');
```

## Future Enhancements

- [ ] Support for more specialized financial models
- [ ] Conversation memory and context
- [ ] Integration with user's financial data (with permission)
- [ ] Voice input/output capabilities
- [ ] Multi-language support
