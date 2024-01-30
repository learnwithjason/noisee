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
		<h1>
			<b>N</b>
			<b>o</b>
			<b>i</b>
			<b>s</b>
			<b>e</b>
			<b>e</b>
		</h1>
		<p><b>SEE NOISE</b> w/ FRIENDS</p>
	</header>

	<section>
		<p>start or join a room</p>
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
			<button type="submit">JAM</button>
		</form>
		<small>[MOTION WARNING]</small>
	</section>
</main>

<style>
	@import 'static/theme.css';

	@property --frequency-low {
	  syntax: '<percentage>';
	  initial-value: 25%;
	  inherits: false;
	}

	@property --frequency-high {
	  syntax: '<percentage>';
	  initial-value: 33%;
	  inherits: false;
	}

	@keyframes low {
		50% {
			--frequency-low: 10%;
		}
	}

	@keyframes high {
		50% {
			--frequency-high: 20%;
		}
	}

	:global(:root) {
		--text-1: white;
    --text-2: var(--gray-3);
    --surface-1: black;
    --link: yellow;
		min-block-size: 100lvh;
		background-image: 
			radial-gradient(
	      circle at top right, 
	      white min(var(--frequency-low), 100%), 
	      #0000 calc(min(var(--frequency-low), 100%) + 1px)
	    ),
	    radial-gradient(
	      circle at bottom left, 
	      white min(var(--frequency-high), 100%), 
	      #0000 calc(min(var(--frequency-high), 100%) + 1px)
	    );
		animation: 
			low 5s var(--ease-spring-5) 20s infinite,
			high 5s var(--ease-spring-5) 20s infinite;
	}

	:global(body) {
		display: grid;
	}

	main {
		mix-blend-mode: difference;
	  display: grid;
	  place-content: center;
	  place-items: center;
	  gap: var(--size-10);
	}

	header {
		display: grid;
		place-items: center;

		& > p {
			opacity: 0;
			color: var(--link);
			animation: var(--animation-fade-in-bloom) forwards;
			animation-delay: 1s;
			animation-duration: .5s;
		}
	}

	h1 {
		display: flex;
		font-size: min(20vw, 15rem);
		font-family: "Climate Crisis", var(--font-sans);
		
		@media (prefers-reduced-motion: no-preference) {
			& > b {
				opacity: 0;
				animation-duration: .8s;
				animation-delay: calc(var(--i) * 100ms);
				animation-fill-mode: forwards;
				animation-name: slide-in-down, fade-in-bloom;
				animation-timing-function: var(--ease-bounce-3);
			}

			& > b:nth-child(1) {
				--i: 3;
			}

			& > b:nth-child(2) {
				--i: 1;
			}

			& > b:nth-child(3) {
				--i: 2;
			}

			& > b:nth-child(4) {
				--i: 3;
				animation-duration: 1.2s;
			}

			& > b:nth-child(5) {
				--i: 4;
				animation-duration: 1.1s;
			}

			& > b:nth-child(6) {
				--i: 3;
			}
		}
	}

	form {
		display: flex;

		@media (max-width: 400px) {
			flex-direction: column;
		}

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

		@media (max-width: 400px) {
			inline-size: initial;
			font-size: var(--font-size-3);
		}

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

		& > p:first-child {
			color: var(--text-2);
		}
	}
</style>