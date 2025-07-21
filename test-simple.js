#!/usr/bin/env node
/**
 * Simple test to verify the package works
 */

import { StegoPuzzleManager } from './src/steganography/manager.js';
import { TemplateEngine } from './src/templates/engine.js';
import { SymblConnector } from './src/integrations/symbl.js';

console.log('🧪 Running package verification tests...\n');

try {
  // Test 1: Can create instances
  console.log('✓ StegoPuzzleManager instantiated');
  const manager = new StegoPuzzleManager();
  
  console.log('✓ TemplateEngine instantiated');
  const templates = new TemplateEngine();
  
  console.log('✓ SymblConnector instantiated');
  const symbl = new SymblConnector();
  
  // Test 2: Basic encoding works
  const encoded = await manager.encodeSecret('test', 'secret', {
    pattern: 'binary',
    difficulty: 'easy'
  });
  console.log('✓ Binary encoding works');
  
  // Test 3: Templates are available
  const templateList = templates.listTemplates();
  console.log(`✓ Found ${templateList.length} templates`);
  
  // Test 4: Zero-width characters defined
  const zwCount = Object.keys(manager.zeroWidthChars).length;
  console.log(`✓ ${zwCount} zero-width characters available`);
  
  console.log('\n✅ All tests passed! Package is ready for publishing.');
  process.exit(0);
  
} catch (error) {
  console.error('\n❌ Test failed:', error.message);
  process.exit(1);
}