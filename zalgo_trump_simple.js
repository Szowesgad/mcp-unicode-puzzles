#!/usr/bin/env node
import fs from 'fs';

// Trump's visible message
const visibleMessage = "Dear Elon, My tremendous friend! Our beautiful friendship was perfect. But sometimes even the greatest relationships need space... like SpaceX! You understand rockets, I understand making America great. We're winning bigly, just separately. Best regards, DJT";

// Hidden message using zero-width characters
const hiddenMessage = "I CANT HANDLE YOUR EGO BEING BIGGER THAN MINE ALSO STOP FACT CHECKING ME ON X";

// Zero-width characters for encoding
const ZWSP = '\u200B'; // Zero Width Space
const ZWNJ = '\u200C'; // Zero Width Non-Joiner
const ZWJ = '\u200D';  // Zero Width Joiner

// Zalgo diacritics
const zalgoUp = ['̍', '̎', '̄', '̅', '̿', '̑', '̆', '̐', '͒', '͗', '̇', '̈', '̊', '͂', '̓', '̈́', '͊', '͋', '͌', '̃', '̂', '̌', '͐', '̀', '́', '̋', '̏', '̒', '̔', '̽', '̉'];
const zalgoMid = ['̴', '̵', '̶', '̷', '̸', '̡', '̢', '̧', '̨', '͏', '͜', '͝', '͞', '͟', '͠', '͢'];
const zalgoDown = ['̖', '̗', '̘', '̙', '̜', '̝', '̞', '̟', '̠', '̤', '̥', '̦', '̩', '̪', '̫', '̬', '̭', '̮', '̯', '̰', '̱', '̲', '̳', '̹', '̺', '̻', '̼', 'ͅ', '͇', '͈', '͉', '͍', '͎', '͓', '͔', '͕', '͖', '͙', '͚', '̣'];

// Convert text to binary
function textToBinary(text) {
  return text.split('').map(char => 
    char.charCodeAt(0).toString(2).padStart(8, '0')
  ).join('');
}

// Add Zalgo effect
function zalgofy(text, intensity = 3) {
  return text.split('').map(char => {
    let result = char;
    for (let i = 0; i < intensity; i++) {
      if (Math.random() > 0.5) result += zalgoUp[Math.floor(Math.random() * zalgoUp.length)];
      if (Math.random() > 0.5) result += zalgoDown[Math.floor(Math.random() * zalgoDown.length)];
      if (Math.random() > 0.3) result += zalgoMid[Math.floor(Math.random() * zalgoMid.length)];
    }
    return result;
  }).join('');
}

// Encode hidden message into visible text
function encodeMessage(visible, hidden) {
  const binary = textToBinary(hidden);
  let encoded = '';
  let binaryIndex = 0;
  
  for (let i = 0; i < visible.length; i++) {
    encoded += visible[i];
    
    // Insert zero-width characters based on binary
    if (binaryIndex < binary.length && i % 2 === 0) {
      if (binary[binaryIndex] === '1') {
        encoded += ZWSP;
      } else {
        encoded += ZWNJ;
      }
      binaryIndex++;
    }
    
    // Add random noise
    if (Math.random() > 0.7) {
      encoded += ZWJ;
    }
  }
  
  return encoded;
}

// Decode hidden message
function decodeMessage(encoded) {
  let binary = '';
  
  for (let char of encoded) {
    if (char === ZWSP) binary += '1';
    else if (char === ZWNJ) binary += '0';
  }
  
  // Convert binary back to text
  const bytes = binary.match(/.{1,8}/g) || [];
  return bytes.map(byte => String.fromCharCode(parseInt(byte, 2))).join('');
}

// Generate the message
const encodedMessage = encodeMessage(visibleMessage, hiddenMessage);
const zalgoMessage = zalgofy('[ERR0R//SYSTEM.BREACH] ', 5) + zalgofy(encodedMessage, 3);

// Create output
const output = {
  timestamp: new Date().toISOString(),
  visible_message: visibleMessage,
  hidden_message: hiddenMessage,
  zalgo_text: zalgoMessage,
  stats: {
    original_length: visibleMessage.length,
    encoded_length: encodedMessage.length,
    zero_width_chars: encodedMessage.length - visibleMessage.length
  }
};

// Generate filename with timestamp
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
const filename = `trump_to_musk_zalgo_${timestamp}.json`;
const textFilename = `trump_to_musk_zalgo_${timestamp}.txt`;

// Save JSON file
fs.writeFileSync(filename, JSON.stringify(output, null, 2));

// Save text file for easy copying
const textOutput = `TRUMP TO MUSK - ZALGO MESSAGE (${new Date().toLocaleDateString()})
================================

${zalgoMessage}

================================
Hidden message: ${hiddenMessage}
================================`;

fs.writeFileSync(textFilename, textOutput);

console.log("\n=== 🔥 TRUMP'S ZALGO MESSAGE TO ELON (May 2025) 🔥 ===\n");
console.log(zalgoMessage);
console.log("\n=== 🤫 HIDDEN MESSAGE (encoded in zero-width chars) ===");
console.log(hiddenMessage);
console.log("\n=== 🔍 VERIFICATION ===");
const decoded = decodeMessage(encodedMessage);
console.log("Decoded fragment:", decoded.substring(0, 50) + "...");
console.log("Message length:", visibleMessage.length, "chars");
console.log("With hidden data:", encodedMessage.length, "chars (+", encodedMessage.length - visibleMessage.length, "zero-width)");
console.log("\n💡 Paste this Zalgo text on LinkedIn/Twitter and the formatting will survive!");
console.log("   But the hidden message in zero-width characters is there! 😈");
console.log("\n📁 FILES SAVED:");
console.log(`   - ${filename} (full data with metadata)`);
console.log(`   - ${textFilename} (ready to copy & paste)`);