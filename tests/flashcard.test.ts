import { newFlashCard, FlashCard } from '../src/cards/flashcard'

describe('FlashCard creation and methods', () => {
  test('Create new FlashCard object', () => {
    const question = 'What is the capital of France?'
    const answer = 'Paris'
    const flashCard: FlashCard = newFlashCard(question, answer)
    expect(flashCard.getQuestion()).toEqual(question)
    expect(flashCard.getAnswer()).toEqual(answer)
  })

  test('Check success of response', () => {
    const flashCard: FlashCard = newFlashCard('Question', 'Answer')
    expect(flashCard.checkSuccess('answer')).toBe(true)
    expect(flashCard.checkSuccess('not the answer')).toBe(false)
  })

  test('Convert FlashCard to string', () => {
    const flashCard: FlashCard = newFlashCard('Question', 'Answer')
    expect(flashCard.toString()).toEqual('FlashCard[Question, Answer]')
  })

  test('Check equality of FlashCard objects', () => {
    const flashCard1: FlashCard = newFlashCard('Question', 'Answer')
    const flashCard2: FlashCard = newFlashCard('question', 'answer')
    expect(flashCard1.equals(flashCard2)).toBe(true)
  })
})
