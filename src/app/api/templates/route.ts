import { NextRequest, NextResponse } from 'next/server'

interface Template {
  id: string
  name: string
  description: string
  framework: string
  type: string
  language: string
  popularity: number
  downloads: number
  createdAt: string
  lastUpdated: string
  tags: string[]
  author: string
  code?: string
  config?: Record<string, any>
}

// Mock database
let templates: Template[] = [
  {
    id: '1',
    name: 'Python Data Science',
    description: 'Template completo para projetos de data science com Python',
    framework: 'python',
    type: 'data-science',
    language: 'Python',
    popularity: 95,
    downloads: 15420,
    createdAt: '2024-01-01',
    lastUpdated: '2024-01-15',
    tags: ['python', 'data-science', 'ml', 'pandas', 'numpy'],
    author: 'Zanai Team',
    code: `
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

class DataScienceAgent:
    def __init__(self, config):
        self.config = config
        self.model = None
        
    def load_data(self, file_path):
        """Carrega dados de um arquivo CSV"""
        return pd.read_csv(file_path)
    
    def preprocess_data(self, data):
        """Pré-processa os dados"""
        # Handle missing values
        data = data.fillna(data.mean())
        
        # Encode categorical variables
        categorical_columns = data.select_dtypes(include=['object']).columns
        for col in categorical_columns:
            data[col] = pd.Categorical(data[col]).codes
            
        return data
    
    def train_model(self, X, y):
        """Treina o modelo de machine learning"""
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
        
        self.model = RandomForestClassifier(n_estimators=100)
        self.model.fit(X_train, y_train)
        
        return self.model.score(X_test, y_test)
    
    def predict(self, data):
        """Faz previsões com o modelo treinado"""
        if self.model is None:
            raise Exception("Model not trained yet")
        return self.model.predict(data)
`,
    config: {
      dependencies: ['pandas', 'numpy', 'scikit-learn', 'matplotlib', 'seaborn'],
      python_version: '3.9+',
      entry_point: 'agent.py',
      requirements_file: 'requirements.txt'
    }
  },
  {
    id: '2',
    name: 'Node.js API',
    description: 'Template para criação de APIs RESTful com Node.js',
    framework: 'nodejs',
    type: 'api',
    language: 'JavaScript',
    popularity: 88,
    downloads: 12350,
    createdAt: '2024-01-02',
    lastUpdated: '2024-01-14',
    tags: ['nodejs', 'api', 'express', 'rest', 'mongodb'],
    author: 'Zanai Team',
    code: `
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

class APIAgent {
    constructor(config) {
        this.config = config;
        this.app = express();
        this.port = config.port || 3000;
        this.setupMiddleware();
        this.setupRoutes();
    }
    
    setupMiddleware() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }
    
    setupRoutes() {
        // Health check
        this.app.get('/health', (req, res) => {
            res.json({ status: 'healthy', timestamp: new Date().toISOString() });
        });
        
        // Generic CRUD routes
        this.app.get('/api/:resource', this.handleGetAll.bind(this));
        this.app.get('/api/:resource/:id', this.handleGetById.bind(this));
        this.app.post('/api/:resource', this.handleCreate.bind(this));
        this.app.put('/api/:resource/:id', this.handleUpdate.bind(this));
        this.app.delete('/api/:resource/:id', this.handleDelete.bind(this));
    }
    
    async handleGetAll(req, res) {
        try {
            const Model = this.getModel(req.params.resource);
            const items = await Model.find();
            res.json(items);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async handleGetById(req, res) {
        try {
            const Model = this.getModel(req.params.resource);
            const item = await Model.findById(req.params.id);
            res.json(item);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async handleCreate(req, res) {
        try {
            const Model = this.getModel(req.params.resource);
            const item = new Model(req.body);
            await item.save();
            res.status(201).json(item);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async handleUpdate(req, res) {
        try {
            const Model = this.getModel(req.params.resource);
            const item = await Model.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            res.json(item);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async handleDelete(req, res) {
        try {
            const Model = this.getModel(req.params.resource);
            await Model.findByIdAndDelete(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    getModel(resourceName) {
        // Dynamic model loading based on resource name
        // This would be implemented based on your schema definitions
        return mongoose.model(resourceName);
    }
    
    start() {
        this.app.listen(this.port, () => {
            console.log(\`API Agent running on port \${this.port}\`);
        });
    }
}

module.exports = APIAgent;
`,
    config: {
      dependencies: ['express', 'mongoose', 'cors', 'dotenv', 'joi'],
      node_version: '16+',
      entry_point: 'agent.js',
      port: 3000
    }
  }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const framework = searchParams.get('framework')
  const type = searchParams.get('type')
  const search = searchParams.get('search')

  let filteredTemplates = templates

  if (framework) {
    filteredTemplates = filteredTemplates.filter(t => t.framework === framework)
  }

  if (type) {
    filteredTemplates = filteredTemplates.filter(t => t.type === type)
  }

  if (search) {
    filteredTemplates = filteredTemplates.filter(t =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    )
  }

  return NextResponse.json({
    templates: filteredTemplates,
    total: filteredTemplates.length,
    frameworks: [...new Set(templates.map(t => t.framework))],
    types: [...new Set(templates.map(t => t.type))]
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newTemplate: Template = {
      id: Math.random().toString(36).substr(2, 9),
      name: body.name,
      description: body.description,
      framework: body.framework,
      type: body.type,
      language: body.language,
      popularity: 0,
      downloads: 0,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      tags: body.tags || [],
      author: body.author || 'Anonymous',
      code: body.code,
      config: body.config || {}
    }

    templates.push(newTemplate)

    return NextResponse.json(newTemplate, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create template' },
      { status: 400 }
    )
  }
}