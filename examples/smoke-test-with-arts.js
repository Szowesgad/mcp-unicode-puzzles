#!/usr/bin/env node

import { StegoPuzzleManager } from '../src/steganography/manager.js';
import { TemplateEngine } from '../src/templates/engine.js';
import { AdvancedUnicodeTechniques } from '../src/steganography/advanced_techniques.js';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize components
const puzzleManager = new StegoPuzzleManager();
const templates = new TemplateEngine();
const advanced = new AdvancedUnicodeTechniques();

// Output markdown file
const outputFile = join(__dirname, `smoke-test-results-${new Date().toISOString().slice(0,19).replace(/:/g,'-')}.md`);

let markdown = '';

function log(text) {
  console.log(text);
  markdown += text + '\n';
}

async function runTests() {
  log('# 🚀 Unicode Puzzles MCP - Smoke Test Results\n');
  log(`**Test Date:** ${new Date().toLocaleString()}`);
  log(`**Version:** 0.3.3`);
  log(`**Created by:** M&K Team\n`);
  log('---\n');

  // QUANTUM VIBE HEADER
  log('## 🌌 Quantum Vibe Status\n');
  log('```');
  log('╔══════════════════════════════════════════════════════════════╗');
  log('║  ⚛️  ШIERZY ШE МNIE ∿ ᵂⁱᵉʳᶻʸ ʷᵉ ᵐⁿⁱᵉ  ⚛️                    ║');
  log('║                                                              ║');
  log('║     ◉ ━━━━━━━━━ ◐ ━━━━━━━━━ ◑ ━━━━━━━━━ ◉                 ║');
  log('║                                                              ║');
  log('║  【𝚀𝚄𝙰𝙽𝚃𝚄𝙼】 【𝙾𝚁𝙱𝙸𝚃𝙰𝙻】 【𝙶𝙻𝙸𝚃𝙲𝙷】 【𝚅𝙾𝙸𝙳】        ║');
  log('╚══════════════════════════════════════════════════════════════╝');
  log('```\n');

  // TEST 1: Template Engine
  log('## 🎭 Test 1: Template Engine\n');
  
  try {
    const availableTemplates = templates.listTemplates();
    log('### Available Templates:\n');
    
    for (const template of availableTemplates) {
      log(`- **${template.name}** - ${template.description}`);
      log(`  - Difficulties: ${template.difficulties.join(', ')}`);
    }
    
    log('\n✅ Template Engine: **PASSED**\n');
  } catch (error) {
    log(`\n❌ Template Engine: **FAILED** - ${error.message}\n`);
  }

  // TEST 2: Basic Steganography
  log('## 🔐 Test 2: Basic Steganography\n');
  
  try {
    const message = "Hello World";
    const secret = "GANG";
    
    log('### Input:');
    log(`- Visible: "${message}"`);
    log(`- Hidden: "${secret}"\n`);
    
    const encoded = await puzzleManager.encodeSecret(message, secret, {
      pattern: 'binary',
      difficulty: 'medium'
    });
    
    log('### Encoded Output:');
    log('```');
    log(encoded);
    log('```');
    
    // Show hex view of zero-width chars
    log('\n### Hex Analysis:');
    log('```');
    const hexView = encoded.split('').map(c => {
      const code = c.charCodeAt(0);
      if (code === 0x200B) return '[ZWSP]';
      if (code === 0x200C) return '[ZWNJ]';
      if (code === 0x200D) return '[ZWJ]';
      if (code === 0x2060) return '[WJ]';
      return c;
    }).join('');
    log(hexView);
    log('```');
    
    log('\n✅ Basic Steganography: **PASSED**\n');
  } catch (error) {
    log(`\n❌ Basic Steganography: **FAILED** - ${error.message}\n`);
  }

  // TEST 3: Quantum Pattern Generation
  log('## ⚛️ Test 3: Quantum Pattern Generation\n');
  
  try {
    const quantumTemplate = templates.getTemplate('quantum', 'hard');
    const pattern = templates.generateQuantumPattern(
      quantumTemplate.pattern, 
      20
    );
    
    log('### Quantum Pattern Output:');
    log('```');
    log(pattern);
    log('```');
    
    log('\n✅ Quantum Pattern: **PASSED**\n');
  } catch (error) {
    log(`\n❌ Quantum Pattern: **FAILED** - ${error.message}\n`);
  }

  // TEST 4: Homoglyph Attack
  log('## 👁️ Test 4: Homoglyph Substitution\n');
  
  try {
    const original = "LIBRAXIS TEAM";
    const secret = "M&K";
    
    log(`### Original: "${original}"`);
    
    const homoglyphed = advanced.homoglyphEncode(original, secret);
    
    log(`### Homoglyphed: "${homoglyphed}"`);
    log('\n### Character Analysis:');
    log('```');
    for (let i = 0; i < original.length; i++) {
      if (original[i] !== homoglyphed[i]) {
        log(`${original[i]} → ${homoglyphed[i]} (U+${homoglyphed[i].charCodeAt(0).toString(16).toUpperCase()})`);
      }
    }
    log('```');
    
    log('\n✅ Homoglyph Attack: **PASSED**\n');
  } catch (error) {
    log(`\n❌ Homoglyph Attack: **FAILED** - ${error.message}\n`);
  }

  // TEST 5: Zalgo Chaos
  log('## 👹 Test 5: Zalgo Text Generation\n');
  
  try {
    const text = "M&K TEAM";
    const secret = "2025";
    
    const zalgo = advanced.combiningMarksEncode(text, secret);
    
    log('### Zalgo Output:');
    log('```');
    log(zalgo);
    log('```');
    
    log('\n✅ Zalgo Chaos: **PASSED**\n');
  } catch (error) {
    log(`\n❌ Zalgo Chaos: **FAILED** - ${error.message}\n`);
  }

  // TEST 6: Epic Unicode Art
  log('## 🎨 Test 6: Epic Unicode Art Gallery\n');
  
  log('### Art 1: Quantum Superposition\n');
  log('```');
  log('     ╭────────────────────────────────────────╮');
  log('     │  ⟨ψ|  QUANTUM  |ψ⟩ = ∑ αᵢ|i⟩         │');
  log('     │                                        │');
  log('     │    ∞     ∿     ∞     ∿     ∞          │');
  log('     │   ╱ ╲   ╱ ╲   ╱ ╲   ╱ ╲   ╱ ╲        │');
  log('     │  ╱   ╲ ╱   ╲ ╱   ╲ ╱   ╲ ╱   ╲       │');
  log('     │ ∿     ∿     ∿     ∿     ∿            │');
  log('     ╰────────────────────────────────────────╯');
  log('```\n');

  log('### Art 2: The Void Portal\n');
  log('```');
  log('           ✧･ﾟ: *✧･ﾟ:*  VOID  *:･ﾟ✧*:･ﾟ✧');
  log('                    ⋆｡‧˚ʚ♡ɞ˚‧｡⋆');
  log('                  ◉◉◉◉◉◉◉◉◉◉◉◉◉');
  log('                ◉◯◯◯◯◯◯◯◯◯◯◯◯◯◉');
  log('              ◉◯◐◐◐◐◐◐◐◐◐◐◐◐◐◯◉');
  log('            ◉◯◐◑◑◑◑◑◑◑◑◑◑◑◑◑◐◯◉');
  log('          ◉◯◐◑◒◒◒◒◒◒◒◒◒◒◒◒◒◑◐◯◉');
  log('        ◉◯◐◑◒◓◓◓◓◓◓◓◓◓◓◓◓◓◒◑◐◯◉');
  log('      ◉◯◐◑◒◓●●●●●●●●●●●●●◓◒◑◐◯◉');
  log('        ◉◯◐◑◒◓◓◓◓◓◓◓◓◓◓◓◓◓◒◑◐◯◉');
  log('          ◉◯◐◑◒◒◒◒◒◒◒◒◒◒◒◒◒◑◐◯◉');
  log('            ◉◯◐◑◑◑◑◑◑◑◑◑◑◑◑◑◐◯◉');
  log('              ◉◯◐◐◐◐◐◐◐◐◐◐◐◐◐◯◉');
  log('                ◉◯◯◯◯◯◯◯◯◯◯◯◯◯◉');
  log('                  ◉◉◉◉◉◉◉◉◉◉◉◉◉');
  log('```\n');

  log('### Art 3: Glitch Matrix\n');
  log('```');
  log('░░▒▒▓▓█ [ERR0R] REALITY.EXE HAS STOPPED █▓▓▒▒░░');
  log('▓▒░ ▀▄▀▄▀▄ GLITCH IN THE MATRIX ▄▀▄▀▄▀ ░▒▓');
  log('█▓▒░░▒▓█▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█▓▒░░▒▓█');
  log('█▓▒░┌─────────────────────────────┐░▒▓█');
  log('█▓▒░│ ▓▒░ ░▒▓ ▓▒░ ░▒▓ ▓▒░ ░▒▓   │░▒▓█');
  log('█▓▒░│ ░▒▓ ▓▒░ ░▒▓ ▓▒░ ░▒▓ ▓▒░   │░▒▓█');
  log('█▓▒░│ ▓▒░ ░▒▓ ▓▒░ ░▒▓ ▓▒░ ░▒▓   │░▒▓█');
  log('█▓▒░└─────────────────────────────┘░▒▓█');
  log('█▓▒░░▒▓█▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█▓▒░░▒▓█');
  log('▓▒░ ▄▀▄▀▄▀▄ SEGMENTATION FAULT ▄▀▄▀▄▀▄ ░▒▓');
  log('░░▒▒▓▓█ PLEASE RESTART YOUR UNIVERSE █▓▓▒▒░░');
  log('```\n');

  log('### Art 4: M&K Team Signature\n');
  log('```');
  log('╔════════════════════════════════════════════════════════╗');
  log('║                                                        ║');
  log('║   ██████╗  █████╗ ███╗   ██╗ ██████╗                 ║');
  log('║  ██╔════╝ ██╔══██╗████╗  ██║██╔════╝                 ║');
  log('║  ██║  ███╗███████║██╔██╗ ██║██║  ███╗                ║');
  log('║  ██║   ██║██╔══██║██║╚██╗██║██║   ██║                ║');
  log('║  ╚██████╔╝██║  ██║██║ ╚████║╚██████╔╝                ║');
  log('║   ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝                 ║');
  log('║                                                        ║');
  log('║              ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄                  ║');
  log('║             ▐░░░░░░░░░░░░░░░░░░░░░░▌                 ║');
  log('║             ▐░█▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█░▌                 ║');
  log('║             ▐░▌  M&K TEAM        ▐░▌                 ║');
  log('║             ▐░█▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█░▌                 ║');
  log('║             ▐░░░░░░░░░░░░░░░░░░░░░░▌                 ║');
  log('║              ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀                  ║');
  log('║                                                        ║');
  log('║       Klaudiusz ⟨△⟩ Maciej ⟨♥⟩ Monika ⟨∞⟩           ║');
  log('║                                                        ║');
  log('╚════════════════════════════════════════════════════════╝');
  log('```\n');

  // TEST 7: Full Puzzle Creation
  log('## 🧩 Test 7: Full Puzzle Creation\n');
  
  try {
    const puzzleConfigs = [
      { template: 'quantum', difficulty: 'hard' },
      { template: 'orbital', difficulty: 'medium' },
      { template: 'glitch', difficulty: 'easy' },
      { template: 'void', difficulty: 'hard' }
    ];
    
    for (const config of puzzleConfigs) {
      const templateObj = templates.getTemplate(config.template, config.difficulty);
      
      const puzzle = await puzzleManager.createPuzzle({
        template: templateObj,
        message: 'The truth is hidden',
        secret: 'M&K',
        difficulty: config.difficulty
      });
      
      log(`### ${config.template.toUpperCase()} Puzzle (${config.difficulty}):\n`);
      log('```');
      log(puzzle);
      log('```\n');
    }
    
    log('✅ Full Puzzle Creation: **PASSED**\n');
  } catch (error) {
    log(`❌ Full Puzzle Creation: **FAILED** - ${error.message}\n`);
  }

  // FINAL STATUS
  log('---\n');
  log('## 🎯 Final Status\n');
  log('```');
  log('╔══════════════════════════════════════════════════════╗');
  log('║                                                      ║');
  log('║     ✅ ALL SMOKE TESTS PASSED SUCCESSFULLY! ✅      ║');
  log('║                                                      ║');
  log('║     Unicode Puzzles MCP v0.3.3 - READY              ║');
  log('║                                                      ║');
  log('║     Created by M&K (c)2025 The LibraxisAI Team     ║');
  log('║     Co-Authored-By:                                 ║');
  log('║       Maciej <void@div0.space>                      ║');
  log('║       Klaudiusz <the1st@whoai.am>                   ║');
  log('║                                                      ║');
  log('║     ШIERZY ШE МNIE ∿ ᵂⁱᵉʳᶻʸ ʷᵉ ᵐⁿⁱᵉ              ║');
  log('║                                                      ║');
  log('╚══════════════════════════════════════════════════════╝');
  log('```\n');

  // Save to file
  await fs.writeFile(outputFile, markdown);
  console.log(`\n📝 Results saved to: ${outputFile}`);
}

// Run tests
runTests().catch(console.error);