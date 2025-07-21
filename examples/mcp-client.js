#!/usr/bin/env node
/**
 * Example of using unicode-puzzles-mcp as an MCP client
 * This shows how Claude Desktop or other MCP clients would interact
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { spawn } from 'child_process';

async function main() {
  console.log('🔌 Connecting to Unicode Puzzles MCP Server...\n');
  
  // Spawn the MCP server
  const serverProcess = spawn('node', ['../src/server/index.js'], {
    stdio: ['pipe', 'pipe', 'pipe']
  });
  
  // Create transport and client
  const transport = new StdioClientTransport({
    stdin: serverProcess.stdout,
    stdout: serverProcess.stdin,
    stderr: serverProcess.stderr
  });
  
  const client = new Client({
    name: 'unicode-puzzles-client',
    version: '1.0.0'
  }, {
    capabilities: {}
  });
  
  // Connect to server
  await client.connect(transport);
  console.log('✅ Connected to MCP server!\n');
  
  // List available tools
  console.log('📋 Available Tools:');
  const tools = await client.listTools();
  tools.tools.forEach(tool => {
    console.log(`- ${tool.name}: ${tool.description}`);
  });
  
  // Example 1: Create a puzzle
  console.log('\n🎯 Creating a Quantum Puzzle...');
  const puzzleResult = await client.callTool('create_puzzle', {
    template: 'quantum',
    message: 'System breach detected',
    secret: 'Access code: DELTA-7-ALPHA',
    difficulty: 'hard'
  });
  
  const puzzleData = JSON.parse(puzzleResult.content[0].text);
  console.log('Created:', puzzleData.puzzle);
  
  // Example 2: List templates
  console.log('\n📚 Available Templates:');
  const templatesResult = await client.callTool('list_templates', {});
  const templates = JSON.parse(templatesResult.content[0].text);
  console.log(templates);
  
  // Example 3: Search for zero-width characters
  console.log('\n🔍 Zero-Width Characters:');
  const zwResult = await client.callTool('get_zero_width_chars', {});
  const zwChars = JSON.parse(zwResult.content[0].text);
  console.log('Found', zwChars.chars.length, 'zero-width characters');
  
  // Cleanup
  await client.close();
  serverProcess.kill();
  console.log('\n👋 Disconnected from server');
}

main().catch(console.error);