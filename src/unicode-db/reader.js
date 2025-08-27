import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class UnicodeDBReader {
  constructor() {
    // Path to unicode-db directory
    this.dbPath = path.join(__dirname, '../../unicode-db');
    this.dataPath = path.join(this.dbPath, 'data');
    this.locPath = path.join(this.dbPath, 'loc');
    
    // Cache for loaded data
    this.cache = new Map();
    
    // Initialize with common data
    this.loadCommonData();
  }
  
  loadCommonData() {
    try {
      // Load types of Unicode characters
      const typesPath = path.join(this.dataPath, 'types.txt');
      if (fs.existsSync(typesPath)) {
        const types = fs.readFileSync(typesPath, 'utf8').split('\n');
        this.cache.set('types', types);
      }
      
      // Load blocks (Unicode ranges)
      const blocksPath = path.join(this.dataPath, 'blocks.txt');
      if (fs.existsSync(blocksPath)) {
        const blocks = fs.readFileSync(blocksPath, 'utf8').split('\n');
        this.cache.set('blocks', blocks);
      }
    } catch (error) {
      console.warn('Warning: Could not load unicode-db common data:', error.message);
    }
  }
  
  /**
   * Search for Unicode characters matching a query
   */
  async searchCharacters(query, options = {}) {
    const results = [];
    const queryLower = query.toLowerCase();
    const maxResults = options.limit || 50;
    
    try {
      // Search in symbol files
      const symbolsDir = path.join(this.locPath, 'en/symbols');
      
      if (!fs.existsSync(symbolsDir)) {
        // Fallback to hardcoded data if unicode-db not available
        return this.getFallbackResults(query);
      }
      
      // Read symbol files
      const files = fs.readdirSync(symbolsDir)
        .filter(f => f.endsWith('.txt'))
        .slice(0, 10); // Limit to first 10 files for performance
      
      for (const file of files) {
        if (results.length >= maxResults) break;
        
        const filePath = path.join(symbolsDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');
        
        for (const line of lines) {
          if (results.length >= maxResults) break;
          if (!line.trim()) continue;
          
          // Parse line format: "CODE|CHAR|NAME|CATEGORY|..."
          const parts = line.split('|');
          if (parts.length < 3) continue;
          
          const [code, char, name] = parts;
          const nameLower = (name || '').toLowerCase();
          
          if (nameLower.includes(queryLower) || 
              code.toLowerCase().includes(queryLower)) {
            results.push({
              char: char || String.fromCharCode(parseInt(code, 16)),
              name: name || 'Unknown',
              code: `U+${code}`,
              category: parts[3] || 'Symbol',
              description: parts[4] || ''
            });
          }
        }
      }
    } catch (error) {
      console.warn('Search error, using fallback:', error.message);
      return this.getFallbackResults(query);
    }
    
    return results.length > 0 ? results : this.getFallbackResults(query);
  }
  
  /**
   * Get zero-width characters from database
   */
  async getZeroWidthCharacters() {
    const zeroWidthChars = [
      { char: '\u200B', name: 'Zero Width Space', code: 'U+200B', description: 'Invisible space character' },
      { char: '\u200C', name: 'Zero Width Non-Joiner', code: 'U+200C', description: 'Prevents ligatures' },
      { char: '\u200D', name: 'Zero Width Joiner', code: 'U+200D', description: 'Forces ligatures' },
      { char: '\u2060', name: 'Word Joiner', code: 'U+2060', description: 'Prevents line breaks' },
      { char: '\uFEFF', name: 'Zero Width No-Break Space', code: 'U+FEFF', description: 'BOM marker' },
      { char: '\u180E', name: 'Mongolian Vowel Separator', code: 'U+180E', description: 'Narrow no-break space' },
      { char: '\u200E', name: 'Left-to-Right Mark', code: 'U+200E', description: 'LTR direction marker' },
      { char: '\u200F', name: 'Right-to-Left Mark', code: 'U+200F', description: 'RTL direction marker' },
      { char: '\u202A', name: 'Left-to-Right Embedding', code: 'U+202A', description: 'Start LTR embedding' },
      { char: '\u202B', name: 'Right-to-Left Embedding', code: 'U+202B', description: 'Start RTL embedding' },
      { char: '\u202C', name: 'Pop Directional Formatting', code: 'U+202C', description: 'End embedding/override' },
      { char: '\u202D', name: 'Left-to-Right Override', code: 'U+202D', description: 'Force LTR direction' },
      { char: '\u202E', name: 'Right-to-Left Override', code: 'U+202E', description: 'Force RTL direction' },
      { char: '\u2061', name: 'Function Application', code: 'U+2061', description: 'Math invisible operator' },
      { char: '\u2062', name: 'Invisible Times', code: 'U+2062', description: 'Math multiplication' },
      { char: '\u2063', name: 'Invisible Separator', code: 'U+2063', description: 'Math separator' },
      { char: '\u2064', name: 'Invisible Plus', code: 'U+2064', description: 'Math addition' }
    ];
    
    return zeroWidthChars;
  }
  
  /**
   * Get homoglyph characters (visually similar)
   */
  async getHomoglyphs(char) {
    const homoglyphMap = {
      'A': ['А', 'Α', 'Ａ', '𝐀', '𝐴', '𝑨', '𝒜', '𝓐', '𝔸', '𝕬', '𝖠', '𝗔', '𝘈', '𝘼'],
      'B': ['В', 'Β', 'Ｂ', 'ℬ', '𝐁', '𝐵', '𝑩', '𝓑', '𝔅', '𝔹', '𝕭', '𝖡', '𝗕', '𝘉'],
      'C': ['С', 'Ⅽ', 'Ｃ', 'ℂ', '𝐂', '𝐶', '𝑪', '𝒞', '𝓒', '𝕮', '𝖢', '𝗖', '𝘊'],
      'D': ['Ⅾ', 'Ｄ', 'ⅅ', '𝐃', '𝐷', '𝑫', '𝒟', '𝓓', '𝔻', '𝕯', '𝖣', '𝗗', '𝘋'],
      'E': ['Е', 'Ε', 'Ｅ', 'ℰ', '𝐄', '𝐸', '𝑬', '𝓔', '𝔼', '𝕰', '𝖤', '𝗘', '𝘌'],
      'F': ['Ｆ', 'ℱ', '𝐅', '𝐹', '𝑭', '𝓕', '𝔽', '𝕱', '𝖥', '𝗙', '𝘍'],
      'G': ['Ｇ', '𝐆', '𝐺', '𝑮', '𝒢', '𝓖', '𝔾', '𝕲', '𝖦', '𝗚', '𝘎'],
      'H': ['Н', 'Η', 'Ｈ', 'ℋ', 'ℌ', '𝐇', '𝐻', '𝑯', '𝓗', '𝕳', '𝖧', '𝗛', '𝘏'],
      'I': ['І', 'Ι', 'Ⅰ', 'Ｉ', 'ℐ', 'ℑ', '𝐈', '𝐼', '𝑰', '𝓘', '𝕀', '𝕴', '𝖨', '𝗜', '𝘐'],
      'J': ['Ј', 'Ｊ', '𝐉', '𝐽', '𝑱', '𝒥', '𝓙', '𝕁', '𝕵', '𝖩', '𝗝', '𝘑'],
      'K': ['К', 'Κ', 'Ｋ', '𝐊', '𝐾', '𝑲', '𝒦', '𝓚', '𝕂', '𝕶', '𝖪', '𝗞', '𝘒'],
      'L': ['Ⅼ', 'Ｌ', 'ℒ', '𝐋', '𝐿', '𝑳', '𝓛', '𝕃', '𝕷', '𝖫', '𝗟', '𝘓'],
      'M': ['М', 'Μ', 'Ⅿ', 'Ｍ', 'ℳ', '𝐌', '𝑀', '𝑴', '𝓜', '𝕄', '𝕸', '𝖬', '𝗠', '𝘔'],
      'N': ['Ν', 'Ｎ', 'ℕ', '𝐍', '𝑁', '𝑵', '𝒩', '𝓝', '𝕹', '𝖭', '𝗡', '𝘕'],
      'O': ['О', 'Ο', 'Ｏ', '𝐎', '𝑂', '𝑶', '𝒪', '𝓞', '𝔸', '𝕺', '𝖮', '𝗢', '𝘖'],
      'P': ['Р', 'Ρ', 'Ｐ', 'ℙ', '𝐏', '𝑃', '𝑷', '𝒫', '𝓟', '𝕻', '𝖯', '𝗣', '𝘗'],
      'Q': ['Ｑ', 'ℚ', '𝐐', '𝑄', '𝑸', '𝒬', '𝓠', '𝕼', '𝖰', '𝗤', '𝘘'],
      'R': ['Ｒ', 'ℛ', 'ℜ', '𝐑', '𝑅', '𝑹', '𝓡', '𝕽', '𝖱', '𝗥', '𝘙'],
      'S': ['Ѕ', 'Ｓ', '𝐒', '𝑆', '𝑺', '𝒮', '𝓢', '𝕊', '𝕾', '𝖲', '𝗦', '𝘚'],
      'T': ['Т', 'Τ', 'Ｔ', '𝐓', '𝑇', '𝑻', '𝒯', '𝓣', '𝕋', '𝕿', '𝖳', '𝗧', '𝘛'],
      'U': ['Ｕ', '𝐔', '𝑈', '𝑼', '𝒰', '𝓤', '𝕌', '𝖀', '𝖴', '𝗨', '𝘜'],
      'V': ['Ⅴ', 'Ｖ', '𝐕', '𝑉', '𝑽', '𝒱', '𝓥', '𝕍', '𝖁', '𝖵', '𝗩', '𝘝'],
      'W': ['Ｗ', '𝐖', '𝑊', '𝑾', '𝒲', '𝓦', '𝕎', '𝖂', '𝖶', '𝗪', '𝘞'],
      'X': ['Х', 'Χ', 'Ⅹ', 'Ｘ', '𝐗', '𝑋', '𝑿', '𝒳', '𝓧', '𝕏', '𝖃', '𝖷', '𝗫', '𝘟'],
      'Y': ['У', 'Υ', 'Ｙ', '𝐘', '𝑌', '𝒀', '𝒴', '𝓨', '𝕐', '𝖄', '𝖸', '𝗬', '𝘠'],
      'Z': ['Ｚ', 'ℤ', '𝐙', '𝑍', '𝒁', '𝒵', '𝓩', '𝕫', '𝖅', '𝖹', '𝗭', '𝘡'],
      'a': ['а', 'ａ', '𝐚', '𝑎', '𝒂', '𝒶', '𝓪', '𝔞', '𝕒', '𝖆', '𝖺', '𝗮', '𝘢', '𝙖'],
      'b': ['Ь', 'ｂ', '𝐛', '𝑏', '𝒃', '𝒷', '𝓫', '𝔟', '𝕓', '𝖇', '𝖻', '𝗯', '𝘣', '𝙗'],
      'c': ['с', 'ｃ', '𝐜', '𝑐', '𝒄', '𝒸', '𝓬', '𝔠', '𝕔', '𝖈', '𝖼', '𝗰', '𝘤', '𝙘'],
      'd': ['ԁ', 'ｄ', 'ⅆ', '𝐝', '𝑑', '𝒅', '𝒹', '𝓭', '𝔡', '𝕕', '𝖉', '𝖽', '𝗱', '𝘥', '𝙙'],
      'e': ['е', 'ｅ', 'ℯ', '𝐞', '𝑒', '𝒆', '𝓮', '𝔢', '𝕖', '𝖊', '𝖾', '𝗲', '𝘦', '𝙚'],
      'f': ['ｆ', '𝐟', '𝑓', '𝒇', '𝒻', '𝓯', '𝔣', '𝕗', '𝖋', '𝖿', '𝗳', '𝘧', '𝙛'],
      'g': ['ɡ', 'ｇ', 'ℊ', '𝐠', '𝑔', '𝒈', '𝓰', '𝔤', '𝕘', '𝖌', '𝗀', '𝗴', '𝘨', '𝙜'],
      'h': ['һ', 'ｈ', 'ℎ', '𝐡', '𝒉', '𝒽', '𝓱', '𝔥', '𝕙', '𝖍', '𝗁', '𝗵', '𝘩', '𝙝'],
      'i': ['і', 'ｉ', 'ⅰ', 'ℹ', '𝐢', '𝑖', '𝒊', '𝒾', '𝓲', '𝔦', '𝕚', '𝖎', '𝗂', '𝗶', '𝘪', '𝙞'],
      'j': ['ϳ', 'ј', 'ｊ', 'ⅉ', '𝐣', '𝑗', '𝒋', '𝒿', '𝓳', '𝔧', '𝕛', '𝖏', '𝗃', '𝗷', '𝘫', '𝙟'],
      'k': ['ｋ', '𝐤', '𝑘', '𝒌', '𝓀', '𝓴', '𝔨', '𝕜', '𝖐', '𝗄', '𝗸', '𝘬', '𝙠'],
      'l': ['ӏ', 'ｌ', 'ℓ', '𝐥', '𝑙', '𝒍', '𝓁', '𝓵', '𝔩', '𝕝', '𝖑', '𝗅', '𝗹', '𝘭', '𝙡'],
      'm': ['ｍ', '𝐦', '𝑚', '𝒎', '𝓂', '𝓶', '𝔪', '𝕞', '𝖒', '𝗆', '𝗺', '𝘮', '𝙢'],
      'n': ['ｎ', '𝐧', '𝑛', '𝒏', '𝓃', '𝓷', '𝔫', '𝕟', '𝖓', '𝗇', '𝗻', '𝘯', '𝙣'],
      'o': ['о', 'ｏ', 'ℴ', '𝐨', '𝑜', '𝒐', '𝓸', '𝔬', '𝕠', '𝖔', '𝗈', '𝗼', '𝘰', '𝙤'],
      'p': ['р', 'ｐ', '𝐩', '𝑝', '𝒑', '𝓅', '𝓹', '𝔭', '𝕡', '𝖕', '𝗉', '𝗽', '𝘱', '𝙥'],
      'q': ['ｑ', '𝐪', '𝑞', '𝒒', '𝓆', '𝓺', '𝔮', '𝕢', '𝖖', '𝗊', '𝗾', '𝘲', '𝙦'],
      'r': ['ｒ', '𝐫', '𝑟', '𝒓', '𝓇', '𝓻', '𝔯', '𝕣', '𝖗', '𝗋', '𝗿', '𝘳', '𝙧'],
      's': ['ѕ', 'ｓ', '𝐬', '𝑠', '𝒔', '𝓈', '𝓼', '𝔰', '𝕤', '𝖘', '𝗌', '𝘀', '𝘴', '𝙨'],
      't': ['ｔ', '𝐭', '𝑡', '𝒕', '𝓉', '𝓽', '𝔱', '𝕥', '𝖙', '𝗍', '𝘁', '𝘵', '𝙩'],
      'u': ['ｕ', '𝐮', '𝑢', '𝒖', '𝓊', '𝓾', '𝔲', '𝕦', '𝖚', '𝗎', '𝘂', '𝘶', '𝙪'],
      'v': ['ν', 'ｖ', 'ⅴ', '𝐯', '𝑣', '𝒗', '𝓋', '𝓿', '𝔳', '𝕧', '𝖛', '𝗏', '𝘃', '𝘷', '𝙫'],
      'w': ['ｗ', '𝐰', '𝑤', '𝒘', '𝓌', '𝔀', '𝔴', '𝕨', '𝖜', '𝗐', '𝘄', '𝘸', '𝙬'],
      'x': ['х', 'ｘ', 'ⅹ', '𝐱', '𝑥', '𝒙', '𝓍', '𝔁', '𝔵', '𝕩', '𝖝', '𝗑', '𝘅', '𝘹', '𝙭'],
      'y': ['у', 'ｙ', '𝐲', '𝑦', '𝒚', '𝓎', '𝔂', '𝔶', '𝕪', '𝖞', '𝗒', '𝘆', '𝘺', '𝙮'],
      'z': ['ｚ', '𝐳', '𝑧', '𝒛', '𝓏', '𝔃', '𝔷', '𝕫', '𝖟', '𝗓', '𝘇', '𝘻', '𝙯']
    };
    
    return homoglyphMap[char] || [];
  }
  
  /**
   * Fallback results when database is not available
   */
  getFallbackResults(query) {
    const queryLower = query.toLowerCase();
    const results = [];
    
    // Quantum-related characters
    if (queryLower.includes('quantum') || queryLower.includes('physics')) {
      results.push(
        { char: 'ψ', name: 'Greek Small Letter Psi', code: 'U+03C8', description: 'Wave function in quantum mechanics' },
        { char: 'Ψ', name: 'Greek Capital Letter Psi', code: 'U+03A8', description: 'Wave function' },
        { char: 'ℏ', name: 'Planck Constant Over Two Pi', code: 'U+210F', description: 'Reduced Planck constant' },
        { char: '∞', name: 'Infinity', code: 'U+221E', description: 'Infinite value' },
        { char: 'α', name: 'Greek Small Letter Alpha', code: 'U+03B1', description: 'Fine structure constant' },
        { char: 'β', name: 'Greek Small Letter Beta', code: 'U+03B2', description: 'Beta particle' },
        { char: 'γ', name: 'Greek Small Letter Gamma', code: 'U+03B3', description: 'Gamma ray' },
        { char: 'δ', name: 'Greek Small Letter Delta', code: 'U+03B4', description: 'Change/difference' },
        { char: 'Φ', name: 'Greek Capital Letter Phi', code: 'U+03A6', description: 'Magnetic flux' },
        { char: '∿', name: 'Sine Wave', code: 'U+223F', description: 'Sinusoidal wave' }
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
        { char: '█', name: 'Full Block', code: 'U+2588', description: '100% filled block' },
        { char: '▀', name: 'Upper Half Block', code: 'U+2580', description: 'Upper half filled' },
        { char: '▄', name: 'Lower Half Block', code: 'U+2584', description: 'Lower half filled' }
      );
    }
    
    // Void/space characters
    if (queryLower.includes('void') || queryLower.includes('space') || queryLower.includes('star')) {
      results.push(
        { char: '✧', name: 'Rotated White Four Pointed Star', code: 'U+2727', description: 'Decorative star' },
        { char: '✦', name: 'Black Four Pointed Star', code: 'U+2726', description: 'Filled star' },
        { char: '★', name: 'Black Star', code: 'U+2605', description: 'Filled five-pointed star' },
        { char: '☆', name: 'White Star', code: 'U+2606', description: 'Empty five-pointed star' },
        { char: '✯', name: 'Pinwheel Star', code: 'U+272F', description: 'Pinwheel star' },
        { char: '✩', name: 'Stress Outlined White Star', code: 'U+2729', description: 'Outlined star' },
        { char: '⋆', name: 'Star Operator', code: 'U+22C6', description: 'Math star operator' }
      );
    }
    
    // Orbital/circle characters
    if (queryLower.includes('orbital') || queryLower.includes('circle')) {
      results.push(
        { char: '◉', name: 'Fisheye', code: 'U+25C9', description: 'Circle with center dot' },
        { char: '◯', name: 'Large Circle', code: 'U+25EF', description: 'Large empty circle' },
        { char: '◐', name: 'Circle with Left Half Black', code: 'U+25D0', description: 'Half-filled circle left' },
        { char: '◑', name: 'Circle with Right Half Black', code: 'U+25D1', description: 'Half-filled circle right' },
        { char: '◒', name: 'Circle with Lower Half Black', code: 'U+25D2', description: 'Half-filled circle lower' },
        { char: '◓', name: 'Circle with Upper Half Black', code: 'U+25D3', description: 'Half-filled circle upper' },
        { char: '●', name: 'Black Circle', code: 'U+25CF', description: 'Filled circle' },
        { char: '○', name: 'White Circle', code: 'U+25CB', description: 'Empty circle' }
      );
    }
    
    // If no specific match, return some interesting characters
    if (results.length === 0) {
      results.push(
        { char: '☠', name: 'Skull and Crossbones', code: 'U+2620', description: 'Danger symbol' },
        { char: '⚛', name: 'Atom Symbol', code: 'U+269B', description: 'Atomic structure' },
        { char: '∿', name: 'Sine Wave', code: 'U+223F', description: 'Sinusoidal wave' },
        { char: '【', name: 'Left Black Lenticular Bracket', code: 'U+3010', description: 'Japanese bracket' },
        { char: '】', name: 'Right Black Lenticular Bracket', code: 'U+3011', description: 'Japanese bracket' },
        { char: '⟨', name: 'Mathematical Left Angle Bracket', code: 'U+27E8', description: 'Bra notation' },
        { char: '⟩', name: 'Mathematical Right Angle Bracket', code: 'U+27E9', description: 'Ket notation' }
      );
    }
    
    return results;
  }
}