export class AdvancedUnicodeTechniques {
  constructor() {
    // HOMOGLYPH MAPPINGS - wizualnie identyczne znaki z różnych alfabetów
    this.homoglyphs = {
      a: [
        "а",
        "ɑ",
        "α",
        "𝐚",
        "𝑎",
        "𝒂",
        "𝒶",
        "𝓪",
        "𝔞",
        "𝕒",
        "𝖆",
        "𝖺",
        "𝗮",
        "𝘢",
        "𝙖",
        "𝚊",
      ],
      b: [
        "Ь",
        "ƅ",
        "ḃ",
        "ḅ",
        "ḇ",
        "𝐛",
        "𝑏",
        "𝒃",
        "𝒷",
        "𝓫",
        "𝔟",
        "𝕓",
        "𝖇",
        "𝖻",
        "𝗯",
        "𝘣",
        "𝙗",
        "𝚋",
      ],
      c: [
        "с",
        "ϲ",
        "ⅽ",
        "ⲥ",
        "𝐜",
        "𝑐",
        "𝒄",
        "𝒸",
        "𝓬",
        "𝔠",
        "𝕔",
        "𝖈",
        "𝖼",
        "𝗰",
        "𝘤",
        "𝙘",
        "𝚌",
      ],
      d: [
        "ԁ",
        "ɗ",
        "ḋ",
        "ḍ",
        "ḏ",
        "ḑ",
        "ḓ",
        "𝐝",
        "𝑑",
        "𝒅",
        "𝒹",
        "𝓭",
        "𝔡",
        "𝕕",
        "𝖉",
        "𝖽",
        "𝗱",
        "𝘥",
        "𝙙",
        "𝚍",
      ],
      e: [
        "е",
        "ё",
        "ℯ",
        "ⅇ",
        "ẹ",
        "ẻ",
        "ẽ",
        "ế",
        "ề",
        "𝐞",
        "𝑒",
        "𝒆",
        "𝓮",
        "𝔢",
        "𝕖",
        "𝖊",
        "𝖾",
        "𝗲",
        "𝘦",
        "𝙚",
        "𝚎",
      ],
      f: [
        "ƒ",
        "ḟ",
        "𝐟",
        "𝑓",
        "𝒇",
        "𝒻",
        "𝓯",
        "𝔣",
        "𝕗",
        "𝖋",
        "𝖿",
        "𝗳",
        "𝘧",
        "𝙛",
        "𝚏",
      ],
      g: [
        "ɡ",
        "ġ",
        "ģ",
        "ḡ",
        "ǧ",
        "ǵ",
        "𝐠",
        "𝑔",
        "𝒈",
        "𝓰",
        "𝔤",
        "𝕘",
        "𝖌",
        "𝗀",
        "𝗴",
        "𝘨",
        "𝙜",
        "𝚐",
      ],
      h: [
        "һ",
        "ℎ",
        "ḣ",
        "ḥ",
        "ḧ",
        "ḩ",
        "ḫ",
        "𝐡",
        "𝒉",
        "𝒽",
        "𝓱",
        "𝔥",
        "𝕙",
        "𝖍",
        "𝗁",
        "𝗵",
        "𝘩",
        "𝙝",
        "𝚑",
      ],
      i: [
        "і",
        "í",
        "ì",
        "ï",
        "ı",
        "ɩ",
        "ɪ",
        "ⅰ",
        "ℹ",
        "𝐢",
        "𝑖",
        "𝒊",
        "𝒾",
        "𝓲",
        "𝔦",
        "𝕚",
        "𝖎",
        "𝗂",
        "𝗶",
        "𝘪",
        "𝙞",
        "𝚒",
      ],
      j: [
        "ј",
        "ϳ",
        "ⅉ",
        "𝐣",
        "𝑗",
        "𝒋",
        "𝒿",
        "𝓳",
        "𝔧",
        "𝕛",
        "𝖏",
        "𝗃",
        "𝗷",
        "𝘫",
        "𝙟",
        "𝚓",
      ],
      k: [
        "κ",
        "ķ",
        "ḱ",
        "ḳ",
        "ḵ",
        "ⲕ",
        "𝐤",
        "𝑘",
        "𝒌",
        "𝓀",
        "𝓴",
        "𝔨",
        "𝕜",
        "𝖐",
        "𝗄",
        "𝗸",
        "𝘬",
        "𝙠",
        "𝚔",
      ],
      l: [
        "ӏ",
        "ℓ",
        "ḷ",
        "ḹ",
        "ḻ",
        "ḽ",
        "ⅼ",
        "𝐥",
        "𝑙",
        "𝒍",
        "𝓁",
        "𝓵",
        "𝔩",
        "𝕝",
        "𝖑",
        "𝗅",
        "𝗹",
        "𝘭",
        "𝙡",
        "𝚕",
      ],
      m: [
        "м",
        "ⅿ",
        "ṁ",
        "ṃ",
        "ⲙ",
        "𝐦",
        "𝑚",
        "𝒎",
        "𝓂",
        "𝓶",
        "𝔪",
        "𝕞",
        "𝖒",
        "𝗆",
        "𝗺",
        "𝘮",
        "𝙢",
        "𝚖",
      ],
      n: [
        "ո",
        "ռ",
        "ṅ",
        "ṇ",
        "ṉ",
        "ṋ",
        "ⲛ",
        "𝐧",
        "𝑛",
        "𝒏",
        "𝓃",
        "𝓷",
        "𝔫",
        "𝕟",
        "𝖓",
        "𝗇",
        "𝗻",
        "𝘯",
        "𝙣",
        "𝚗",
      ],
      o: [
        "о",
        "ο",
        "օ",
        "ℴ",
        "ọ",
        "ỏ",
        "ố",
        "ồ",
        "ⲟ",
        "𝐨",
        "𝑜",
        "𝒐",
        "𝓸",
        "𝔬",
        "𝕠",
        "𝖔",
        "𝗈",
        "𝗼",
        "𝘰",
        "𝙤",
        "𝚘",
      ],
      p: [
        "р",
        "ρ",
        "ⲣ",
        "ṕ",
        "ṗ",
        "𝐩",
        "𝑝",
        "𝒑",
        "𝓅",
        "𝓹",
        "𝔭",
        "𝕡",
        "𝖕",
        "𝗉",
        "𝗽",
        "𝘱",
        "𝙥",
        "𝚙",
      ],
      q: [
        "ԛ",
        "գ",
        "𝐪",
        "𝑞",
        "𝒒",
        "𝓆",
        "𝓺",
        "𝔮",
        "𝕢",
        "𝖖",
        "𝗊",
        "𝗾",
        "𝘲",
        "𝙦",
        "𝚚",
      ],
      r: [
        "г",
        "ṙ",
        "ṛ",
        "ṝ",
        "ṟ",
        "ⲅ",
        "𝐫",
        "𝑟",
        "𝒓",
        "𝓇",
        "𝓻",
        "𝔯",
        "𝕣",
        "𝖗",
        "𝗋",
        "𝗿",
        "𝘳",
        "𝙧",
        "𝚛",
      ],
      s: [
        "ѕ",
        "ś",
        "ṡ",
        "ṣ",
        "ⲥ",
        "𝐬",
        "𝑠",
        "𝒔",
        "𝓈",
        "𝓼",
        "𝔰",
        "𝕤",
        "𝖘",
        "𝗌",
        "𝘀",
        "𝘴",
        "𝙨",
        "𝚜",
      ],
      t: [
        "τ",
        "ṫ",
        "ṭ",
        "ṯ",
        "ṱ",
        "ⲧ",
        "𝐭",
        "𝑡",
        "𝒕",
        "𝓉",
        "𝓽",
        "𝔱",
        "𝕥",
        "𝖙",
        "𝗍",
        "𝘁",
        "𝘵",
        "𝙩",
        "𝚝",
      ],
      u: [
        "υ",
        "ս",
        "ủ",
        "ụ",
        "ṳ",
        "ṵ",
        "ṷ",
        "𝐮",
        "𝑢",
        "𝒖",
        "𝓊",
        "𝓾",
        "𝔲",
        "𝕦",
        "𝖚",
        "𝗎",
        "𝘂",
        "𝘶",
        "𝙪",
        "𝚞",
      ],
      v: [
        "ν",
        "ѵ",
        "ṽ",
        "ṿ",
        "ⅴ",
        "ⲩ",
        "𝐯",
        "𝑣",
        "𝒗",
        "𝓋",
        "𝓿",
        "𝔳",
        "𝕧",
        "𝖛",
        "𝗏",
        "𝘃",
        "𝘷",
        "𝙫",
        "𝚟",
      ],
      w: [
        "ԝ",
        "ẁ",
        "ẃ",
        "ẅ",
        "ẇ",
        "ẉ",
        "ⱳ",
        "𝐰",
        "𝑤",
        "𝒘",
        "𝓌",
        "𝔀",
        "𝔴",
        "𝕨",
        "𝖜",
        "𝗐",
        "𝘄",
        "𝘸",
        "𝙬",
        "𝚠",
      ],
      x: [
        "х",
        "ҳ",
        "ẋ",
        "ẍ",
        "ⅹ",
        "𝐱",
        "𝑥",
        "𝒙",
        "𝓍",
        "𝔁",
        "𝔵",
        "𝕩",
        "𝖝",
        "𝗑",
        "𝘅",
        "𝘹",
        "𝙭",
        "𝚡",
      ],
      y: [
        "у",
        "ү",
        "ẏ",
        "ỳ",
        "ỵ",
        "ỷ",
        "ỹ",
        "ⲩ",
        "𝐲",
        "𝑦",
        "𝒚",
        "𝓎",
        "𝔂",
        "𝔶",
        "𝕪",
        "𝖞",
        "𝗒",
        "𝘆",
        "𝘺",
        "𝙮",
        "𝚢",
      ],
      z: [
        "ᴢ",
        "ż",
        "ẓ",
        "ẕ",
        "ⱬ",
        "ⲍ",
        "𝐳",
        "𝑧",
        "𝒛",
        "𝓏",
        "𝔃",
        "𝔷",
        "𝕫",
        "𝖟",
        "𝗓",
        "𝘇",
        "𝘻",
        "𝙯",
        "𝚣",
      ],
      // Uppercase
      A: [
        "А",
        "Α",
        "Ａ",
        "Ꭺ",
        "ᴀ",
        "𝐀",
        "𝐴",
        "𝑨",
        "𝒜",
        "𝓐",
        "𝔄",
        "𝔸",
        "𝕬",
        "𝖠",
        "𝗔",
        "𝘈",
        "𝘼",
        "𝙰",
      ],
      B: [
        "В",
        "Β",
        "ᴃ",
        "ᴮ",
        "ℬ",
        "Ᏼ",
        "𝐁",
        "𝐵",
        "𝑩",
        "𝓑",
        "𝔅",
        "𝔹",
        "𝕭",
        "𝖡",
        "𝗕",
        "𝘉",
        "𝘽",
        "𝙱",
      ],
      C: [
        "С",
        "Ϲ",
        "Ⅽ",
        "ℂ",
        "ℭ",
        "Ꮯ",
        "𝐂",
        "𝐶",
        "𝑪",
        "𝒞",
        "𝓒",
        "𝔆",
        "𝕮",
        "𝖢",
        "𝗖",
        "𝘊",
        "𝘾",
        "𝙲",
      ],
      E: [
        "Е",
        "Ε",
        "Ꭼ",
        "ℰ",
        "ℇ",
        "𝐄",
        "𝐸",
        "𝑬",
        "𝓔",
        "𝔈",
        "𝔼",
        "𝕰",
        "𝖤",
        "𝗘",
        "𝘌",
        "𝙀",
        "𝙴",
      ],
      H: [
        "Н",
        "Η",
        "ℋ",
        "ℌ",
        "ℍ",
        "Ꮋ",
        "𝐇",
        "𝐻",
        "𝑯",
        "𝓗",
        "𝔋",
        "𝕳",
        "𝖧",
        "𝗛",
        "𝘏",
        "𝙃",
        "𝙷",
      ],
      I: [
        "І",
        "Ι",
        "Ⅰ",
        "ℐ",
        "ℑ",
        "Ꮖ",
        "𝐈",
        "𝐼",
        "𝑰",
        "𝓘",
        "𝔌",
        "𝕀",
        "𝕴",
        "𝖨",
        "𝗜",
        "𝘐",
        "𝙄",
        "𝙸",
      ],
      M: [
        "М",
        "Μ",
        "Ⅿ",
        "ℳ",
        "Ꮇ",
        "𝐌",
        "𝑀",
        "𝑴",
        "𝓜",
        "𝔐",
        "𝕄",
        "𝕸",
        "𝖬",
        "𝗠",
        "𝘔",
        "𝙈",
        "𝙼",
      ],
      N: [
        "Ν",
        "ℕ",
        "Ꮑ",
        "𝐍",
        "𝑁",
        "𝑵",
        "𝒩",
        "𝓝",
        "𝔑",
        "𝕹",
        "𝖭",
        "𝗡",
        "𝘕",
        "𝙉",
        "𝙽",
      ],
      O: [
        "О",
        "Ο",
        "ⅇ",
        "𝐎",
        "𝑂",
        "𝑶",
        "𝒪",
        "𝓞",
        "𝔒",
        "𝕆",
        "𝕺",
        "𝖮",
        "𝗢",
        "𝘖",
        "𝙊",
        "𝙾",
      ],
      P: [
        "Р",
        "Ρ",
        "ℙ",
        "Ꮲ",
        "𝐏",
        "𝑃",
        "𝑷",
        "𝒫",
        "𝓟",
        "𝔓",
        "𝕻",
        "𝖯",
        "𝗣",
        "𝘗",
        "𝙋",
        "𝙿",
      ],
      S: [
        "Ѕ",
        "Ꮪ",
        "𝐒",
        "𝑆",
        "𝑺",
        "𝒮",
        "𝓢",
        "𝔖",
        "𝕊",
        "𝕾",
        "𝖲",
        "𝗦",
        "𝘚",
        "𝙎",
        "𝚂",
      ],
      T: [
        "Т",
        "Τ",
        "⊤",
        "Ꭲ",
        "𝐓",
        "𝑇",
        "𝑻",
        "𝒯",
        "𝓣",
        "𝔗",
        "𝕋",
        "𝕿",
        "𝖳",
        "𝗧",
        "𝘛",
        "𝙏",
        "𝚃",
      ],
      X: [
        "Х",
        "Χ",
        "ⅹ",
        "Ꭓ",
        "𝐗",
        "𝑋",
        "𝑿",
        "𝒳",
        "𝓧",
        "𝔛",
        "𝕏",
        "𝖃",
        "𝖷",
        "𝗫",
        "𝘟",
        "𝙓",
        "𝚇",
      ],
      Y: [
        "У",
        "Υ",
        "Ⲩ",
        "Ꭹ",
        "Ү",
        "𝐘",
        "𝑌",
        "𝒀",
        "𝒴",
        "𝓨",
        "𝔜",
        "𝕐",
        "𝖄",
        "𝖸",
        "𝗬",
        "𝘠",
        "𝙔",
        "𝚈",
      ],
      " ": [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "　"], // Various space characters
    };

    // COMBINING MARKS - znaki diakrytyczne do "chaosu"
    this.combiningMarks = {
      above: [
        "̀",
        "́",
        "̂",
        "̃",
        "̄",
        "̅",
        "̆",
        "̇",
        "̈",
        "̉",
        "̊",
        "̋",
        "̌",
        "̍",
        "̎",
        "̏",
        "̐",
        "̑",
        "̒",
        "̓",
        "̔",
        "̽",
        "̾",
        "̿",
        "̀",
        "́",
        "͂",
        "̓",
        "̈́",
        "͊",
        "͋",
        "͌",
        "̃",
        "̂",
        "̌",
        "͐",
        "̀",
        "́",
        "̋",
        "̏",
        "̒",
        "̓",
        "̔",
        "̽",
        "̉",
        "ͅ",
        "͆",
        "̚",
      ],
      below: [
        "̖",
        "̗",
        "̘",
        "̙",
        "̜",
        "̝",
        "̞",
        "̟",
        "̠",
        "̤",
        "̥",
        "̦",
        "̩",
        "̪",
        "̫",
        "̬",
        "̭",
        "̮",
        "̯",
        "̰",
        "̱",
        "̲",
        "̳",
        "̹",
        "̺",
        "̻",
        "̼",
        "ͅ",
        "͇",
        "͈",
        "͉",
        "͍",
        "͎",
        "͓",
        "͔",
        "͕",
        "͖",
        "͙",
        "͚",
        "̣",
      ],
      overlay: [
        "̴",
        "̵",
        "̶",
        "̷",
        "̸",
        "̡",
        "̢",
        "̧",
        "̨",
        "̴",
        "̵",
        "̶",
        "͏",
        "͜",
        "͝",
        "͞",
        "͟",
        "͠",
        "͢",
        "̸",
        "̷",
        "͡",
      ],
      enclosing: [
        "⃝",
        "⃞",
        "⃟",
        "⃠",
        "⃢",
        "⃣",
        "⃤",
        "⃥",
        "⃦",
        "⃧",
        "⃨",
        "⃩",
        "⃪",
        "⃫",
        "⃬",
        "⃭",
        "⃮",
        "⃯",
        "⃰",
      ],
    };

    // BIDIRECTIONAL OVERRIDE CHARACTERS
    this.bidirectional = {
      LRE: "\u202A", // Left-to-Right Embedding
      RLE: "\u202B", // Right-to-Left Embedding
      PDF: "\u202C", // Pop Directional Formatting
      LRO: "\u202D", // Left-to-Right Override
      RLO: "\u202E", // Right-to-Left Override
      LRI: "\u2066", // Left-to-Right Isolate
      RLI: "\u2067", // Right-to-Left Isolate
      FSI: "\u2068", // First Strong Isolate
      PDI: "\u2069", // Pop Directional Isolate
    };

    // WHITESPACE VARIETIES
    this.whitespaces = {
      SPACE: "\u0020", // Regular space
      NO_BREAK: "\u00A0", // Non-breaking space
      OGHAM: "\u1680", // Ogham space mark
      EN_QUAD: "\u2000", // En quad
      EM_QUAD: "\u2001", // Em quad
      EN_SPACE: "\u2002", // En space
      EM_SPACE: "\u2003", // Em space
      THREE_PER_EM: "\u2004", // Three-per-em space
      FOUR_PER_EM: "\u2005", // Four-per-em space
      SIX_PER_EM: "\u2006", // Six-per-em space
      FIGURE: "\u2007", // Figure space
      PUNCTUATION: "\u2008", // Punctuation space
      THIN: "\u2009", // Thin space
      HAIR: "\u200A", // Hair space
      ZERO_WIDTH: "\u200B", // Zero width space
      ZERO_WIDTH_NJ: "\u200C", // Zero width non-joiner
      ZERO_WIDTH_J: "\u200D", // Zero width joiner
      LINE_SEP: "\u2028", // Line separator
      PARA_SEP: "\u2029", // Paragraph separator
      NARROW_NO_BREAK: "\u202F", // Narrow no-break space
      MEDIUM_MATH: "\u205F", // Medium mathematical space
      IDEOGRAPHIC: "\u3000", // Ideographic space
    };

    // VARIATION SELECTORS
    this.variationSelectors = {
      VS1: "\uFE00",
      VS2: "\uFE01",
      VS3: "\uFE02",
      VS4: "\uFE03",
      VS5: "\uFE04",
      VS6: "\uFE05",
      VS7: "\uFE06",
      VS8: "\uFE07",
      VS9: "\uFE08",
      VS10: "\uFE09",
      VS11: "\uFE0A",
      VS12: "\uFE0B",
      VS13: "\uFE0C",
      VS14: "\uFE0D",
      VS15: "\uFE0E",
      VS16: "\uFE0F",
    };
  }

  // HOMOGLYPH SUBSTITUTION
  homoglyphEncode(text, secret) {
    let encoded = "";
    let secretBinary = this.textToBinary(secret);
    let secretIndex = 0;

    for (let char of text) {
      const lower = char.toLowerCase();
      if (this.homoglyphs[lower] && secretIndex < secretBinary.length) {
        // Use different homoglyph based on bit value
        const alternatives = this.homoglyphs[lower];
        const bitValue = parseInt(secretBinary[secretIndex]);
        const index = bitValue * Math.floor(alternatives.length / 2);
        encoded += alternatives[index] || char;
        secretIndex++;
      } else {
        encoded += char;
      }
    }

    return encoded;
  }

  // COMBINING MARKS CHAOS
  combiningMarksEncode(text, secret) {
    let encoded = "";
    let secretBinary = this.textToBinary(secret);
    let secretIndex = 0;

    for (let i = 0; i < text.length; i++) {
      encoded += text[i];

      // Add combining marks based on secret bits
      if (secretIndex < secretBinary.length) {
        const bit = secretBinary[secretIndex];
        if (bit === "1") {
          // Add random combining mark from above
          const marks = this.combiningMarks.above;
          encoded += marks[Math.floor(Math.random() * marks.length)];
        }
        secretIndex++;

        // Sometimes add below marks for extra chaos
        if (Math.random() > 0.7) {
          const belowMarks = this.combiningMarks.below;
          encoded += belowMarks[Math.floor(Math.random() * belowMarks.length)];
        }
      }
    }

    return encoded;
  }

  // BIDIRECTIONAL OVERRIDE
  bidirectionalEncode(text, secret) {
    // This can reverse text segments to hide messages
    let encoded = "";
    const words = text.split(" ");
    let secretBinary = this.textToBinary(secret);
    let secretIndex = 0;

    for (let word of words) {
      if (
        secretIndex < secretBinary.length &&
        secretBinary[secretIndex] === "1"
      ) {
        // Reverse this word using RLO
        encoded += this.bidirectional.RLO + word + this.bidirectional.PDF;
      } else {
        encoded += word;
      }
      encoded += " ";
      secretIndex++;
    }

    return encoded.trim();
  }

  // WHITESPACE ENCODING
  whitespaceEncode(text, secret) {
    let encoded = "";
    let secretBinary = this.textToBinary(secret);
    let secretIndex = 0;

    // Map 4 bits to different whitespace types
    const spaceMap = {
      "0000": this.whitespaces.SPACE,
      "0001": this.whitespaces.NO_BREAK,
      "0010": this.whitespaces.EN_SPACE,
      "0011": this.whitespaces.EM_SPACE,
      "0100": this.whitespaces.THIN,
      "0101": this.whitespaces.HAIR,
      "0110": this.whitespaces.FIGURE,
      "0111": this.whitespaces.PUNCTUATION,
      1000: this.whitespaces.THREE_PER_EM,
      1001: this.whitespaces.FOUR_PER_EM,
      1010: this.whitespaces.SIX_PER_EM,
      1011: this.whitespaces.NARROW_NO_BREAK,
      1100: this.whitespaces.MEDIUM_MATH,
      1101: this.whitespaces.IDEOGRAPHIC,
      1110: this.whitespaces.EN_QUAD,
      1111: this.whitespaces.EM_QUAD,
    };

    for (let i = 0; i < text.length; i++) {
      encoded += text[i];

      // Replace spaces with encoded versions
      if (text[i] === " " && secretIndex + 3 < secretBinary.length) {
        const fourBits = secretBinary.substr(secretIndex, 4);
        encoded =
          encoded.slice(0, -1) + (spaceMap[fourBits] || this.whitespaces.SPACE);
        secretIndex += 4;
      }
    }

    return encoded;
  }

  // VARIATION SELECTORS (for emoji)
  variationSelectorsEncode(text, secret) {
    let encoded = "";
    let secretBinary = this.textToBinary(secret);
    let secretIndex = 0;

    // Find emojis or symbols that can take variation selectors
    const emojiRegex = /[\u{1F000}-\u{1F9FF}]|[\u{2600}-\u{27BF}]/gu;
    let lastIndex = 0;
    let match;

    while ((match = emojiRegex.exec(text)) !== null) {
      // Add text before emoji
      encoded += text.slice(lastIndex, match.index);

      // Add emoji with variation selector based on secret
      encoded += match[0];
      if (secretIndex < secretBinary.length) {
        const nibble = secretBinary.substr(secretIndex, 4).padEnd(4, "0");
        const vsIndex = parseInt(nibble, 2);
        encoded += Object.values(this.variationSelectors)[vsIndex];
        secretIndex += 4;
      }

      lastIndex = emojiRegex.lastIndex;
    }

    // Add remaining text
    encoded += text.slice(lastIndex);

    return encoded;
  }

  // Helper functions
  textToBinary(text) {
    return text
      .split("")
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
      .join("");
  }

  binaryToText(binary) {
    const bytes = binary.match(/.{1,8}/g) || [];
    return bytes.map((byte) => String.fromCharCode(parseInt(byte, 2))).join("");
  }
}
