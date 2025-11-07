#!/usr/bin/env ts-node
import fs from 'fs';
import path from 'path';

function die(msg: string): never {
  console.error(msg);
  process.exit(1);
}

const [, , slugArg, titleArg] = process.argv;
if (!slugArg || !titleArg) {
  die('Usage: ts-node scripts/new-experiment.ts <slug> "Title"');
}

const slug = slugArg.trim();
const title = titleArg.trim();

const root = path.resolve(__dirname, '..');
const experimentsDir = path.join(root, 'src', 'experiments', slug);
const registryPath = path.join(root, 'src', 'experiments', 'registry.ts');

if (!fs.existsSync(registryPath)) die(`Cannot find registry at ${registryPath}`);

if (fs.existsSync(experimentsDir)) die(`Experiment already exists: ${experimentsDir}`);
fs.mkdirSync(experimentsDir, { recursive: true });

const screenPath = path.join(experimentsDir, 'Screen.tsx');
fs.writeFileSync(
  screenPath,
  `import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function Screen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>${title}</Text>
    </View>
  );
}

export default Screen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '700' },
});
`
);

let registry = fs.readFileSync(registryPath, 'utf8');

const importNeedle = '// @experiments-import';
const listNeedle = '// @experiments-list';

if (!registry.includes(importNeedle) || !registry.includes(listNeedle)) {
  die('Registry is missing insertion markers.');
}

const importLine = `import { Screen as ${camel(slug)}Screen } from './${slug}/Screen';`;
registry = registry.replace(importNeedle, `${importNeedle}\n${importLine}`);

const listEntry = `  { slug: '${slug}', title: '${title}', Screen: ${camel(slug)}Screen },`;
registry = registry.replace(listNeedle, `${listNeedle}\n${listEntry}`);

fs.writeFileSync(registryPath, registry);

console.log(`Created experiment: ${slug}`);

function camel(s: string) {
  return s
    .split(/[-_\s]+/)
    .map((p, i) => (i === 0 ? p : p.charAt(0).toUpperCase() + p.slice(1)))
    .join('')
    .replace(/[^a-zA-Z0-9]/g, '');
}
