<script>
	import {gradient} from '$lib/store.ts'

	import DeviceList from '$components/DeviceList.svelte'
	import IconClose from '$icons/Close.svelte'

	export let devices

	function close() {
		document.querySelector('#open-settings').checked = false
	}
</script>

<aside>
	<header>
		<h2>Settings</h2>
		<button on:click={close}>
			<IconClose/>
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
		position: fixed;
		inset-inline: auto 0;
		inset-block: 0 0;

		display: grid;
		place-content: start;
		gap: var(--size-7);

		padding-block: var(--size-8);
		padding-inline: var(--size-9);

		background: var(--text-1);
		color: var(--surface-1);
		border-image: linear-gradient(var(--text-1) 0 0) 1 / 0 110px 0 0 / 100px;

		transition: translate .5s var(--ease-spring-3);
		translate: 100%;

		@media (width <= 600px) {
			padding-inline: var(--size-6);
		}
	}

	:global(body:has(#open-settings:checked)) aside {
		translate: 0%;
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
		gap: var(--size-2);
	}

	fieldset {
		display: flex;
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
			justify-content: space-between;
			gap: var(--size-2);
			font-size: var(--font-size-4);

			& > input {
				inline-size: 3rem;
				block-size: 3rem;

				@media (prefers-color-scheme: dark) {
					color-scheme: light;
				}
			}

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