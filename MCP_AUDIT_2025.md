# MCP Projects Audit - June 2025

## 🟢 Active & Working Projects

### 1. **unicode-puzzles-mcp** ✅
- **Status**: Working (tested)
- **Purpose**: Steganography puzzles using Unicode zero-width characters
- **Dependencies**: @mcp/core 1.0.0
- **Use cases**: LinkedIn formatting bypass, hidden messages, CTF puzzles
- **Created**: February 2025

### 2. **Official MCP Servers** (v0.6.2) ✅
Located in `/servers/src/`:
- `brave-search` - SDK 1.0.1
- `filesystem` - SDK 0.5.0 ⚠️ (older)
- `github` - SDK 1.0.1
- `memory` - SDK 1.0.1
- `puppeteer` - SDK 1.0.1
- `sequentialthinking` - SDK 0.5.0 ⚠️ (older)
- `slack`, `sqlite`, `time`, etc.

## 🟡 Projects Needing Review

### 3. **mcp-cli**
- **Status**: Python-based CLI tool
- **Author**: Chris Hay
- **Dependencies**: anthropic, openai, ollama, rich
- **Purpose**: CLI for MCP interactions
- **Note**: Requires Python 3.12+

### 4. **all-in-one-model-context-protocol** (Go)
- **Status**: Ambitious multi-service integration
- **Dependencies**: mcp-go v0.6.0
- **Integrations**: Atlassian, GitLab, Google APIs, OpenAI
- **Note**: Very comprehensive but complex

## 🔴 Dead/Empty Projects

### 5. **brave_rag**
- **Status**: Empty setup.py and README
- **Verdict**: Remove or rebuild

## 📁 Memory Systems

### 6. **claude_memory** vs **claude_memory_old**
- Duplicate folders with conversation history
- Contains semgrep analyzers and context organizers
- **Action needed**: Merge and deduplicate

## 📊 Statistics
- **Total MCP-related projects**: 20+
- **Working/Active**: 8-10
- **Need updates**: 3-4
- **Dead code**: 2-3

## 🎯 Recommended Actions

1. **Update SDK versions** - Some servers use 0.5.0 instead of 1.0.1
2. **Clean duplicates** - Merge claude_memory folders
3. **Remove dead code** - brave_rag seems abandoned
4. **Document active projects** - Create proper README for each
5. **Test Go project** - Verify if all-in-one still compiles

## 🚀 Highlights

- **Zero-day MCP adopters** - Started November 2024
- **unicode-puzzles-mcp** - Unique use case, production-ready
- **Strong foundation** - Official servers + custom implementations

---
Generated: June 7, 2025