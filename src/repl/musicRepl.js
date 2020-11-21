const repl = require('repl');
const { MusicStore } = require('../store/musicStore');

class MusicRepl {
    /**
     *
     * @param {Object} replOpts https://nodejs.org/dist/latest-v14.x/docs/api/repl.html#repl_repl_start_options
     */
    constructor (replOpts) {
        console.log('Welcome to your music collection!');

        const opts = {
            ...replOpts,
            eval: this.evaluator.bind(this),
        };
        this.replServer = repl.start(opts);
        // handle cmd+D/cmd+C exits
        this.replServer.on('exit', this.exit);
        this.store = new MusicStore();
    }

    getStore () {
        return this.store;
    }

    exit () {
        console.log('Bye!');
        process.exit();
    }

    evaluator (input, context, filename, callback) {
        let response;
        let cmd = input.trim(); // TODO real parsin
        switch (cmd) {
            case 'quit':
                this.exit();
                break;
            case 'add':
                this.store.add();
                response = 'Added';
                break;
            default:
                response = `Uh-oh! Unable to parse input. You wrote: ${cmd}`;
        }
        callback(null, response);
    }
}

module.exports = {
    MusicRepl,
};
