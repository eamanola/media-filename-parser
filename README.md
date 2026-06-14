# media-filename-parser

A path parser to extracts, and guess information from media file path.

Files names come in all types and forms. Simple `my show/S01E01.mp4` format would work, but many other variations exist, such as `my.show.Season.1.1080.hevc.2026/01.mp4`

Changing all file names can be tedious work.

There is of cource, the embedded media information, but they are often unreliable, if not out right ads.

This library tries to extract the information from the file path, instead of relying on meta data.

## Informatio extracted

### Title

title of the show

### Season

season number

### Episode

- Special episodes information, such as: nced, ncop, extra, oad
- episode number

### Year

year information

## help wanted

If any information extracted is incorrect, please add a new case to ./src/test-names.json

## install

```
(p)npm i media-filename-parser
```

## example use

```
import {
  episode as getEpisode,
  season as getSeason,
  title as getTitle,
} from 'media-filename-parser';

const fileName = "NieR Automata Ver1.1a S01 1080p Dual Audio WEBRip DD+ x265-EMBER/S01E01-or not to [B]e [268B933B].mkv";
const title = getTitle(fileName); // NieR Automata Ver1 1a
const season = getSeason(fileName); // 1
const { episode } = getEpisode(fileName); // 1
...
```
