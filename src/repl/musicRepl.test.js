const { MusicRepl } = require('./musicRepl');
const repl = require('repl');

// create mock to prevent repl server
jest.createMockFromModule('repl').default;
repl.start = jest.fn(() => {
    return {
        on: jest.fn(),
    };
});

describe('MusicRepl', () => {
    let testRepl;

    beforeAll(() => {
        testRepl = new MusicRepl({
            prompt: '>',
        });
    });

    it('add command prints correct message and calls store add', async () => {
        replOutputCbSpy = jest.fn();
        addSpy = jest.spyOn(testRepl.getStore(), 'add');
        testRepl.evaluator('add', '', '', replOutputCbSpy);
        expect(replOutputCbSpy).toHaveBeenCalled();
        const [_, resp] = replOutputCbSpy.mock.calls[0];
        expect(resp).toMatch(/Added/i);
        expect(addSpy).toHaveBeenCalled();
    });

    it('prints error on unrecognized input', async () => {
        callbackSpy = jest.fn();
        testRepl.evaluator('what is love?', '', '', callbackSpy);
        expect(callbackSpy).toHaveBeenCalledWith(
            null,
            'Uh-oh! Unable to parse input. You wrote: what is love?'
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
});
