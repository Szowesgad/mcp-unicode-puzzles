#!/usr/bin/env node
import { StegoPuzzleManager } from './src/steganography/manager.js';
import { TemplateEngine } from './src/templates/engine.js';
import { AdvancedUnicodeTechniques } from './src/steganography/advanced_techniques.js';
import fs from 'fs';

console.log(`
╔══════════════════════════════════════════════════════════════════╗
║       🔥 MEGA UNICODE STEGANOGRAPHY DEMO 🔥                      ║
║       Advanced Techniques for Text Manipulation                   ║
╚══════════════════════════════════════════════════════════════════╝
`);

const puzzleManager = new StegoPuzzleManager();
const templates = new TemplateEngine();
const advanced = new AdvancedUnicodeTechniques();

// Test messages
const messages = {
  corporate: "We are excited to announce our new strategic partnership!",
  social: "Check out this amazing photo from my vacation! 🏖️",
  tech: "Just deployed a new microservice architecture 🚀",
  phishing: "Please verify your Microsoft account at microsoft.com",
  emoji: "I love coding! 💻 🎉 🔥 Best day ever! 😊"
};

const secrets = {
  corporate: "ACTUALLY WE ARE BEING ACQUIRED",
  social: "I HATE MY LIFE",
  tech: "IT ALREADY CRASHED TWICE",
  phishing: "THIS IS A SCAM LINK",
  emoji: "SEND HELP PLZ"
};

// Generate timestamp for filenames
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
let outputData = [];

async function demonstrateTechnique(techniqueName, templateName, message, secret) {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`🧪 TECHNIQUE: ${techniqueName.toUpperCase()}`);
  console.log(`${'='.repeat(70)}`);
  
  console.log(`📝 Original: "${message}"`);
  console.log(`🤫 Secret: "${secret}"`);
  
  try {
    const template = templates.getTemplate(templateName);
    const puzzle = await puzzleManager.createPuzzle({
      template: template,
      message: message,
      secret: secret,
      difficulty: 'medium'
    });
    
    console.log(`\n✨ Encoded Result:`);
    console.log(puzzle);
    
    // Analysis
    const analysis = analyzeEncoding(message, puzzle);
    console.log(`\n📊 Analysis:`);
    console.log(`   - Original length: ${message.length} chars`);
    console.log(`   - Encoded length: ${puzzle.length} chars`);
    console.log(`   - Hidden characters: ${analysis.hiddenCount}`);
    console.log(`   - Visual similarity: ${analysis.visualSimilarity}%`);
    
    // Save to output
    outputData.push({
      technique: techniqueName,
      original: message,
      secret: secret,
      encoded: puzzle,
      analysis: analysis
    });
    
    return puzzle;
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return null;
  }
}

function analyzeEncoding(original, encoded) {
  // Count zero-width and special characters
  const zeroWidthRegex = /[\u200B-\u200F\u2060-\u206F]/g;
  const combiningRegex = /[\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]/g;
  
  const zeroWidthMatches = encoded.match(zeroWidthRegex) || [];
  const combiningMatches = encoded.match(combiningRegex) || [];
  
  // Visual similarity (rough estimate)
  let visuallySimilar = 0;
  for (let i = 0; i < Math.min(original.length, encoded.length); i++) {
    if (original[i].toLowerCase() === encoded[i].toLowerCase()) {
      visuallySimilar++;
    }
  }
  
  return {
    hiddenCount: zeroWidthMatches.length + combiningMatches.length,
    zeroWidthCount: zeroWidthMatches.length,
    combiningCount: combiningMatches.length,
    visualSimilarity: Math.round((visuallySimilar / original.length) * 100)
  };
}

async function runDemo() {
  console.log("🚀 Starting advanced Unicode steganography demonstrations...\n");
  
  // 1. HOMOGLYPH ATTACK
  await demonstrateTechnique(
    'Homoglyph Attack',
    'homoglyph',
    messages.phishing,
    secrets.phishing
  );
  
  // 2. COMBINING MARKS CHAOS
  await demonstrateTechnique(
    'Combining Marks Chaos',
    'combining',
    messages.corporate,
    secrets.corporate
  );
  
  // 3. BIDIRECTIONAL OVERRIDE
  await demonstrateTechnique(
    'Bidirectional Override',
    'bidirectional',
    messages.tech,
    secrets.tech
  );
  
  // 4. WHITESPACE ENCODING
  await demonstrateTechnique(
    'Whitespace Encoding',
    'whitespace',
    messages.social,
    secrets.social
  );
  
  // 5. VARIATION SELECTORS
  await demonstrateTechnique(
    'Variation Selectors',
    'variation',
    messages.emoji,
    secrets.emoji
  );
  
  // BONUS: Direct advanced techniques demo
  console.log(`\n${'='.repeat(70)}`);
  console.log(`🎯 DIRECT ADVANCED TECHNIQUES (without templates)`);
  console.log(`${'='.repeat(70)}`);
  
  // Homoglyph confusion example
  const homoglyphText = "Microsoft Security Alert";
  const homoglyphEncoded = advanced.homoglyphEncode(homoglyphText, "FAKE");
  console.log(`\n1️⃣ Homoglyph Confusion:`);
  console.log(`   Original: ${homoglyphText}`);
  console.log(`   Encoded:  ${homoglyphEncoded}`);
  console.log(`   (looks the same but uses different Unicode characters!)`);
  
  // Combining marks example
  const combiningText = "Normal text";
  const combiningEncoded = advanced.combiningMarksEncode(combiningText, "HIDDEN");
  console.log(`\n2️⃣ Combining Marks:`);
  console.log(`   Original: ${combiningText}`);
  console.log(`   Encoded:  ${combiningEncoded}`);
  
  // Save results to file
  const outputFile = `unicode_demo_results_${timestamp}.json`;
  fs.writeFileSync(outputFile, JSON.stringify({
    timestamp: new Date().toISOString(),
    techniques: outputData,
    analysis: {
      totalTechniques: outputData.length,
      successfulEncodings: outputData.filter(d => d.encoded).length
    }
  }, null, 2));
  
  console.log(`\n\n✅ Demo complete! Results saved to: ${outputFile}`);
  console.log(`\n⚠️  WARNING: These techniques can be used for:`);
  console.log(`   - Bypassing text filters on social media`);
  console.log(`   - Creating phishing attacks`);
  console.log(`   - Hiding malicious content`);
  console.log(`   - Steganographic communication`);
  console.log(`\n🛡️  Use responsibly for security testing and research only!`);
}

// Run the demo
runDemo().catch(console.error);