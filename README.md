# Music Library

A CLI to manage\* all your tunes!

\*disclaimer: this is a programing exercise that will not persist your tunage between runs

## Requirements

node v14.15.1, npm v6.14.8

## Installation

After installing node and npm, install the cli tool by running:

```
cd music # cd into this repository
npm run installGlobal
```

`music` is now available on your commandline! Kick it off by running `music` in your CLI

If you don't wish to make the `music` command available everywhere, instead run:

```
cd music # cd into this repository
npm i
npm run start
```

## Usage

-   add "$title" "$artist": adds an album to the collection with the given title and artist. All albums are unplayed by default.
-   play "$title": marks a given album as played.
-   show all: displays all of the albums in the collection
-   show unplayed: display all of the albums that are unplayed
-   show all by "$artist": shows all of the albums in the collection by the given artist
-   show unplayed by "$artist": shows the unplayed albums in the collection by the given artist
-   quit: quits the program

## Tests

```
npm run tests
```
