const { MarkovMachine } = require('./markov')

describe('markov chain tests', () => {

    let mm;

    beforeEach(() => {
        mm = new MarkovMachine('the cat in the hat');
    })

    test("markov chain structure", () => {
        expect(mm.chains).toEqual({
            "the": ["cat", "hat"],
            "cat": ["in"],
            "in": ["the"],
            "hat": [null]
        });
    });

    test('generated text length', () => {
        const text = mm.makeText(25);
        const words = text.split(' ');
        expect(words.length).toBeLessThanOrEqual(50);
    })

    test('generated text contains valid words', () => {
        const text = mm.makeText(25);
        const words = text.split(' ');
        const validWords = ['the', 'cat', 'in', 'the', 'hat'];
        for (let word of words) {
            expect(validWords).toContain(word);
        }
    })

    test('handle empty input', () => {
        const emptyMM = new MarkovMachine('');
        expect(emptyMM.makeText()).toEqual('');
    })

    test('handle single world input', () => {
        const singleWordMM = new MarkovMachine('hello');
        expect(singleWordMM.makeText(5)).toEqual('hello');
    })
})