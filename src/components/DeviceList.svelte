<script>
	import {listAudioDevices} from '$lib/device-media.ts'
	import {deviceID} from '$lib/store.ts'

	export let devices = []
</script>

{#if devices.length}
  <select bind:value={$deviceID}>
		{#each devices as { id, name }, i}
			<option value={id}>{name}</option>
		{/each}
	</select>
{/if}
{#if !devices.length}
	<p>No device connected.</p>
	<p><b>👉 JAM!</b></p>
{/if}

<style>
	select {
		background: var(--surface-1);
		color: var(--text-1);
		max-inline-size: 50vw;
	}
</style>