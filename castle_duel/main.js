new Vue({
  name: "game",
  el: "#app",
  template: `
	<div id="#app" :class="cssClass">
		<top-bar
			:turn="turn"
			:current-player-index="currentPlayerIndex"
			:players="players"
		/>

    <div class="world">
      <div class="clouds">
        <cloud v-for="index in 10" :type="(index - 1) % 5 + 1" />
      </div>
      <castle
        v-for="(player, index) in players"
        :key="index"
        :player="player"
        :index="index"
      />
      <div class="land" />
    </div>

		 <transition name="hand">
      <hand
				v-if="!activeOverlay"
				:cards="currentHand"
				@card-play="handlePlayCard"
        @card-leave-end="handleCardLeaveEnd"
			/>
    </transition>

    <transition name="fade">
        <div class="overlay-background" v-if="activeOverlay" />
    </transition>

    <transition name="zoom">
      <overlay
        v-if="activeOverlay"
        :key="activeOverlay"
        @close="handleOverlayClose"
      >
        <component
          :is="'overlay-content-' + activeOverlay"
          :player="currentPlayer"
          :opponent="currentOpponent"
          :players="players"
        />
      </overlay>
    </transition>
	</div>`,
  data: state,
  methods: {
    handlePlay() {
      console.log("You played a card!");
    },
    handlePlayCard(card) {
      playCard(card);
    },
    handleCardLeaveEnd() {
      applyCard();
    },
    handleOverlayClose() {
      overlayCloseHandlers[this.activeOverlay]();
    }
  },
  computed: {
    cssClass() {
      return {
        "can-play": this.canPlay
      };
    }
  },
  mounted() {
    beginGame();
  }
});

// Tween.js
requestAnimationFrame(animate);

function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}

// Overlay

var overlayCloseHandlers = {
  "player-turn"() {
    if (state.turn > 1) {
      state.activeOverlay = "last-play";
    } else {
      newTurn();
    }
  },
  "last-play"() {
    newTurn();
  },
  "game-over"() {
    document.location.reload();
  }
};

// GAME

function beginGame() {
  state.players.forEach(drawInitialHand);
}

function playCard(card) {
  if (state.canPlay) {
    state.canPlay = false;
    currentPlayingCard = card;
    const index = state.currentPlayer.hand.indexOf(card);
    state.currentPlayer.hand.splice(index, 1);
    addCardToPile(state.discardPile, card.id);
  }
}

function applyCard() {
  const card = currentPlayingCard;
  applyCardEffect(card);
  setTimeout(() => {
    state.players.forEach(checkPlayerLost);
    if (isOnePlayerDead()) {
      endGame();
    } else {
      nextTurn();
    }
  }, 700);
}

function nextTurn() {
  state.turn++;
  state.currentPlayerIndex = state.currentOpponentId;
  state.activeOverlay = "player-turn";
}

function newTurn() {
  state.activeOverlay = null;
  if (state.currentPlayer.skipTurn) {
    skipTurn();
  } else {
    startTurn();
  }
}

function skipTurn() {
  state.currentPlayer.skuppedTurn = true;
  state.currentPlayer.skipTurn = false;
  nextTurn();
}

function startTurn() {
  state.currentPlayer.skippedTurn = false;
  if (state.turn > 2) {
    setTimeout(() => {
      state.currentPlayer.hand.push(drawCard());
      state.canPlay = true;
    }, 800);
  } else {
    state.canPlay = true;
  }
}

function endGame() {
  state.activeOverlay = "game-over";
}
