new Vue({
  name: "game",
  el: "#app",
  template: `
	<div id="#app">
		<top-bar
			:turn="turn"
			:current-player-index="currentPlayerIndex"
			:players="players"
		/>
		 <transition name="hand">
      <hand
				v-if="!activeOverlay"
				:cards="testHand"
				@card-play="testPlayCard"
			/>
    </transition>
    <overlay v-if="activeOverlay">
      <component
        :is="'overlay-content-' + activeOverlay"
        :player="currentPlayer"
        :opponent="currentOpponent"
        :players="players"
      />
    </overlay>
	</div>`,
  data: state,
  methods: {
    handlePlay() {
      console.log("You played a card!");
    },
    createTestHand() {
      const cards = [];
      const ids = Object.keys(cards);
      for (let i = 0; i < 5; i++) {
        cards.push(this.testDrawCard());
      }
      return cards;
    },
    testDrawCard() {
      const ids = Object.keys(cards);
      const randomId = ids[Math.floor(Math.random() * ids.length)];
      return {
        uid: cardUid++,
        id: randomId,
        def: cards[randomId]
      };
    },
    testPlayCard(card) {
      // Remove the card from player hand
      const index = this.testHand.indexOf(card);
      this.testHand.splice(index, 1);
    }
  },
  computed: {
    testCard() {
      return cards.archers;
    }
  },
  created() {
    this.testHand = this.createTestHand();
  }
});
console.log(state.currentOpponent);
