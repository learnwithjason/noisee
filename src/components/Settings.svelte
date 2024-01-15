<script>
	import {gradient} from '$lib/store.ts'
	import DeviceList from '$components/DeviceList.svelte'

	export let devices

	function close() {
		document.querySelector('#open-settings').checked = false
	}
</script>

<aside>
	<header>
		<h2>Settings</h2>
		<button on:click={close}>×</button>
	</header>

	<section>
		<h3>Device</h3>
		<DeviceList devices={devices}></DeviceList>
	</section>

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
		padding-inline: var(--size-9) var(--size-15);

		background: var(--text-1);
		color: var(--surface-1);

		transition: translate .5s var(--ease-spring-3);
		translate: 100%;
	}

	:global(body:has(#open-settings:checked)) aside {
		translate: calc(100% - var(--size-15));
	}

	header {
		display: flex;
		gap: var(--size-10);
		justify-content: space-between;

		& > button {
			background: transparent;
			font-size: 3em;
			line-height: 1;

			&:hover {
				color: var(--link);
			}
		}
	}

	h2 {
		font-family: "Climate Crisis", var(--font-sans);
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

		& > label {
			display: flex;
			place-items: center;
			gap: var(--size-1);
		}
	}
</style>