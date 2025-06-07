#!/usr/bin/env node
import { StegoPuzzleManager } from './src/steganography/manager.js';
import { TemplateEngine } from './src/templates/engine.js';

const puzzleManager = new StegoPuzzleManager();
const templates = new TemplateEngine();

// Test different templates and encoding methods
async function testAllTechniques() {
  const message = "Just a normal LinkedIn post about innovation and synergy!";
  const secret = "ACTUALLY I HATE CORPORATE BUZZWORDS";
  
  console.log("=== 🧪 TESTING ALL STEGANOGRAPHY TECHNIQUES ===\n");
  
  // Test 1: Quantum Template (Binary Encoding)
  console.log("1️⃣ QUANTUM TEMPLATE (Binary Encoding):");
  const quantumTemplate = templates.getTemplate('quantum');
  const quantumPuzzle = await puzzleManager.createPuzzle({
    template: quantumTemplate,
    message: message,
    secret: secret,
    difficulty: 'medium'
  });
  console.log(quantumPuzzle);
  console.log(`Hidden chars: ${countZeroWidth(quantumPuzzle)}\n`);
  
  // Test 2: Orbital Template (Trinary Encoding)
  console.log("2️⃣ ORBITAL TEMPLATE (Trinary Encoding):");
  const orbitalTemplate = templates.getTemplate('orbital');
  const orbitalPuzzle = await puzzleManager.createPuzzle({
    template: orbitalTemplate,
    message: message,
    secret: secret,
    difficulty: 'hard'
  });
  console.log(orbitalPuzzle);
  console.log(`Hidden chars: ${countZeroWidth(orbitalPuzzle)}\n`);
  
  // Test 3: Void Template
  console.log("3️⃣ VOID TEMPLATE (Space Theme):");
  const voidTemplate = templates.getTemplate('void');
  const voidPuzzle = await puzzleManager.createPuzzle({
    template: voidTemplate,
    message: message,
    secret: secret,
    difficulty: 'easy'
  });
  console.log(voidPuzzle);
  console.log(`Hidden chars: ${countZeroWidth(voidPuzzle)}\n`);
  
  // Test 4: Custom Unicode Art
  console.log("4️⃣ CUSTOM UNICODE ART:");
  const customMessage = createUnicodeArt(message, secret);
  console.log(customMessage);
  console.log(`Hidden chars: ${countZeroWidth(customMessage)}\n`);
  
  // Test 5: Homoglyph Attack
  console.log("5️⃣ HOMOGLYPH CONFUSION:");
  const homoglyphMessage = createHomoglyphMessage(message);
  console.log(homoglyphMessage);
  console.log("(Uses lookalike characters from different Unicode blocks)\n");
}

// Count zero-width characters
function countZeroWidth(text) {
  const zeroWidthRegex = /[\u200B-\u200F\u2060-\u206F]/g;
  const matches = text.match(zeroWidthRegex);
  return matches ? matches.length : 0;
}

// Create Unicode art with hidden message
function createUnicodeArt(visible, hidden) {
  const frames = ['⟦', '⟧'];
  const decorations = ['✦', '✧', '✶', '✷', '✸', '✹'];
  
  let result = frames[0] + ' ';
  
  // Add decorations with hidden zero-width chars
  for (let i = 0; i < 5; i++) {
    result += decorations[Math.floor(Math.random() * decorations.length)];
    if (i < hidden.length) {
      result += hidden.charCodeAt(i) % 2 ? '\u200B' : '\u200C';
    }
  }
  
  result += ' ' + visible + ' ';
  
  // More decorations
  for (let i = 0; i < 5; i++) {
    result += decorations[Math.floor(Math.random() * decorations.length)];
    if (i + 5 < hidden.length) {
      result += hidden.charCodeAt(i + 5) % 2 ? '\u200D' : '\u200E';
    }
  }
  
  result += ' ' + frames[1];
  return result;
}

// Create message with homoglyphs
function createHomoglyphMessage(text) {
  const homoglyphs = {
    'a': ['а', 'ａ', '𝐚', '𝑎', '𝒂', '𝒶', '𝓪', '𝔞', '𝕒', '𝖆', '𝖺', '𝗮', '𝘢', '𝙖', '𝚊'],
    'e': ['е', 'ｅ', 'ℯ', '𝐞', '𝑒', '𝒆', '𝓮', '𝔢', '𝕖', '𝖊', '𝖾', '𝗲', '𝘦', '𝙚', '𝚎'],
    'o': ['о', 'ｏ', 'ℴ', '𝐨', '𝑜', '𝒐', '𝓸', '𝔬', '𝕠', '𝖔', '𝗈', '𝗼', '𝘰', '𝙤', '𝚘'],
    'i': ['і', 'ｉ', 'ℹ', '𝐢', '𝑖', '𝒊', '𝓲', '𝔦', '𝕚', '𝖎', '𝗂', '𝗶', '𝘪', '𝙞', '𝚒'],
    'l': ['ӏ', 'ｌ', 'ℓ', '𝐥', '𝑙', '𝒍', '𝓵', '𝔩', '𝕝', '𝖑', '𝗅', '𝗹', '𝘭', '𝙡', '𝚕'],
    'n': ['ո', 'ｎ', '𝐧', '𝑛', '𝒏', '𝓷', '𝔫', '𝕟', '𝖓', '𝗇', '𝗻', '𝘯', '𝙣', '𝚗'],
    's': ['ѕ', 'ｓ', '𝐬', '𝑠', '𝒔', '𝓼', '𝔰', '𝕤', '𝖘', '𝗌', '𝘀', '𝘴', '𝙨', '𝚜'],
    ' ': [' ', ' ', ' ', ' ', ' ', ' '] // Various space characters
  };
  
  return text.split('').map(char => {
    const lower = char.toLowerCase();
    if (homoglyphs[lower]) {
      const alternatives = homoglyphs[lower];
      return alternatives[Math.floor(Math.random() * alternatives.length)];
    }
    return char;
  }).join('');
}

// Run tests
testAllTechniques().catch(console.error);