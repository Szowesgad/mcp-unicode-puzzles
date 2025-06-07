# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- Start development server: `npm run dev`
- Start production server: `npm start`
- Run tests: `npm test`
- Lint code: `npm run lint`

### Testing
- Run all tests: `npm test`
- Run specific test: `npm test -- path/to/test.spec.js`
- Run tests in watch mode: `npm test -- --watch`

## Architecture Overview

### Core Components

**MCP Server (`src/server/index.js`)**
- Main entry point that orchestrates all server functionality
- Routes handle puzzle creation/decoding, steganography operations, and character lookups
- Integrates with MCP memory system for persistence

**StegoPuzzleManager (`src/steganography/manager.js`)**
- Core steganography engine using zero-width Unicode characters
- Implements three encoding methods: binary (ZWSP/ZWNJ), trinary (ZWSP/ZWNJ/ZWJ), and random noise
- Difficulty levels control noise insertion patterns

**SymblConnector (`src/integrations/symbl.js`)**
- Interfaces with symbl.cc for Unicode character discovery
- Implements rate limiting (100 req/min) and caching
- Categorizes characters by type (zeroWidth, quantum, special)

**TemplateEngine (`src/templates/engine.js`)**
- Manages four themed puzzle templates: Quantum, Orbital, Glitch, Void
- Each template has unique visual patterns and encoding strategies
- Templates are applied after steganographic encoding

### Data Flow

1. **Puzzle Creation**: Request → Template Selection → Message Encoding → Template Formatting → Memory Storage
2. **Puzzle Decoding**: Encoded Text → Template Stripping → Zero-Width Extraction → Binary Decoding → Secret Revealed

### Key Patterns
- All modules use ES6 imports and async/await
- Zero-width characters are the foundation of the steganography system
- Templates provide thematic wrappers around the encoded content
- MCP memory integration stores puzzle metadata