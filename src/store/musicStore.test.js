const {
    DuplicateError,
    NotFoundError,
    NoResultsError,
} = require('../utils/errors');
const { MusicStore, MusicItem } = require('./musicStore');

describe('MusicStore', () => {
    let store;

    beforeEach(() => {
        store = new MusicStore();
    });
    it('adds new unplayed item to store', () => {
        store.add('Lemons', 'Nick Leng');
        let item = store.data[0];
        expect(item.title).toBe('Lemons');
        expect(item.artist).toBe('Nick Leng');
        expect(item.played).toBe(false);

        expect(item).toBe(store.titleIndex['Lemons']);
    });
    it('throws error when adding title already in store', () => {
        store.add('Lemons', 'Nick Leng');

        expect(() => store.add('Lemons', 'Nick Leng')).toThrow(DuplicateError);
    });

    it('adds new unplayed item to store', () => {
        store.add('Alien Lanes', 'Guided By Voices');
        store.play('Alien Lanes');
        expect(store.titleIndex['Alien Lanes'].played).toBe(true);
    });
    it('throws error when adding title already in store', () => {
        expect(() => store.play('Alien Lanes')).toThrow(NotFoundError);
    });

    it('shows all items with play state', () => {
        store.add('Lemons', 'Nick Leng');
        store.add('Abracadabra', 'Jerry Paper');
        expect(store.showAll()).toEqual([
            '"Lemons" by Nick Leng (unplayed)',
            '"Abracadabra" by Jerry Paper (unplayed)',
        ]);
        store.play('Lemons');
        expect(store.showAll()).toEqual([
            '"Lemons" by Nick Leng (played)',
            '"Abracadabra" by Jerry Paper (unplayed)',
        ]);
    });

    it('showAllByArtist shows filtered list', () => {
        store.add('Ga Ga Ga Ga Ga', 'Spoon');
        store.add('Lemons', 'Nick Leng');
        store.add('They Want My Soul', 'Spoon');
        store.add('Abracadabra', 'Jerry Paper');
        expect(store.showAllByArtist('Spoon')).toEqual([
            '"Ga Ga Ga Ga Ga" by Spoon (unplayed)',
            '"They Want My Soul" by Spoon (unplayed)',
        ]);
    });

    it('showUnplayed shows filtered list', () => {
        store.add('Ga Ga Ga Ga Ga', 'Spoon');
        store.add('Lemons', 'Nick Leng');
        store.add('They Want My Soul', 'Spoon');
        store.add('Abracadabra', 'Jerry Paper');
        store.play('Ga Ga Ga Ga Ga');
        store.play('Lemons');
        expect(store.showUnplayed()).toEqual([
            '"They Want My Soul" by Spoon',
            '"Abracadabra" by Jerry Paper',
        ]);
    });

    it('showUnplayedByArtist shows filtered list', () => {
        store.add('Ga Ga Ga Ga Ga', 'Spoon');
        store.add('Lemons', 'Nick Leng');
        store.add('They Want My Soul', 'Spoon');
        store.add('Abracadabra', 'Jerry Paper');
        store.play('Ga Ga Ga Ga Ga');
        store.play('Lemons');
        expect(store.showUnplayedByArtist('Spoon')).toEqual([
            '"They Want My Soul" by Spoon',
        ]);
    });

    it('checkEmptyResultList throws error if passed empty list', () => {
        let list = [1, 2, 3];
        expect(store.checkEmptyResultList(list)).toBe(list);
        expect(() => store.checkEmptyResultList([])).toThrow(NoResultsError);
    });
});
