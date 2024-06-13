const replaceExtension = (filename, replacement) => filename
  .replace(/\.(?:mkv|mp4|avi|m4v|srt|ass)$/, replacement);

const replaceTags = (filename, replacement) => filename
  .replace(/\[[^\]]+\]/gi, replacement);

const replaceMeta = (filename, replacement) => filename
  .replace(/\([^)]+\)/gi, replacement);

const replaceRes = (filename, replacement) => filename
  .replace(/(?:720|1080)p/gi, replacement);

const replaceSource = (filename, replacement) => filename
  .replace(/(?:hd|web|bd)rip/gi, replacement)
  .replace(/web-dl/gi, replacement)
  .replace(/bluray/gi, replacement);

const replaceFileSize = (filename, replacement) => filename
  .replace(/\d+mb/gi, replacement);

const replaceCodecs = (filename, replacement) => filename
  .replace(/x264|x265|hevc|xvid|aac5.1|aac|ac3\.evo|ac3|flac/ig, replacement);

// Questionable
// const replaceKeywords = (filename, replacement) => {
//   const keywords = [
//     /Dual Audio/ig,
//   ];

//   const keywordsReplaced = keywords.reduce(
//     (currentValue, keyword) => currentValue.replace(keyword, replacement),
//     filename,
//   );

//   return keywordsReplaced;
// };

const replacePart = (filename, replacement) => filename
  .replace(/part \d+/ig, replacement);

const trimSpecialChars = (filename, replacement) => filename
  .replace(/^[^a-zA-Z0-9]*/, replacement)
  .replace(/[^a-zA-Z0-9]*$/, replacement);

const clean = (filename, { replacement = '' } = {}) => {
  const extensionReplaced = replaceExtension(filename, replacement);

  const tagsReplaced = replaceTags(extensionReplaced, replacement);

  const metaReplaced = replaceMeta(tagsReplaced, replacement);

  const sizeReplaced = replaceRes(metaReplaced, replacement);

  const sourceReplaced = replaceSource(sizeReplaced, replacement);

  const fileSizeReplaced = replaceFileSize(sourceReplaced, replacement);

  const codecsReplaced = replaceCodecs(fileSizeReplaced, replacement);

  return codecsReplaced;
};

export {
  replacePart,
  trimSpecialChars,
};

export default clean;
