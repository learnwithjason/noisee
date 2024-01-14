<script>
	import {listAudioDevices} from '$lib/device-media.ts'

	export let devices = []
</script>

<select>
	{#each devices as { id, name }, i}
		<option value={id}>{name}</option>
	{/each}
</select>

<style>
	
</style>