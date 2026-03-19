const secretKeys = [
  'VITE_EVENT_ADDRESS',
  'VITE_EVENT_CONTACT_EMAIL',
  'VITE_EVENT_CONTACT_PHONE'
];

function maskValue(value) {
  if (!value) return '(not set)';
  if (value.length <= 4) return `${'*'.repeat(value.length)} (len=${value.length})`;
  return `${value.slice(0, 2)}${'*'.repeat(Math.max(4, value.length - 4))}${value.slice(-2)} (len=${value.length})`;
}

console.log('Deploy env diagnostics (masked):');

for (const key of secretKeys) {
  const value = process.env[key] ?? '';
  const status = value ? 'set' : 'missing';
  console.log(`${key}: ${status} | ${maskValue(value)}`);
}
