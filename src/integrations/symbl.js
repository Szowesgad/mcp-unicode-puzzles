import fetch from "node-fetch";
import { JSDOM } from "jsdom";

export class SymblConnector {
  constructor() {
    this.baseUrl = "https://symbl.cc/en";
    this.cache = new Map();
    this.rateLimit = {
      requests: 0,
      lastReset: Date.now(),
      limit: 100, // requests per minute
    };

    // Initialize character categories
    this.categories = {
      zeroWidth: [
        "200B",
        "200C",
        "200D",
        "200E",
        "200F",
        "2060",
        "206A",
        "206B",
        "206C",
        "206D",
        "206E",
        "206F",
      ],
      quantum: [
        "0278",
        "0299",
        "1D487",
        "1D688",
        "1D689",
        "1D68A",
        "1D68B",
        "1D68C",
        "1D68D",
        "1D68E",
      ],
      special: [
        "2022",
        "2023",
        "25A0",
        "25A1",
        "25CF",
        "25CB",
        "25D0",
        "25D1",
        "25D2",
        "25D3",
      ],
    };
  }

  async searchCharacters(query, category = null) {
    // For now, return hardcoded results based on query
    // TODO: Connect to unicode-symbols-db or symbl.cc API
    
    const queryLower = query.toLowerCase();
    const results = [];
    
    // Hardcoded quantum-related characters
    if (queryLower.includes('quantum') || queryLower.includes('physics')) {
      results.push(
        { char: 'ψ', name: 'Greek Small Letter Psi', code: 'U+03C8', description: 'Wave function in quantum mechanics' },
        { char: 'Ψ', name: 'Greek Capital Letter Psi', code: 'U+03A8', description: 'Wave function' },
        { char: 'ℏ', name: 'Planck Constant Over Two Pi', code: 'U+210F', description: 'Reduced Planck constant' },
        { char: '∞', name: 'Infinity', code: 'U+221E', description: 'Infinite value' },
        { char: 'α', name: 'Greek Small Letter Alpha', code: 'U+03B1', description: 'Fine structure constant' }
      );
    }
    
    // Zero-width characters
    if (queryLower.includes('zero') || queryLower.includes('width') || queryLower.includes('invisible')) {
      results.push(
        { char: '\u200B', name: 'Zero Width Space', code: 'U+200B', description: 'Invisible space character' },
        { char: '\u200C', name: 'Zero Width Non-Joiner', code: 'U+200C', description: 'Prevents ligatures' },
        { char: '\u200D', name: 'Zero Width Joiner', code: 'U+200D', description: 'Forces ligatures' },
        { char: '\u2060', name: 'Word Joiner', code: 'U+2060', description: 'Prevents line breaks' }
      );
    }
    
    // Glitch/block characters
    if (queryLower.includes('glitch') || queryLower.includes('block')) {
      results.push(
        { char: '░', name: 'Light Shade', code: 'U+2591', description: '25% shaded block' },
        { char: '▒', name: 'Medium Shade', code: 'U+2592', description: '50% shaded block' },
        { char: '▓', name: 'Dark Shade', code: 'U+2593', description: '75% shaded block' },
        { char: '█', name: 'Full Block', code: 'U+2588', description: '100% filled block' }
      );
    }
    
    // If no specific match, return some general interesting characters
    if (results.length === 0) {
      results.push(
        { char: '☠', name: 'Skull and Crossbones', code: 'U+2620', description: 'Danger symbol' },
        { char: '⚛', name: 'Atom Symbol', code: 'U+269B', description: 'Atomic structure' },
        { char: '∿', name: 'Sine Wave', code: 'U+223F', description: 'Sinusoidal wave' }
      );
    }
    
    return results;
    
    /* Original web scraping code - kept for future use
    await this.checkRateLimit();

    // Check cache first  
    const cacheKey = `search:${query}:${category}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
    } catch (error) {
      throw new Error(`Failed to search symbl.cc: ${error.message}`);
    }
  }

  async getZeroWidthCharacters() {
    return this.getCharactersByCategory("zeroWidth");
  }

  async getQuantumCharacters() {
    return this.getCharactersByCategory("quantum");
  }

  async getSpecialCharacters() {
    return this.getCharactersByCategory("special");
  }

  async getCharactersByCategory(category) {
    if (!this.categories[category]) {
      throw new Error(`Invalid category: ${category}`);
    }

    const results = [];
    for (const code of this.categories[category]) {
      const char = await this.getCharacterByCode(code);
      if (char) results.push(char);
    }

    return results;
  }

  async getCharacterByCode(code) {
    await this.checkRateLimit();

    // Check cache
    const cacheKey = `char:${code}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(`${this.baseUrl}/${code}/`);
      const html = await response.text();

      const dom = new JSDOM(html);
      const document = dom.window.document;

      const charBlock = document.querySelector(".char-block");
      if (!charBlock) return null;

      const result = {
        char: charBlock.querySelector(".char").textContent,
        code,
        name: charBlock.querySelector(".name").textContent,
        category: this.determineCategory(code),
      };

      // Cache result
      this.cache.set(cacheKey, result);

      // Update rate limit
      this.rateLimit.requests++;

      return result;
    } catch (error) {
      throw new Error(`Failed to fetch character ${code}: ${error.message}`);
    }
  }

  determineCategory(code) {
    code = code.replace("U+", "");

    if (this.categories.zeroWidth.includes(code)) return "zeroWidth";
    if (this.categories.quantum.includes(code)) return "quantum";
    if (this.categories.special.includes(code)) return "special";
    return "other";
  }

  async checkRateLimit() {
    const now = Date.now();
    const timeSinceReset = now - this.rateLimit.lastReset;

    // Reset counter if a minute has passed
    if (timeSinceReset >= 60000) {
      this.rateLimit.requests = 0;
      this.rateLimit.lastReset = now;
      return;
    }

    // Check if we've hit the limit
    if (this.rateLimit.requests >= this.rateLimit.limit) {
      const waitTime = 60000 - timeSinceReset;
      throw new Error(
        `Rate limit exceeded. Please wait ${Math.ceil(waitTime / 1000)} seconds.`,
      );
    }
  }

  // Memory integration methods
  async saveToMemory(mcpMemory) {
    const timestamp = new Date().toISOString();

    // Store cache statistics
    await mcpMemory.create_entities([
      {
        name: `symbl_cache_${timestamp}`,
        entityType: "Cache",
        observations: [
          `Total Cached Items: ${this.cache.size}`,
          `Rate Limit Status: ${this.rateLimit.requests}/${this.rateLimit.limit}`,
          `Last Reset: ${new Date(this.rateLimit.lastReset).toISOString()}`,
        ],
      },
    ]);

    // Store category statistics
    for (const [category, codes] of Object.entries(this.categories)) {
      await mcpMemory.create_entities([
        {
          name: `symbl_category_${category}_${timestamp}`,
          entityType: "CharacterCategory",
          observations: [
            `Category: ${category}`,
            `Total Characters: ${codes.length}`,
            `Codes: ${codes.join(", ")}`,
          ],
        },
      ]);
    }
  }

  clearCache() {
    this.cache.clear();
    this.rateLimit.requests = 0;
    this.rateLimit.lastReset = Date.now();
  }
}
