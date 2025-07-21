#!/usr/bin/env node
/**
 * Basic usage example for unicode-puzzles-mcp
 * This example shows how to use the steganography functions directly
 */

import { StegoPuzzleManager } from '../src/steganography/manager.js';
import { TemplateEngine } from '../src/templates/engine.js';

async function main() {
  const manager = new StegoPuzzleManager();
  const templates = new TemplateEngine();
  
  console.log('🌌 Unicode Puzzles - Basic Usage Example\n');
  
  // Example 1: Simple message encoding
  console.log('1. Simple Binary Encoding:');
  const encoded = await manager.encodeSecret(
    'Hello World', 
    'secret123',
    { pattern: 'binary', difficulty: 'easy' }
  );
  console.log('Visible text:', encoded);
  console.log('Looks normal but contains hidden data!\n');
  
  // Example 2: Create a Quantum Puzzle
  console.log('2. Quantum Puzzle:');
  const quantumTemplate = templates.getTemplate('quantum', 'medium');
  const puzzle = await manager.createPuzzle({
    template: quantumTemplate,
    message: 'Meeting at midnight',
    secret: 'Location: 40.7128,-74.0060',
    difficulty: 'medium'
  });
  console.log('Puzzle:', puzzle);
  
  // Example 3: Decode the puzzle
  console.log('\n3. Decoding the Puzzle:');
  const decoded = await manager.decodePuzzle(puzzle);
  console.log('Visible message:', decoded.visibleText);
  console.log('Hidden secret:', decoded.hiddenMessage);
  
  // Example 4: Show zero-width character usage
  console.log('\n4. Zero-Width Character Analysis:');
  const zwChars = encoded.match(/[\u200B-\u200F\u2060-\u206F]/g);
  console.log('Total zero-width characters:', zwChars ? zwChars.length : 0);
  console.log('These are completely invisible to users!');
}

main().catch(console.error);