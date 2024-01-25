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
		<p><b>SEE NOISE</b> w/ FRIENDS</p>
	</header>

	<section>
		<form on:submit={joinRoom}>
			<input 
				type="number" 
				title="room number" 
				bind:value={room} 
				placeholder="1337" 
				max="9999" 
				inputmode="numeric" 
				list="radrooms" 
				required
			>
			<datalist id="radrooms">
				<option>1337</option>
				<option>3030</option>
				<option>13</option>
				<option>808</option>
			</datalist>
			<button type="submit">KICK IT</button>
		</form>
		<small>[MOTION WARNING]</small>
	</section>
</main>

<style>
	@import 'static/theme.css';

	@property --frequency-low {
	  syntax: '<percentage>';
	  initial-value: 0%;
	  inherits: false;
	}

	@property --frequency-high {
	  syntax: '<percentage>';
	  initial-value: 0%;
	  inherits: false;
	}

	@keyframes low {
		50% {
			--frequency-low: 7%;
		}
	}

	@keyframes high {
		50% {
			--frequency-high: 12%;
		}
	}

	:global(html) {
		min-block-size: 100lvh;
		/* animation: 
			low 2s var(--ease-bounce-5) infinite,
			high 2s var(--ease-bounce-5) infinite; */
	}

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

		/* & > p {
			@media (prefers-reduced-motion: no-preference) {
				animation: var(--animation-float);
			}
		} */
	}

	h1 {
		font-size: min(20vw, 15rem);
		font-family: "Climate Crisis", var(--font-sans);
		
		/* @media (prefers-reduced-motion: no-preference) {
			animation: var(--animation-slide-in-down);
			animation-duration: 1s;
			animation-timing-function: var(--ease-bounce-3);
		} */
	}

	form {
		display: flex;

		& > button {
			font-size: var(--font-size-5);
			font-family: "Climate Crisis", var(--font-sans);

			&:is(:hover, :focus-visible) {
			  background: var(--surface-1);
		    color: var(--text-1);
			}
		}
	}

	input[type="number"] {
		background: none;
		padding-inline-start: var(--size-7);
		font-size: var(--font-size-5);
		inline-size: 10ch;
		color: deeppink;
		border-radius: 0px;
		border: var(--border-size-3) solid var(--text-1);

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

	section {
		display: grid;
		place-items: center;
		gap: var(--size-3);
	}
</style>