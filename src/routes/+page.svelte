<script>
	import DeviceList from '$components/DeviceList.svelte'

	import {listAudioDevices} from '$lib/device-media.ts'

	let device
	let devices

	async function startMicrophone() {
	  // if (state?.device?.exactId) {
	  //   state.device = await navigator.mediaDevices
	  //     .getUserMedia({
	  //       audio: {
	  //         autoGainControl: false,
	  //         latency: 0,
	  //         deviceId: {
	  //           exact: state.device.exactId,
	  //         },
	  //       }
	  //     })
	  // }
	  // else {
	    
	  // }
	  device = await navigator.mediaDevices
      .getUserMedia({audio: {
        autoGainControl: false,
        latency: 0,
      }})

    if (!devices)
		  devices = await listAudioDevices()
	}

	function stopMicrophone() {
	  device.getTracks()
	    .forEach(track => 
	      track.stop())

	  device = null
	}
</script>

{#if devices?.length}
  <DeviceList devices={devices}></DeviceList>
{/if}

<select id="deviceInputs" style="display: none"></select>

<footer>
	{#if !device}
	  <button on:click={startMicrophone}>allow mic</button>
	{/if}

  {#if device}
	  <button on:click={stopMicrophone}>stop</button>
	{/if}
</footer>

<style global>
	@import "open-props/easings.min.css";

	@property --frequency {
	  syntax: '<percentage>';
	  initial-value: 0%;
	  inherits: false;
	}

  :global(html) {
    transition: --frequency 250ms var(--ease-3);
    
    background-image: 
/*       linear-gradient(45deg, lime, yellow), */
      radial-gradient(
        100vw circle at center, 
        white min(var(--frequency-low, 0%), 100%), 
        #0000 calc(min(var(--frequency-low, 0%), 100%) + 1px)
      ),
      radial-gradient(
        100vw circle at center, 
        white min(var(--frequency-high, 0%), 100%), 
        #0000 calc(min(var(--frequency-high, 0%), 100%) + 1px)
      );
/*       linear-gradient(
        to top right, 
        white min(var(--frequency-high, 0%), 100%), 
        #0000 calc(min(var(--frequency-high, 0%), 100%) + 1px)
      ),
      linear-gradient(
        to bottom left, 
        white min(var(--frequency-low, 0%), 100%), 
        #0000 calc(min(var(--frequency-low, 0%), 100%) + 1px)
      ),
      conic-gradient(
        from 90deg at top left, 
        white 0 min(var(--frequency-low, 0%), 100%), 
        #0000 0
      ),
      conic-gradient(
        from 180deg at top right, 
        white min(var(--frequency-high, 0%), 100%), 
        #0000 0
      ); */
    background-blend-mode: difference;
  }

  :global(html) {
    background-color: white;
    color: hotpink;
    display: grid;
    height: 100%;
    font-family: system-ui;
    
    @media (prefers-color-scheme: dark) {
      background-color: black;
    }
  }
  
  :global(body) {
    display: grid;
    place-content: center;
    place-items: center;
    gap: 1rem;
  }
  
  footer {
    display: flex;
    gap: .5rem;
  }
</style>