#!/usr/bin/env node
/**
 * Showcase all available puzzle templates
 */

import { StegoPuzzleManager } from '../src/steganography/manager.js';
import { TemplateEngine } from '../src/templates/engine.js';

async function showcaseTemplates() {
  const manager = new StegoPuzzleManager();
  const templates = new TemplateEngine();
  
  console.log('🎨 Unicode Puzzles - Template Showcase\n');
  console.log('Each template creates unique visual patterns while hiding your secrets!\n');
  
  const secretMessage = 'LIBRAXIS-2025';
  const visibleMessage = 'The future is distributed';
  
  // Get all template names
  const templateList = templates.listTemplates();
  
  for (const templateInfo of templateList) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📦 Template: ${templateInfo.name.toUpperCase()}`);
    console.log(`📝 ${templateInfo.description}`);
    console.log(`🎚️  Difficulties: ${templateInfo.difficulties.join(', ')}`);
    console.log(`${'='.repeat(60)}\n`);
    
    // Show each difficulty level
    for (const difficulty of templateInfo.difficulties) {
      const template = templates.getTemplate(templateInfo.name, difficulty);
      const puzzle = await manager.createPuzzle({
        template,
        message: visibleMessage,
        secret: secretMessage,
        difficulty
      });
      
      console.log(`[${difficulty.toUpperCase()}]:`);
      console.log(puzzle);
      
      // Analyze the encoding
      const hiddenChars = puzzle.match(/[\u200B-\u200F\u2060-\u206F]/g);
      console.log(`Hidden characters: ${hiddenChars ? hiddenChars.length : 0}`);
      console.log('');
    }
  }
  
  console.log('\n💡 TIP: Copy any puzzle above and it will maintain the hidden message!');
  console.log('The zero-width characters are preserved in clipboard operations.');
}

showcaseTemplates().catch(console.error);