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
		<p><b>See noise</b> with friends!</p>
		<small>[MOTION WARNING]</small>
	</header>

	<section>
		<form on:submit={joinRoom}>
			<input type="tel" title="room number" bind:value={room} placeholder="1337" maxlength="4" required>
			<button type="submit">KICK IT</button>
		</form>
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

	form {
		display: flex;

		& > button {
			font-size: var(--font-size-5);
			font-family: "Climate Crisis", var(--font-sans);
		}
	}

	input[type="tel"] {
		background: none;
		padding-inline-start: var(--size-7);
		font-size: var(--font-size-5);
		inline-size: 10ch;
		color: deeppink;
		border-radius: 0px;
		border: var(--border-size-3) solid white;

		&:focus-visible {
			outline-color: black;

			@media (prefers-color-scheme: dark) {
				outline-color: white;
			}
		}

		@media (prefers-color-scheme: dark) {
			color: yellow;
			caret-color: white;
		}

		-moz-appearance:textfield;

		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
	    -webkit-appearance: none;
	    margin: 0;
		}
	}
</style>