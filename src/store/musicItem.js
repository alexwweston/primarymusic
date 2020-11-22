class MusicItem {
    constructor (title, artist) {
        this.title = title;
        this.artist = artist;
        this.played = false;
    }

    format () {
        const { title, artist } = this;
        return `"${title}" by ${artist}`;
    }

    formatDetailed () {
        const { title, artist, played } = this;
        return `"${title}" by ${artist} (${played ? '' : 'un'}played)`;
    }
}

module.exports = {
    MusicItem,
};
