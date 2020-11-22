const {
    DuplicateError,
    NotFoundError,
    NoResultsError,
} = require('../utils/errors');
const { MusicItem } = require('./musicItem');

class MusicStore {
    constructor () {
        this.data = [];
        this.titleIndex = {};
    }

    add (title, artist) {
        if (this.titleIndex[title] !== undefined) {
            throw new DuplicateError(title);
        }
        const item = new MusicItem(title, artist);
        this.data.push(item);
        this.titleIndex[title] = item;
    }

    play (title) {
        const item = this.titleIndex[title];
        if (!item) {
            throw new NotFoundError('title');
        }

        item.played = true;
    }

    showAll () {
        return this.checkEmptyResultList(
            this.data.map(item => item.formatDetailed())
        );
    }

    showAllByArtist (artist) {
        let res = this.data
            .filter(item => item.artist === artist)
            .map(item => item.formatDetailed());

        return this.checkEmptyResultList(res);
    }

    showUnplayed () {
        let res = this.data
            .filter(item => !item.played)
            .map(item => item.format());

        return this.checkEmptyResultList(res);
    }

    showUnplayedByArtist (artist) {
        let res = this.data
            .filter(item => !item.played && item.artist === artist)
            .map(item => item.format());

        return this.checkEmptyResultList(res);
    }

    checkEmptyResultList (res) {
        if (res.length === 0) {
            throw new NoResultsError();
        }
        return res;
    }
}

module.exports = {
    MusicStore,
};
