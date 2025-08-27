#!/usr/bin/env node
import { StegoPuzzleManager } from '../src/steganography/manager.js';
import { TemplateEngine } from '../src/templates/engine.js';

// Initialize
const puzzleManager = new StegoPuzzleManager();
const templates = new TemplateEngine();

// Professional example message
const visibleMessage = "Welcome to our Unicode Steganography demonstration. This technology enables secure communication through invisible character encoding. Perfect for watermarking, digital signatures, and educational purposes.";

// Hidden professional message
const secretMessage = "SECURE_DATA_2025";

console.log('🔒 Professional Unicode Steganography Demo\n');

// Test different templates
const templateNames = ['quantum', 'orbital', 'glitch', 'void'];

for (const templateName of templateNames) {
  console.log(`\n📝 Testing ${templateName.toUpperCase()} template:`);
  
  const template = templates.getTemplate(templateName, 'medium');
  
  // Create puzzle
  const puzzle = await puzzleManager.createPuzzle(
    visibleMessage,
    secretMessage,
    { template: templateName, difficulty: 'medium' }
  );
  
  console.log('Encoded:', puzzle.substring(0, 50) + '...');
  
  // Decode
  const decoded = await puzzleManager.decodePuzzle(puzzle);
  console.log('Decoded hidden message:', decoded.hiddenMessage);
}

console.log('\n✅ Professional demonstration complete');
console.log('Created by M&K Team (c)2025 The LibraxisAI');