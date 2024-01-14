<script>
	import 'open-props/open-props.min.css';
	import 'open-props/normalize.min.css';

	let room

	function joinRoom() {
		location.href = '/room/' + room
	}
</script>

<main>
	<header>
		<h1>Noisee</h1>
		<p>See noise -- with friends!</p>
	</header>

	<section>
		<input type="number" title="room" bind:value={room} placeholder="1337">
		<button on:click={joinRoom}>JAM</button>
	</section>
</main>

<style>
	@import 'static/theme.css';

	:global(body) {
		display: grid;
	}

	main {
	  display: grid;
	  place-content: center;
	  place-items: center;
	  gap: var(--size-10);
	}

	header {
		display: grid;
		place-items: center;
	}

	h1 {
		font-size: min(20vw, 15rem);
		font-family: "Climate Crisis", var(--font-sans);
	}

	section {
		display: flex;

		& > button {
			font-size: var(--font-size-5);
			font-family: "Climate Crisis", var(--font-sans);
		}
	}

	input[type="number"] {
		padding-inline-start: var(--size-7);
		font-size: var(--font-size-5);
		inline-size: 10ch;

		-moz-appearance:textfield;

		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
	    -webkit-appearance: none;
	    margin: 0;
		}
	}
</style>