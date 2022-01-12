import { URL } from "url";
import { blake2bHex } from "blakejs";

/* blake2b("Soatok Dreamseeker's dunktag function") */
const DUNKTAG_KEY: Buffer = Buffer.from('572a7ff65e3969e1d1f43911cc07ff82463e5ae113f248dc9035d5e21aabad85', 'hex');

const REGEX_TWITTER_OWNED = /^https?:\/\/([\w.-]+)?twitter\.com\//;
const REGEX_USER_AND_ID = /^\/?([\w_]+)\/status\/(\d+)/;
const OUT_BYTES = 5;

/**
 *
 *
 * @param {string} link
 */
export function dunktag(link: string): string {
    return dunktagCore(getTweetId(link));
}

/**
 * Get a Tweet ID ("username/number") from a given tweet URL.
 *
 * @param {string} link
 * @returns {string} username/number
 */
export function getTweetId(link: string): string
{
    // Quick regex to match for Twitter URLs
    if (!REGEX_TWITTER_OWNED.test(link)) {
        throw new Error(`URL does not appear to be Twitter-owned`);
    }

    // Parse URL
    const myURL = new URL(link);

    // Does this look like a valid Twitter ID?
    const path = myURL.pathname;
    if (!REGEX_USER_AND_ID.test(path)) {
        throw new Error(`URL does not appear to be a tweet`);
    }

    // Fetch the username and tweet ID.
    const result = REGEX_USER_AND_ID.exec(path);

    if (result.length < 3) {
        throw new Error(`It's unknown how this could happen, but too few items were matched without the regex failing.`);
    }
    // Note: I originally had this, but I don't want chameleons to evade dunks:
    // return result[1].toLowerCase() + '/' + result[2];
    return result[2];
}

export function dunktagCore(input: string|Buffer): string {
    const hashed = blake2bHex(input, DUNKTAG_KEY, OUT_BYTES);
    return `#dunk_${hashed}`;
}
