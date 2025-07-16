exports.cleanReplyText = (text) => {
  return text
    .replace(/^["']|["']$/g, '')       // Remove surrounding quotes
    .replace(/\\n|\/n|\\\\|\\/g, '')   // Remove \n, /n, \\, \
    .replace(/\s{2,}/g, ' ')           // Normalize multiple spaces
    .trim();
};
