#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
  ErrorCode,
  McpError
} from '@modelcontextprotocol/sdk/types.js';
import { StegoPuzzleManager } from '../steganography/manager.js';
import { SymblConnector } from '../integrations/symbl.js';
import { TemplateEngine } from '../templates/engine.js';

class UnicodePuzzlesMCP {
  constructor() {
    this.server = new Server(
      {
        name: 'unicode-puzzles-mcp',
        version: '0.1.0'
      },
      {
        capabilities: {
          tools: {},
          resources: {}
        }
      }
    );
    
    this.puzzleManager = new StegoPuzzleManager();
    this.symbl = new SymblConnector();
    this.templates = new TemplateEngine();
    
    this.setupTools();
  }

  async setupTools() {
    // Register tools handler
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      switch (request.params.name) {
        case 'create_puzzle':
          return await this.createPuzzle(request.params.arguments);
        case 'decode_puzzle':
          return await this.decodePuzzle(request.params.arguments);
        case 'list_templates':
          return await this.getTemplates();
        case 'encode_message':
          return await this.encodeMessage(request.params.arguments);
        case 'decode_message':
          return await this.decodeMessage(request.params.arguments);
        case 'search_characters':
          return await this.searchCharacters(request.params.arguments);
        case 'get_zero_width_chars':
          return await this.getZeroWidthChars();
        default:
          throw new McpError(
            ErrorCode.MethodNotFound,
            `Unknown tool: ${request.params.name}`
          );
      }
    });

    // Register list tools handler
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'create_puzzle',
            description: 'Create a Unicode steganography puzzle',
            inputSchema: {
              type: 'object',
              properties: {
                template: { type: 'string', enum: ['quantum', 'orbital', 'glitch', 'void'] },
                message: { type: 'string' },
                secret: { type: 'string' },
                difficulty: { type: 'string', enum: ['easy', 'medium', 'hard'], default: 'medium' }
              },
              required: ['template', 'message', 'secret']
            }
          },
          {
            name: 'decode_puzzle',
            description: 'Decode a Unicode steganography puzzle',
            inputSchema: {
              type: 'object',
              properties: {
                encodedText: { type: 'string' }
              },
              required: ['encodedText']
            }
          },
          {
            name: 'list_templates',
            description: 'List available puzzle templates'
          },
          {
            name: 'encode_message',
            description: 'Encode a message using steganography',
            inputSchema: {
              type: 'object',
              properties: {
                message: { type: 'string' },
                secret: { type: 'string' },
                method: { type: 'string', enum: ['binary', 'trinary', 'random'], default: 'binary' }
              },
              required: ['message', 'secret']
            }
          },
          {
            name: 'decode_message',
            description: 'Decode a steganographic message',
            inputSchema: {
              type: 'object',
              properties: {
                encodedText: { type: 'string' },
                method: { type: 'string', enum: ['binary', 'trinary', 'random'], default: 'binary' }
              },
              required: ['encodedText']
            }
          },
          {
            name: 'search_characters',
            description: 'Search for Unicode characters',
            inputSchema: {
              type: 'object',
              properties: {
                query: { type: 'string' },
                category: { type: 'string', enum: ['zeroWidth', 'quantum', 'special'] }
              },
              required: ['query']
            }
          },
          {
            name: 'get_zero_width_chars',
            description: 'Get list of zero-width Unicode characters'
          }
        ]
      };
    });
  }

  // Tool implementations
  async createPuzzle(args) {
    try {
      const { template, message, secret, difficulty = 'medium' } = args;
      
      // Get template configuration
      const templateConfig = await this.templates.getTemplate(template, difficulty);
      
      // Create puzzle using selected template
      const puzzle = await this.puzzleManager.createPuzzle({
        template: templateConfig,
        message,
        secret,
        difficulty
      });

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              status: 'success',
              puzzle,
              metadata: {
                template,
                difficulty,
                encodingType: templateConfig.encoding
              }
            }, null, 2)
          }
        ]
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to create puzzle: ${error.message}`
      );
    }
  }

  async decodePuzzle(args) {
    try {
      const { encodedText } = args;
      const decoded = await this.puzzleManager.decodePuzzle(encodedText);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ decoded }, null, 2)
          }
        ]
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to decode puzzle: ${error.message}`
      );
    }
  }

  async getTemplates() {
    try {
      const templates = this.templates.listTemplates();
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ templates }, null, 2)
          }
        ]
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to list templates: ${error.message}`
      );
    }
  }

  async encodeMessage(args) {
    try {
      const { message, secret, method = 'binary' } = args;
      const encoded = await this.puzzleManager.encodeSecret(message, secret, {
        pattern: method,
        difficulty: 'medium'
      });
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ encoded }, null, 2)
          }
        ]
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to encode message: ${error.message}`
      );
    }
  }

  async decodeMessage(args) {
    try {
      const { encodedText, method = 'binary' } = args;
      const decoded = this.puzzleManager.decodeSecret(encodedText, method);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ decoded }, null, 2)
          }
        ]
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to decode message: ${error.message}`
      );
    }
  }

  async searchCharacters(args) {
    try {
      const { query, category } = args;
      const results = await this.symbl.searchCharacters(query, category);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ results }, null, 2)
          }
        ]
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to search characters: ${error.message}`
      );
    }
  }

  async getZeroWidthChars() {
    try {
      const chars = await this.symbl.getZeroWidthCharacters();
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ chars }, null, 2)
          }
        ]
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to get zero-width characters: ${error.message}`
      );
    }
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Unicode Puzzles MCP server started');
  }
}

// Initialize and start server
const server = new UnicodePuzzlesMCP();
server.start().catch(console.error);