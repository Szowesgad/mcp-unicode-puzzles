import { StegoPuzzleManager } from './src/steganography/manager.js';
import { TemplateEngine } from './src/templates/engine.js';

// Test the puzzle creation locally
async function testPuzzle() {
  const manager = new StegoPuzzleManager();
  const templates = new TemplateEngine();
  
  console.log('🧪 Testing Unicode Puzzles...\n');
  
  // Test 1: Create a quantum puzzle
  console.log('1️⃣ Creating Quantum Puzzle...');
  const quantumTemplate = templates.getTemplate('quantum', 'medium');
  const quantumPuzzle = await manager.createPuzzle({
    template: quantumTemplate,
    message: 'Reality distortion detected',
    secret: 'LIBRAXIS://repair-protocol-7A',
    difficulty: 'medium'
  });
  console.log('Result:', quantumPuzzle);
  console.log('');
  
  // Test 2: Decode the puzzle
  console.log('2️⃣ Decoding Quantum Puzzle...');
  const decoded = await manager.decodePuzzle(quantumPuzzle);
  console.log('Decoded:', decoded);
  console.log('');
  
  // Test 3: Simple binary encoding
  console.log('3️⃣ Testing Binary Encoding...');
  const binaryEncoded = await manager.encodeSecret(
    'Hello World',
    'Secret123',
    { pattern: 'binary', difficulty: 'easy' }
  );
  console.log('Binary Encoded:', binaryEncoded);
  console.log('Length:', binaryEncoded.length);
  
  // Count zero-width characters
  const zwChars = binaryEncoded.match(/[\u200B-\u200F\u2060-\u206F]/g);
  console.log('Zero-width characters:', zwChars ? zwChars.length : 0);
  console.log('');
  
  // Test 4: List all templates
  console.log('4️⃣ Available Templates:');
  const templateList = templates.listTemplates();
  templateList.forEach(t => {
    console.log(`- ${t.name}: ${t.description}`);
    console.log(`  Difficulties: ${t.difficulties.join(', ')}`);
  });
}

// Run tests
testPuzzle().catch(console.error);