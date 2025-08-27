import { AdvancedUnicodeTechniques } from "./advanced_techniques.js";

export class StegoPuzzleManager {
  constructor() {
    this.advanced = new AdvancedUnicodeTechniques();
    this.zeroWidthChars = {
      ZWSP: "\u200B", // Zero width space
      ZWNJ: "\u200C", // Zero width non-joiner
      ZWJ: "\u200D", // Zero width joiner
      LRM: "\u200E", // Left-to-right mark
      RLM: "\u200F", // Right-to-left mark
      WJ: "\u2060", // Word joiner
      ISS: "\u206A", // Inhibit symmetric swapping
      ASS: "\u206B", // Activate symmetric swapping
      IAFS: "\u206C", // Inhibit arabic form shaping
      AAFS: "\u206D", // Activate arabic form shaping
      NADS: "\u206E", // National digit shapes
      NODS: "\u206F", // Nominal digit shapes
    };

    this.patterns = {
      quantum: {
        prefix: "【𝚀𝚄𝙰𝙽𝚃𝚄𝙼】",
        separator: "∎∎∎",
        encoding: "binary",
      },
      orbital: {
        prefix: "◉",
        separator: "◯",
        encoding: "trinary",
      },
      glitch: {
        prefix: "[ERR0R]",
        separator: "",
        encoding: "random",
      },
      void: {
        prefix: "✧･ﾟ:*",
        separator: "⋆",
        encoding: "binary",
      },
      homoglyph: {
        prefix: "[НОMОGLҮРН]",
        separator: "",
        encoding: "homoglyph",
      },
      combining: {
        prefix: "☠️",
        separator: "☠️",
        encoding: "combining",
      },
      bidirectional: {
        prefix: "⬅️➡️",
        separator: "",
        encoding: "bidirectional",
      },
      whitespace: {
        prefix: "[ ]",
        separator: "",
        encoding: "whitespace",
      },
      variation: {
        prefix: "🎭",
        separator: "🎭",
        encoding: "variation",
      },
    };
  }

  async createPuzzle({ template, message, secret, difficulty = "medium" }) {
    // Get encoding pattern based on template and difficulty
    const pattern = this.patterns[template.name];

    // Encode secret message
    const encodedText = await this.encodeSecret(message, secret, {
      pattern: pattern.encoding,
      difficulty,
    });

    // Apply template formatting
    return this.applyTemplate(encodedText, template);
  }

  async encodeSecret(message, secret, options) {
    const { pattern, difficulty } = options;

    // Convert secret to binary
    const binarySecret = this.textToBinary(secret);

    // Initialize encoded text
    let encoded = "";
    let charIndex = 0;

    // Apply encoding based on pattern
    switch (pattern) {
      case "binary":
        encoded = this.binaryEncode(message, binarySecret, difficulty);
        break;
      case "trinary":
        encoded = this.trinaryEncode(message, binarySecret, difficulty);
        break;
      case "random":
        encoded = this.randomEncode(message, binarySecret, difficulty);
        break;
      case "homoglyph":
        encoded = this.advanced.homoglyphEncode(message, secret);
        break;
      case "combining":
        encoded = this.advanced.combiningMarksEncode(message, secret);
        break;
      case "bidirectional":
        encoded = this.advanced.bidirectionalEncode(message, secret);
        break;
      case "whitespace":
        encoded = this.advanced.whitespaceEncode(message, secret);
        break;
      case "variation":
        encoded = this.advanced.variationSelectorsEncode(message, secret);
        break;
      default:
        throw new Error("Invalid encoding pattern");
    }

    return encoded;
  }

  binaryEncode(message, binarySecret, difficulty) {
    let encoded = "";
    let secretIndex = 0;

    for (let i = 0; i < message.length; i++) {
      encoded += message[i];

      if (secretIndex < binarySecret.length) {
        // Insert zero-width character based on binary value
        if (binarySecret[secretIndex] === "1") {
          encoded += this.zeroWidthChars.ZWSP;
        } else {
          encoded += this.zeroWidthChars.ZWNJ;
        }
        secretIndex++;
      }

      // Add noise for higher difficulties
      if (difficulty === "hard") {
        if (Math.random() > 0.7) {
          encoded += this.getRandomZeroWidth();
        }
      }
    }

    return encoded;
  }

  trinaryEncode(message, binarySecret, difficulty) {
    let encoded = "";
    let secretIndex = 0;

    // Convert binary to trinary for more complex encoding
    const trinarySecret = this.binaryToTrinary(binarySecret);

    for (let i = 0; i < message.length; i++) {
      encoded += message[i];

      if (secretIndex < trinarySecret.length) {
        // Use three zero-width characters for trinary encoding
        switch (trinarySecret[secretIndex]) {
          case "0":
            encoded += this.zeroWidthChars.ZWSP;
            break;
          case "1":
            encoded += this.zeroWidthChars.ZWNJ;
            break;
          case "2":
            encoded += this.zeroWidthChars.ZWJ;
            break;
        }
        secretIndex++;
      }
    }

    return encoded;
  }

  randomEncode(message, binarySecret, difficulty) {
    let encoded = "";
    let secretIndex = 0;

    const chars = Object.values(this.zeroWidthChars);

    for (let i = 0; i < message.length; i++) {
      encoded += message[i];

      // Random noise insertion
      if (Math.random() > 0.5) {
        encoded += chars[Math.floor(Math.random() * chars.length)];
      }

      // Secret encoding
      if (secretIndex < binarySecret.length) {
        if (binarySecret[secretIndex] === "1") {
          encoded += this.zeroWidthChars.WJ;
        }
        secretIndex++;
      }
    }

    return encoded;
  }

  textToBinary(text) {
    return text
      .split("")
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
      .join("");
  }

  binaryToTrinary(binary) {
    // Convert binary to decimal
    const decimal = parseInt(binary, 2);
    // Convert decimal to trinary
    return decimal.toString(3);
  }

  getRandomZeroWidth() {
    const chars = Object.values(this.zeroWidthChars);
    return chars[Math.floor(Math.random() * chars.length)];
  }

  applyTemplate(encodedText, template) {
    return `${template.prefix}${template.separator}${encodedText}${template.separator}`;
  }

  // Decoding methods
  async decodePuzzle(encodedText) {
    // Detect template
    const template = this.detectTemplate(encodedText);

    // Remove template formatting
    const stripped = this.stripTemplate(encodedText, template);

    // Extract and decode hidden message
    return this.decodeSecret(stripped, template.encoding);
  }

  detectTemplate(encodedText) {
    for (const [name, pattern] of Object.entries(this.patterns)) {
      if (encodedText.startsWith(pattern.prefix)) {
        return { name, ...pattern };
      }
    }
    throw new Error("Unknown puzzle template");
  }

  stripTemplate(encodedText, template) {
    return encodedText
      .replace(template.prefix, "")
      .split(template.separator)[1];
  }

  decodeSecret(text, encoding = { pattern: 'binary' }) {
    // Handle both string and object parameter
    const pattern = typeof encoding === 'string' ? encoding : encoding.pattern || 'binary';
    
    let binary = "";
    let visibleText = "";

    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      // Check if it's a zero-width character
      if (Object.values(this.zeroWidthChars).includes(char)) {
        switch (pattern) {
          case "binary":
            // Fixed: ZWSP = 1, ZWNJ = 0 (matching the encoding logic)
            if (char === this.zeroWidthChars.ZWSP) {
              binary += "1";
            } else if (char === this.zeroWidthChars.ZWNJ) {
              binary += "0";
            }
            // Ignore other zero-width chars (they might be noise)
            break;
          case "trinary":
            if (char === this.zeroWidthChars.ZWSP) binary += "0";
            else if (char === this.zeroWidthChars.ZWNJ) binary += "1";
            else if (char === this.zeroWidthChars.ZWJ) binary += "2";
            break;
          case "random":
            if (char === this.zeroWidthChars.WJ) binary += "1";
            break;
        }
      } else {
        visibleText += char;
      }
    }

    return {
      visibleText,
      hiddenMessage: this.binaryToText(binary),
    };
  }

  applyPatternTemplate(encodedText, template) {
    const pattern = this.patterns[template.name];
    return `${template.prefix}${pattern.separator}${encodedText}${pattern.separator}`;
  }

  textToBinary(text) {
    return text
      .split("")
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
      .join("");
  }

  binaryToText(binary) {
    // Split binary into 8-bit chunks
    const bytes = binary.match(/.{1,8}/g) || [];

    // Convert each byte to character
    return bytes.map((byte) => String.fromCharCode(parseInt(byte, 2))).join("");
  }

  getRandomZeroWidth() {
    const chars = Object.values(this.zeroWidthChars);
    return chars[Math.floor(Math.random() * chars.length)];
  }

  binaryToTrinary(binary) {
    // Simple conversion - group 2 bits into trinary
    let trinary = "";
    for (let i = 0; i < binary.length; i += 2) {
      const twoBits = binary.slice(i, i + 2);
      if (twoBits === "00") trinary += "0";
      else if (twoBits === "01" || twoBits === "10") trinary += "1";
      else trinary += "2";
    }
    return trinary;
  }
}
