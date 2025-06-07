#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { StegoPuzzleManager } from '../steganography/manager.js';
import { SymblConnector } from '../integrations/symbl.js';
import { TemplateEngine } from '../templates/engine.js';

// Initialize managers
const puzzleManager = new StegoPuzzleManager();
const symbl = new SymblConnector();
const templates = new TemplateEngine();

// Create MCP server
const server = new Server(
  {
    name: "unicode-puzzles-mcp",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Tool definitions
const TOOLS = [
  {
    name: "create_puzzle",
    description: "Create a new Unicode steganography puzzle with quantum-themed patterns",
    inputSchema: {
      type: "object",
      properties: {
        template: {
          type: "string",
          description: "Template name: quantum, orbital, glitch, or void",
          enum: ["quantum", "orbital", "glitch", "void"]
        },
        message: {
          type: "string",
          description: "The visible message to display"
        },
        secret: {
          type: "string",
          description: "The hidden message to encode"
        },
        difficulty: {
          type: "string",
          description: "Puzzle difficulty level",
          enum: ["easy", "medium", "hard"],
          default: "medium"
        }
      },
      required: ["template", "message", "secret"]
    }
  },
  {
    name: "decode_puzzle",
    description: "Decode a Unicode steganography puzzle to reveal hidden messages",
    inputSchema: {
      type: "object",
      properties: {
        encodedText: {
          type: "string",
          description: "The encoded text containing hidden messages"
        }
      },
      required: ["encodedText"]
    }
  },
  {
    name: "search_unicode",
    description: "Search for Unicode characters by name, category, or properties",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Search query for Unicode characters"
        }
      },
      required: ["query"]
    }
  },
  {
    name: "get_zero_width_chars",
    description: "Get a list of zero-width Unicode characters for steganography",
    inputSchema: {
      type: "object",
      properties: {}
    }
  },
  {
    name: "get_templates",
    description: "List all available puzzle templates",
    inputSchema: {
      type: "object",
      properties: {}
    }
  }
];

// Handle list tools request
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: TOOLS
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "create_puzzle": {
        const { template, message, secret, difficulty = 'medium' } = args;
        const templateConfig = await templates.getTemplate(template);
        
        const puzzle = await puzzleManager.createPuzzle({
          template: templateConfig,
          message,
          secret,
          difficulty
        });

        return {
          content: [
            {
              type: "text",
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
      }

      case "decode_puzzle": {
        const { encodedText } = args;
        const decoded = await puzzleManager.decodePuzzle(encodedText);
        
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ decoded }, null, 2)
            }
          ]
        };
      }

      case "search_unicode": {
        const { query } = args;
        const results = await symbl.searchCharacters(query);
        
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ results }, null, 2)
            }
          ]
        };
      }

      case "get_zero_width_chars": {
        const chars = await symbl.getZeroWidthCharacters();
        
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ chars }, null, 2)
            }
          ]
        };
      }

      case "get_templates": {
        const availableTemplates = templates.getAvailableTemplates();
        
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ templates: availableTemplates }, null, 2)
            }
          ]
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            status: 'error',
            message: error.message
          }, null, 2)
        }
      ]
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Unicode Puzzles MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});