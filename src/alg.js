const { default: long_str } = require("./long_str");

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    if (s.length <= 0) return 0;

    let dp = new Array(s.length);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(s.length).fill(false);
        dp[i][i] = true;
    }

    let maxDistance = 0;
    for (let distance = 1; distance <= s.length; distance++) {
        for (let i = 0; i + distance < s.length; i++) {
            const j = i + distance;
            dp[i][j] = s[i] != s[j] && dp[i][j - 1] && dp[i + 1][j];
            if (dp[i][j] && distance > maxDistance) maxDistance = distance;
        }
    }

    return maxDistance + 1;
};

const testCases = [
    "asfhisdhgdagf",
    "sadauiqu3rehqwf",
    "aabcde",
    "abcabcbb",
    "",
    long_str.longString
];
testCases.forEach(x => {
    console.log(`"${x}": ${lengthOfLongestSubstring(x)}`);
});