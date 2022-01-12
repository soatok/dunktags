import { getTweetId, dunktag, dunktagCore } from '..';
import { expect } from 'chai';
import 'mocha';

const DUMMY_TWEET_LINK = 'https://twitter.com/SoatokDhole/status/1481105268138258437';

describe('Dunktags Tests', () => {
    it('dunktag()', () => {
        expect('#dunk_3e45fd4499').to.be.equal(dunktag(DUMMY_TWEET_LINK));
    });

    it('getTweetId()', () => {
        expect('1481105268138258437').to.be.equal(getTweetId(DUMMY_TWEET_LINK));
    });

    it('dunktagCore()', () => {
        expect('#dunk_637493f041').to.be.equal(dunktagCore(''));
        expect('#dunk_f3869d40bb').to.be.equal(dunktagCore('abc'));
        expect('#dunk_3e45fd4499').to.be.equal(dunktagCore(getTweetId(DUMMY_TWEET_LINK)));
    });
});
