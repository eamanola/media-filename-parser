const removeExtension = (filename, { replacement }) => {
  const extensions = [
    'mkv',
    'mp4',
    'avi',
    'm4v',
    'srt',
    'ass',
  ];

  const extensionRemoved = filename.replace(new RegExp(`\\.${extensions.join('|')}$`), replacement);

  return extensionRemoved;
};

const removeTags = (filename, { replacement }) => {
  const tagsRemoved = filename.replace(/\[[^\]]+\]/gi, replacement);

  return tagsRemoved;
};

const removeMeta = (filename, { replacement }) => {
  const metaRemoved = filename.replace(/\([^)]+\)/gi, replacement);

  return metaRemoved;
};

const removeSize = (filename, { replacement }) => {
  const sizeRemoved = filename.replace(/(?:720|1080)p/gi, replacement);

  return sizeRemoved;
};

const removeSource = (filename, { replacement }) => {
  const ripRemoved = filename.replace(/(?:hd|web|bd)rip/gi, replacement);

  const dlRemoved = ripRemoved.replace(/web-dl/gi, replacement);

  return dlRemoved;
};

const removeFileSize = (filename, { replacement }) => {
  const fileSizeRemoved = filename.replace(/\d+mb/gi, replacement);

  return fileSizeRemoved;
};

// Questionable
const removeKeywords = (filename, { replacement }) => {
  const keywords = [
    /Dual Audio/ig,
    /part \d+/ig,
  ];

  const keywordsRemoved = keywords.reduce(
    (currentValue, keyword) => currentValue.replace(keyword, replacement),
    filename,
  );

  return keywordsRemoved;
};

const removeCodecs = (filename, { replacement }) => {
  const codecs = [
    'x264',
    'x265',
    'hevc',
    'xvid',
    'aac5.1',
    'aac',
    'ac3.evo',
    'ac3',
    'flac',
    'bluray',
  ];

  const codecsRemoved = filename.replace(new RegExp(codecs.join('|'), 'gi'), replacement);

  return codecsRemoved;
};

const clean = (filename, { replacement = '' } = {}) => {
  const extensionRemoved = removeExtension(filename, { replacement });

  const tagsRemoved = removeTags(extensionRemoved, { replacement });

  const metaRemoved = removeMeta(tagsRemoved, { replacement });

  const sizeRemoved = removeSize(metaRemoved, { replacement });

  const sourceRemoved = removeSource(sizeRemoved, { replacement });

  const fileSizeRemoved = removeFileSize(sourceRemoved, { replacement });

  const codecsRemoved = removeCodecs(fileSizeRemoved, { replacement });

  const keywordsRemoved = removeKeywords(codecsRemoved, { replacement });

  return keywordsRemoved;
};

export default clean;
