const removeExtension = (filename) => {
  const extensions = [
    'mkv',
    'mp4',
    'avi',
    'm4v',
    'srt',
    'ass',
  ];

  const extensionRemoved = filename.replace(new RegExp(`\\.${extensions.join('|')}$`), '');

  return extensionRemoved;
};

const removeTags = (filename) => {
  const tagsRemoved = filename.replace(/\[[^\]]+\]/gi, '');

  return tagsRemoved;
};

const removeMeta = (filename) => {
  const metaRemoved = filename.replace(/\([^)]+\)/gi, '');

  return metaRemoved;
};

const removeSize = (filename) => {
  const sizeRemoved = filename.replace(/(?:720|1080)p/gi, '');

  return sizeRemoved;
};

const removeSource = (filename) => {
  const ripRemoved = filename.replace(/(?:hd|web|bd)rip/gi, '');

  const dlRemoved = ripRemoved.replace(/web-dl/gi, '');

  return dlRemoved;
};

const removeKeywords = (filename) => {
  const keywords = [
    'Dual Audio',
  ];

  const keywordsRemoved = filename.replace(new RegExp(keywords.join('|'), 'gi'), '');

  return keywordsRemoved;
};

const removeFileSize = (filename) => {
  const fileSizeRemoved = filename.replace(/\d+mb/gi, '');

  return fileSizeRemoved;
};

const removeCodecs = (filename) => {
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

  const codecsRemoved = filename.replace(new RegExp(codecs.join('|'), 'gi'), '');

  return codecsRemoved;
};

const clean = (filename) => {
  const extensionRemoved = removeExtension(filename);

  const tagsRemoved = removeTags(extensionRemoved);

  const metaRemoved = removeMeta(tagsRemoved);

  const sizeRemoved = removeSize(metaRemoved);

  const sourceRemoved = removeSource(sizeRemoved);

  const fileSizeRemoved = removeFileSize(sourceRemoved);

  const codecsRemoved = removeCodecs(fileSizeRemoved);

  const keywordsRemoved = removeKeywords(codecsRemoved);

  return keywordsRemoved;
};

export default clean;
