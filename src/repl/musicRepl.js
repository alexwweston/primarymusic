const repl = require('repl');
const { MusicStore } = require('../store/musicStore');

const cmd_regex = {
    add: /^add "(.*)" "(.*)"$/,
    play: /^play "(.*)"$/,
    showAll: /^show all$/,
    showAllBy: /^show all by "(.*)"$/,
    showUnplayed: /^show unplayed$/,
    showUnplayedBy: /^show unplayed by "(.*)"$/,
};

class MusicRepl {
    constructor () {
        console.log('Welcome to your music collection!');

        const opts = {
            prompt: '>',
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
        let cmd = input.trim();

        if (cmd === 'quit') {
            this.exit();
        } else if (cmd_regex.add.test(cmd)) {
            // add command
            const match = cmd.match(cmd_regex.add);
            this.store.add(match[1], match[2]);
            response = `Added \"${match[1]}\" by ${match[2]}`;
        } else if (cmd_regex.play.test(cmd)) {
            // play command
            const match = cmd.match(cmd_regex.play);
            this.store.play(match[1]);
            response = `You\'re listening to \"${match[1]}\"`;
        } else if (cmd_regex.showAll.test(cmd)) {
            // show all command
            const resList = this.store.showAll();
            response = resList.join('\n');
        } else if (cmd_regex.showAllBy.test(cmd)) {
            // show all by artist command
            const match = cmd.match(cmd_regex.showAllBy);
            const resList = this.store.showAllByArtist(match[1]);
            response = resList.join('\n');
        } else if (cmd_regex.showUnplayed.test(cmd)) {
            // show unplayed command
            const resList = this.store.showUnplayed();
            response = resList.join('\n');
        } else if (cmd_regex.showUnplayedBy.test(cmd)) {
            // show unplayed by artist command
            const match = cmd.match(cmd_regex.showUnplayedBy);
            const resList = this.store.showUnplayedByArtist(match[1]);
            response = resList.join('\n');
        } else {
            response = `Uh-oh! Unable to parse input. You wrote: ${cmd}`;
        }
        callback(null, response);
    }
}

module.exports = {
    MusicRepl,
};
