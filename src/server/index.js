import { createServer } from '@mcp/core';
import { StegoPuzzleManager } from '../steganography/manager.js';
import { SymblConnector } from '../integrations/symbl.js';
import { TemplateEngine } from '../templates/engine.js';

class UnicodePuzzlesMCP {
  constructor() {
    this.server = createServer();
    this.puzzleManager = new StegoPuzzleManager();
    this.symbl = new SymblConnector();
    this.templates = new TemplateEngine();
    
    this.setupRoutes();
    this.initializeMemory();
  }

  async setupRoutes() {
    // Puzzle Creation & Management
    this.server.post('/puzzles/create', this.createPuzzle.bind(this));
    this.server.post('/puzzles/decode', this.decodePuzzle.bind(this));
    this.server.get('/puzzles/templates', this.getTemplates.bind(this));
    
    // Steganography Tools
    this.server.post('/stego/encode', this.encodeMessage.bind(this));
    this.server.post('/stego/decode', this.decodeMessage.bind(this));
    
    // symbl.cc Integration
    this.server.get('/chars/search', this.searchCharacters.bind(this));
    this.server.get('/chars/zero-width', this.getZeroWidthChars.bind(this));
  }

  async initializeMemory() {
    await this.server.memory.create_entities([
      {
        name: 'unicode_puzzles_config',
        entityType: 'Configuration',
        observations: [
          'Initialized at: ' + new Date().toISOString(),
          'Version: 0.1.0',
          'Status: Active'
        ]
      }
    ]);
  }

  async createPuzzle(req, res) {
    try {
      const { template, message, secret, difficulty = 'medium' } = req.body;
      
      // Get template configuration
      const templateConfig = await this.templates.getTemplate(template);
      
      // Create puzzle using selected template
      const puzzle = await this.puzzleManager.createPuzzle({
        template: templateConfig,
        message,
        secret,
        difficulty
      });

      // Store puzzle metadata in MCP memory
      await this.server.memory.create_entities([
        {
          name: `puzzle_${Date.now()}`,
          entityType: 'StegoPuzzle',
          observations: [
            `Template: ${template}`,
            `Difficulty: ${difficulty}`,
            `Created: ${new Date().toISOString()}`
          ]
        }
      ]);

      return res.json({ 
        status: 'success',
        puzzle,
        metadata: {
          template,
          difficulty,
          encodingType: templateConfig.encoding
        }
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  async decodePuzzle(req, res) {
    try {
      const { encodedText } = req.body;
      const decoded = await this.puzzleManager.decodePuzzle(encodedText);
      return res.json({ decoded });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  async searchCharacters(req, res) {
    try {
      const { query } = req.query;
      const results = await this.symbl.searchCharacters(query);
      return res.json({ results });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  async getZeroWidthChars(req, res) {
    try {
      const chars = await this.symbl.getZeroWidthCharacters();
      return res.json({ chars });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }
}

// Initialize and start server
const server = new UnicodePuzzlesMCP();
server.start();