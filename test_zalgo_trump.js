#!/usr/bin/env node
import { StegoPuzzleManager } from './src/steganography/manager.js';
import { TemplateEngine } from './src/templates/engine.js';

// Initialize
const puzzleManager = new StegoPuzzleManager();
const templates = new TemplateEngine();

// Trump's "apology" letter to Elon
const visibleMessage = "Dear Elon, My tremendous friend, the best friend, nobody has better friends than me. Our beautiful friendship was perfect, like my presidency - the greatest ever. But sometimes even the greatest relationships need space... like SpaceX needs space. You understand rockets, I understand making America great. We're still winning bigly, just separately now. With the best regards, DJT";

// Hidden message in the chaos
const secretMessage = "I CANT HANDLE YOUR EGO BEING BIGGER THAN MINE ALSO STOP FACT CHECKING ME ON X";

// Create the puzzle with glitch template for maximum chaos
const template = templates.getTemplate('glitch');
const pattern = template.patterns.hard;

// Add Zalgo characters for extra chaos
const zalgoChars = {
  above: ['̍', '̎', '̄', '̅', '̿', '̑', '̆', '̐', '͒', '͗', '͑', '̇', '̈', '̊', '͂', '̓', '̈́', '͊', '͋', '͌', '̃', '̂', '̌', '͐', '̀', '́', '̋', '̏', '̒', '̓', '̔', '̽', '̉', 'ͣ', 'ͤ', 'ͥ', 'ͦ', 'ͧ', 'ͨ', 'ͩ', 'ͪ', 'ͫ', 'ͬ', 'ͭ', 'ͮ', 'ͯ', '̾', '͛', '͆', '̚'],
  below: ['̖', '̗', '̘', '̙', '̜', '̝', '̞', '̟', '̠', '̤', '̥', '̦', '̩', '̪', '̫', '̬', '̭', '̮', '̯', '̰', '̱', '̲', '̳', '̹', '̺', '̻', '̼', 'ͅ', '͇', '͈', '͉', '͍', '͎', '͓', '͔', '͕', '͖', '͙', '͚', '̣'],
  overlay: ['̴', '̵', '̶', '̷', '̸', '̡', '̢', '̧', '̨', '̴', '̵', '̶', '͏', '͜', '͝', '͞', '͟', '͠', '͢', '̸', '̷', '͡']
};

// Function to add Zalgo effect
function addZalgo(text, intensity = 3) {
  let result = '';
  for (let char of text) {
    result += char;
    
    // Add diacritics based on intensity
    for (let i = 0; i < intensity; i++) {
      if (Math.random() > 0.5) {
        result += zalgoChars.above[Math.floor(Math.random() * zalgoChars.above.length)];
      }
      if (Math.random() > 0.5) {
        result += zalgoChars.below[Math.floor(Math.random() * zalgoChars.below.length)];
      }
      if (Math.random() > 0.3) {
        result += zalgoChars.overlay[Math.floor(Math.random() * zalgoChars.overlay.length)];
      }
    }
  }
  return result;
}

// Create the encoded message
async function generateZalgoMessage() {
  const puzzle = await puzzleManager.createPuzzle({
    template: template,
    message: visibleMessage,
    secret: secretMessage,
    difficulty: 'hard'
  });

  // Add extra Zalgo chaos
  const zalgoMessage = addZalgo(template.prefix, 5) + ' ' + addZalgo(puzzle, 3);

  console.log("\n=== TRUMP'S ZALGO MESSAGE TO ELON ===\n");
  console.log(zalgoMessage);
  console.log("\n=== HIDDEN MESSAGE ===");
  console.log("Hidden in zero-width characters: " + secretMessage);
  
  // Decode to verify
  const decoded = await puzzleManager.decodeSecret(puzzle);
  console.log("\n=== DECODED VERIFICATION ===");
  console.log("Decoded:", decoded);
}

generateZalgoMessage().catch(console.error);