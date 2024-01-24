<script>
	import {gradient} from '$lib/store.ts'
	import DeviceList from '$components/DeviceList.svelte'

	export let devices

	function close() {
		window.scrollTo(0,0)
	}
</script>

<aside id="settings">
	<header>
		<h2>Settings</h2>
		<button on:click={close}>
			<svg width="50" height="50" viewBox="0 0 24 24">
				<path fill="currentColor" d="m12 13.4l2.9 2.9q.275.275.7.275t.7-.275q.275-.275.275-.7t-.275-.7L13.4 12l2.9-2.9q.275-.275.275-.7t-.275-.7q-.275-.275-.7-.275t-.7.275L12 10.6L9.1 7.7q-.275-.275-.7-.275t-.7.275q-.275.275-.275.7t.275.7l2.9 2.9l-2.9 2.9q-.275.275-.275.7t.275.7q.275.275.7.275t.7-.275zm0 8.6q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8"/>
			</svg>
		</button>
	</header>

	<section>
		<h3>Device</h3>
		<DeviceList devices={devices}></DeviceList>
	</section>

	<section>
		<h3>Style</h3>
		<fieldset>
			<legend>Gradient</legend>
			<label>
				Linear
				<input bind:group={$gradient} value="linear" type="radio" name="gradient">
			</label>
			<label>
				Radial
				<input bind:group={$gradient} value="radial" type="radio" name="gradient" >
			</label>
			<label>
				Conic
				<input bind:group={$gradient} value="conic" type="radio" name="gradient">
			</label>
		</fieldset>
	</section>
</aside>

<style>
	aside {
		scroll-snap-align: end;
		grid-column: 2;
    grid-row: span 2;

		display: grid;
		place-content: start;
		gap: var(--size-7);

		padding-block: var(--size-8);
		padding-inline: var(--size-9) var(--size-12);

		background: var(--text-1);
		color: var(--surface-1);
		z-index: var(--layer-2);

		@media (width <= 600px) {
			padding-inline: var(--size-6) var(--size-8);
		}
	}

	header {
		display: flex;
		gap: var(--size-10);
		align-items: center;
		justify-content: space-between;

		@media (width <= 600px) {
			gap: var(--size-3);
		}

		& > button {
			background: transparent;
			flex-shrink: 0;
			aspect-ratio: 1;
			border-radius: var(--radius-round);

			&:hover {
				color: var(--link);
			}
		}
	}

	h2 {
		font-family: "Climate Crisis", var(--font-sans);

		@media (width <= 600px) {
			font-size: var(--size-fluid-3);
		}
	}

	section {
		display: grid;
		place-content: start;
		gap: var(--size-2);
	}

	fieldset {
		display: flex;
		justify-content: space-between;
		gap: var(--size-5);
		padding-inline: var(--size-5);
		padding-block: var(--size-2) var(--size-3);
		accent-color: yellow;
		border: none;
		margin-block-start: var(--size-2);
		padding: 0;

		& > legend {
			display: none;
		}

		@media (width <= 600px) {
			flex-direction: column;
		}

		& > label {
			display: flex;
			place-items: center;
			gap: var(--size-2);
			font-size: var(--font-size-4);

			@media (width <= 600px) {
				gap: var(--size-3);
			}

			&:has(:checked) {
				font-weight: bold;
				--underline: hotpink;
				background: linear-gradient(to bottom, #0000, .6lh, var(--underline) 0);

				@media (prefers-color-scheme: dark) {
					--underline: yellow;
				}
			}
		}
	}
</style>