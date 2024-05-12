import { CardStatus } from '../../cards/cardstatus.js'
import { CardOrganizer } from '../cardorganizer.js'

function newRecentMistakesFirstSorter (): CardOrganizer {
  /**
   * Computes the most recent mistake's time stamp for a card and helps in
   * determining the sequence of cards in the next iteration, based on the
   * rules that those answered incorrectly in the last round appear first.
   *
   * @param cardStatus The {@link CardStatus} object with failing
   * @return The most recent incorrect response time stamp
   */
  return {
    /**
     * Orders the cards by the time of most recent incorrect answers provided for them.
     *
     * @param cards The {@link CardStatus} objects to order.
     * @return The ordered cards.
     */
    reorganize: function (cards: CardStatus[]): CardStatus[] {
      // Sort cards based on the number of recent mistakes
      cards.sort((a, b) => {
        const aResults = a.getResults()
        const bResults = b.getResults()

        // Find the index of the last incorrect response for card a and card b
        const lastIncorrectIndexA = findLastIncorrectIndex(aResults)
        const lastIncorrectIndexB = findLastIncorrectIndex(bResults)

        // If one card has no recent incorrect responses while the other does, the one with recent mistakes comes first
        if (lastIncorrectIndexA === -1 && lastIncorrectIndexB !== -1) {
          return 1 // Card b comes first
        } else if (lastIncorrectIndexA !== -1 && lastIncorrectIndexB === -1) {
          return -1 // Card a comes first
        }

        // If both cards have recent incorrect responses, compare the timestamps of their last incorrect responses
        if (lastIncorrectIndexA !== -1 && lastIncorrectIndexB !== -1) {
          // Get the timestamps of the last incorrect responses for card a and card b
          const timestampA = aResults.length - 1 - lastIncorrectIndexA
          const timestampB = bResults.length - 1 - lastIncorrectIndexB
          // Cards with more recent last incorrect responses come first
          return timestampB - timestampA
        }

        // If both cards have no recent incorrect responses, compare the total number of incorrect responses
        const totalMistakesA = aResults.filter(result => !result).length
        const totalMistakesB = bResults.filter(result => !result).length
        // Cards with fewer total mistakes come first
        return totalMistakesA - totalMistakesB
      })

      return cards
    }
  }
};

// Helper function to find the index of the last incorrect response
function findLastIncorrectIndex (results: boolean[]): number {
  for (let i = results.length - 1; i >= 0; i--) {
    if (!results[i]) {
      return i
    }
  }
  return -1
}

export { newRecentMistakesFirstSorter }
