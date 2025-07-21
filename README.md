# 🌌 Unicode Puzzles MCP

[![npm version](https://badge.fury.io/js/unicode-puzzles-mcp.svg)](https://www.npmjs.com/package/unicode-puzzles-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-green.svg)](https://modelcontextprotocol.io)

Quantum steganography puzzles powered by MCP. Create and manage encoded messages using zero-width characters and advanced Unicode techniques.

## 🎯 Features

- Advanced Unicode steganography (zero-width characters, combining marks)
- Quantum-themed puzzle templates
- symbl.cc integration for character discovery
- Full MCP memory system integration
- Multiple encoding patterns and difficulty levels
- Real-time puzzle generation and verification

## 🛠️ Installation

```bash
npm install unicode-puzzles-mcp
```

## 💫 Quick Start

```javascript
import { UnicodePuzzlesMCP } from 'unicode-puzzles-mcp';

// Initialize MCP server
const mcp = new UnicodePuzzlesMCP();

// Create a quantum puzzle
const puzzle = await mcp.createPuzzle({
  template: 'quantum',
  message: 'System integrity compromised',
  secret: 'LIBRAXIS://repair-protocol-7A'
});

// Decode an encoded message
const decoded = await mcp.decodePuzzle(encodedText);
```

## 🌟 Puzzle Templates

- **Quantum** - Messages encoded using quantum superposition principles
- **Orbital** - Circular pattern encoding using orbital mechanics
- **Glitch** - Random noise patterns with hidden data
- **Void** - Space-based encoding using astronomical symbols

## 🔮 Examples

### Creating a Quantum Puzzle
```javascript
const quantumPuzzle = await mcp.createPuzzle({
  template: 'quantum',
  message: 'Reality distortion detected',
  secret: 'Coordinates: α-359-ω',
  difficulty: 'advanced'
});

// Result: 【𝚀𝚄𝙰𝙽𝚃𝚄𝙼】∎∎∎Reality⠀distortion⠀detected∎∎∎
// (with hidden ZWSP characters encoding the secret)