const { MusicRepl } = require('./musicRepl');
const repl = require('repl');
const { NotFoundError, DuplicateError } = require('../utils/errors');

// create mock to prevent repl server
jest.createMockFromModule('repl').default;
repl.start = jest.fn(() => {
    return {
        on: jest.fn(),
    };
});

describe('MusicRepl', () => {
    let testRepl;
    let replOutputCbSpy;

    beforeEach(() => {
        testRepl = new MusicRepl();
        replOutputCbSpy = jest.fn();
    });

    it('add command prints correct message and calls store add', () => {
        const addSpy = jest.spyOn(testRepl.getStore(), 'add');
        testRepl.evaluator(
            'add "Likewise" "Frances Quinlan"',
            '',
            '',
            replOutputCbSpy
        );
        expect(replOutputCbSpy).toHaveBeenCalled();
        const [_, resp] = replOutputCbSpy.mock.calls[0];
        expect(resp).toBe('Added "Likewise" by Frances Quinlan');
        expect(addSpy).toHaveBeenCalled();
    });

    it('add command errors if title already exists', () => {
        const addSpy = jest
            .spyOn(testRepl.getStore(), 'add')
            .mockImplementation(() => {
                throw new DuplicateError('Give Up');
            });
        testRepl.evaluator(
            'add "Give Up" "The Postal Service"',
            '',
            '',
            replOutputCbSpy
        );
        expect(replOutputCbSpy).toHaveBeenCalled();
        const [_, resp] = replOutputCbSpy.mock.calls[0];
        expect(resp).toBe(`Title "Give Up" already exists!`);
    });

    it('play command prints correct message and calls store play', () => {
        const playSpy = jest.spyOn(testRepl.getStore(), 'play');
        testRepl.evaluator(
            'play "Sometimes I sit and Think, and Sometimes I Just Sit"',
            '',
            '',
            replOutputCbSpy
        );
        expect(replOutputCbSpy).toHaveBeenCalled();
        const [_, resp] = replOutputCbSpy.mock.calls[0];
        expect(resp).toBe(
            'You\'re listening to "Sometimes I sit and Think, and Sometimes I Just Sit"'
        );
        expect(playSpy).toHaveBeenCalled();
    });

    it('play command errors if title not found', () => {
        const playSpy = jest
            .spyOn(testRepl.getStore(), 'play')
            .mockImplementation(() => {
                throw new NotFoundError('title');
            });
        testRepl.evaluator(
            'play "Sometimes I sit and Think, and Sometimes I Just Sit"',
            '',
            '',
            replOutputCbSpy
        );
        expect(replOutputCbSpy).toHaveBeenCalled();
        const [_, resp] = replOutputCbSpy.mock.calls[0];
        expect(resp).toBe('Unable to find title');
    });

    it('show all calls correct store method', () => {
        const showAllSpy = jest.spyOn(testRepl.getStore(), 'showAll');
        testRepl.evaluator('show all', '', '', replOutputCbSpy);
        expect(replOutputCbSpy).toHaveBeenCalled();
        expect(showAllSpy).toHaveBeenCalled();
    });

    it('show all by artist calls correct store method and passes artist', () => {
        const showAllByArtistSpy = jest.spyOn(
            testRepl.getStore(),
            'showAllByArtist'
        );
        testRepl.evaluator('show all by "Mitski"', '', '', replOutputCbSpy);
        expect(replOutputCbSpy).toHaveBeenCalled();
        expect(showAllByArtistSpy).toHaveBeenCalled();
        const [artist] = showAllByArtistSpy.mock.calls[0];
        expect(artist).toBe('Mitski');
    });

    it('show unplayed calls correct store method', () => {
        const showUnplayedSpy = jest.spyOn(testRepl.getStore(), 'showUnplayed');
        testRepl.evaluator('show unplayed', '', '', replOutputCbSpy);
        expect(replOutputCbSpy).toHaveBeenCalled();
        expect(showUnplayedSpy).toHaveBeenCalled();
    });

    it('show unplayed by artist calls correct store method and passes artist', () => {
        const showUnplayedByArtistSpy = jest.spyOn(
            testRepl.getStore(),
            'showUnplayedByArtist'
        );
        testRepl.evaluator(
            'show unplayed by "Dirty Projectors"',
            '',
            '',
            replOutputCbSpy
        );
        expect(replOutputCbSpy).toHaveBeenCalled();
        expect(showUnplayedByArtistSpy).toHaveBeenCalled();
    });

    it('prints error on unrecognized input', () => {
        testRepl.evaluator('what is love?', '', '', replOutputCbSpy);
        expect(replOutputCbSpy).toHaveBeenCalledWith(
            null,
            'Uh-oh! Unable to parse input. You wrote: what is love?'
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
});
