# media-filename-parser
Extracts media information from filename

* Title

* Season

* Episode

* Special episodes (nced, ncop, extra, oad)

* Year

Feel free to add your cases to ./src/test-names.json

## install

```
npm i media-filename-parser

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
