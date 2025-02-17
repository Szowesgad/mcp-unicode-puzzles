export class TemplateEngine {
  constructor() {
    this.templates = {
      quantum: {
        name: 'quantum',
        prefix: '【𝚀𝚄𝙰𝙽𝚃𝚄𝙼】',
        patterns: {
          easy: {
            opening: '∎',
            closing: '∎',
            separator: '⠀', // Unicode space
            noiseChance: 0.1
          },
          medium: {
            opening: '∎∎',
            closing: '∎∎',
            separator: '⠀',
            noiseChance: 0.3
          },
          hard: {
            opening: '∎∎∎',
            closing: '∎∎∎',
            separator: '⠀',
            noiseChance: 0.5
          }
        },
        quantumChars: ['α', 'β', 'γ', 'δ', 'ψ', 'Ψ', 'Φ', 'ℏ', '∞'],
        description: 'Quantum superposition encoding with variable noise'
      },
      
      orbital: {
        name: 'orbital',
        prefix: '◉',
        patterns: {
          easy: {
            opening: '◯',
            closing: '◯',
            separator: '·',
            rotationSteps: 4
          },
          medium: {
            opening: '◐',
            closing: '◑',
            separator: '∘',
            rotationSteps: 8
          },
          hard: {
            opening: '◒',
            closing: '◓',
            separator: '⋅',
            rotationSteps: 12
          }
        },
        orbitalChars: ['⌾', '☉', '⊕', '⊗', '⊙', '◎', '⚪', '⚫'],
        description: 'Circular pattern encoding with orbital mechanics'
      },
      
      glitch: {
        name: 'glitch',
        prefix: '[ERR0R]',
        patterns: {
          easy: {
            opening: '█',
            closing: '█',
            separator: ' ',
            glitchIntensity: 0.2
          },
          medium: {
            opening: '▓▒',
            closing: '▒▓',
            separator: '',
            glitchIntensity: 0.4
          },
          hard: {
            opening: '▓▒░',
            closing: '░▒▓',
            separator: '',
            glitchIntensity: 0.6
          }
        },
        glitchChars: ['░', '▒', '▓', '█', '☐', '☑', '☒', '✓', '✗'],
        description: 'Glitch-based encoding with visual noise'
      },
      
      void: {
        name: 'void',
        prefix: '✧･ﾟ:*',
        patterns: {
          easy: {
            opening: '⋆',
            closing: '⋆',
            separator: ' ',
            constellationSize: 3
          },
          medium: {
            opening: '⋆⋆',
            closing: '⋆⋆',
            separator: '･',
            constellationSize: 5
          },
          hard: {
            opening: '⋆⋆⋆',
            closing: '⋆⋆⋆',
            separator: '⋆',
            constellationSize: 7
          }
        },
        spaceChars: ['✧', '✦', '★', '☆', '✯', '✩', '✫', '✬', '✭'],
        description: 'Space-themed encoding with constellation patterns'
      }
    };
  }

  getTemplate(name, difficulty = 'medium') {
    const template = this.templates[name];
    if (!template) {
      throw new Error(`Template '${name}' not found`);
    }

    const pattern = template.patterns[difficulty];
    if (!pattern) {
      throw new Error(`Difficulty '${difficulty}' not found for template '${name}'`);
    }

    return {
      ...template,
      pattern,
      difficulty
    };
  }

  generatePattern(template, length, options = {}) {
    const { name, pattern } = template;
    let result = '';

    switch (name) {
      case 'quantum':
        result = this.generateQuantumPattern(pattern, length, options);
        break;
      case 'orbital':
        result = this.generateOrbitalPattern(pattern, length, options);
        break;
      case 'glitch':
        result = this.generateGlitchPattern(pattern, length, options);
        break;
      case 'void':
        result = this.generateVoidPattern(pattern, length, options);
        break;
      default:
        throw new Error(`Unknown template type: ${name}`);
    }

    return result;
  }

  generateQuantumPattern(pattern, length, { seed = Math.random() } = {}) {
    let result = pattern.opening;
    const template = this.templates.quantum;

    for (let i = 0; i < length; i++) {
      // Add content character
      result += pattern.separator;

      // Add quantum noise based on difficulty
      if (Math.random() < pattern.noiseChance) {
        const quantumChar = template.quantumChars[
          Math.floor(Math.random() * template.quantumChars.length)
        ];
        result += quantumChar;
      }
    }

    return result + pattern.closing;
  }

  generateOrbitalPattern(pattern, length, { rotation = 0 } = {}) {
    let result = pattern.opening;
    const template = this.templates.orbital;
    const stepSize = (2 * Math.PI) / pattern.rotationSteps;

    for (let i = 0; i < length; i++) {
      // Calculate orbital position
      const angle = (rotation + i) * stepSize;
      const orbitalIndex = Math.floor((angle / (2 * Math.PI)) * template.orbitalChars.length);
      const orbitalChar = template.orbitalChars[orbitalIndex % template.orbitalChars.length];

      result += pattern.separator + orbitalChar;
    }

    return result + pattern.closing;
  }

  generateGlitchPattern(pattern, length, { intensity = 1.0 } = {}) {
    let result = pattern.opening;
    const template = this.templates.glitch;
    const effectiveIntensity = pattern.glitchIntensity * intensity;

    for (let i = 0; i < length; i++) {
      result += pattern.separator;

      // Add glitch artifacts based on intensity
      if (Math.random() < effectiveIntensity) {
        const glitchLength = Math.floor(Math.random() * 3) + 1;
        for (let j = 0; j < glitchLength; j++) {
          const glitchChar = template.glitchChars[
            Math.floor(Math.random() * template.glitchChars.length)
          ];
          result += glitchChar;
        }
      }
    }

    return result + pattern.closing;
  }

  generateVoidPattern(pattern, length, { constellation = [] } = {}) {
    let result = pattern.opening;
    const template = this.templates.void;

    // Create constellation pattern
    const constellationPoints = constellation.length > 0 ? 
      constellation : 
      this.generateConstellation(pattern.constellationSize);

    for (let i = 0; i < length; i++) {
      result += pattern.separator;

      // Add space characters at constellation points
      if (constellationPoints.includes(i)) {
        const spaceChar = template.spaceChars[
          Math.floor(Math.random() * template.spaceChars.length)
        ];
        result += spaceChar;
      }
    }

    return result + pattern.closing;
  }

  generateConstellation(size) {
    const points = new Set();
    while (points.size < size) {
      points.add(Math.floor(Math.random() * size * 2));
    }
    return Array.from(points).sort((a, b) => a - b);
  }

  // MCP Memory Integration
  async saveToMemory(mcpMemory) {
    const timestamp = new Date().toISOString();

    // Store template metadata
    for (const [name, template] of Object.entries(this.templates)) {
      await mcpMemory.create_entities([{
        name: `template_${name}_${timestamp}`,
        entityType: 'PuzzleTemplate',
        observations: [
          `Name: ${name}`,
          `Description: ${template.description}`,
          `Prefix: ${template.prefix}`,
          `Available Difficulties: ${Object.keys(template.patterns).join(', ')}`
        ]
      }]);
    }

    // Log template usage statistics if needed
  }

  listTemplates() {
    return Object.entries(this.templates).map(([name, template]) => ({
      name,
      description: template.description,
      difficulties: Object.keys(template.patterns)
    }));
  }
}