/**
 * Change case of string, replace hyphens with spaces and capitalize first letter
 * string "joe-smith" to "Joe Smith"
 * @param str Input String 
 */
export function HyphenToCapitalizedSpace(str: string) {
    return str.replace(/(-|^)([^-]?)/g, function(_, prep, letter) {
        return (prep && ' ') + letter.toUpperCase();
    });
}