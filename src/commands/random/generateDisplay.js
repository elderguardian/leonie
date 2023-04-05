
module.exports = (type, progress) => {

    switch (type) {
        case 'dick': return `${progress}cm: \`8${"=".repeat(progress)}D\``

        case 'boobs':
            const boob = ' '.repeat(progress*2)
            return `${progress}: \`(${boob})(${boob})\``

        default:
            const rounded = Math.floor(progress/4).toFixed(0);
            return `${progress}%: \`|${'='.repeat(rounded)}${'-'.repeat(25 - rounded)}|\``;
    }

}