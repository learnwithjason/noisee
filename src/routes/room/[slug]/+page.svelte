<script>
	import 'open-props/open-props.min.css';
	import 'open-props/normalize.min.css';

	import Settings from '$components/Settings.svelte'
	import {listAudioDevices} from '$lib/device-media.ts'
	
	export let data;

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

<main>
	
	<nav>
		<a href="/" title="Go home">
			<svg aria-hidden="true" width="48" height="48" viewBox="0 0 24 24">
				<path fill="currentColor" d="M20 5v14l-7-7M6 5v14H4V5m9 0v14l-7-7"/>
			</svg>
		</a>
		<header>
			<h1>Room {data.slug}</h1>
			<p>0 others connected</p>
		</header>
		{#if device}
		  <label title="Settings">
		  	<svg aria-hidden="true" width="60" height="60" viewBox="0 0 256 256">
		  		<path fill="currentColor" d="M108 60a16 16 0 1 1-16-16a16 16 0 0 1 16 16m56 16a16 16 0 1 0-16-16a16 16 0 0 0 16 16m-72 36a16 16 0 1 0 16 16a16 16 0 0 0-16-16m72 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16m-72 68a16 16 0 1 0 16 16a16 16 0 0 0-16-16m72 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16"/>
		  	</svg>
		  	<input type="checkbox" id="open-settings">
		  </label>
		{/if}
	</nav>

	<section>
		{#if !device}
		  <button on:click={startMicrophone}>JAM</button>
		{/if}

	  {#if device}
		  <button on:click={stopMicrophone}>QUIT</button>
		{/if}
	</section>

	<Settings devices={devices}></Settings>

</main>

<style>
	@import 'static/theme.css';

	@property --frequency {
	  syntax: '<percentage>';
	  initial-value: 0%;
	  inherits: false;
	}

	main {
	  display: grid;
	  grid-template-rows: auto 1fr;
	}

	section {
		display: grid;
		place-content: center;

		& > button {
			font-family: "Climate Crisis", var(--font-sans);
			font-size: var(--font-size-8);
		}
	}

	nav {
		display: flex;
		gap: var(--size-3);
		align-items: center;
		justify-content: space-between;
		block-size: var(--size-11);

		& > label {
			block-size: var(--size-11);
			padding-inline: var(--size-7);
	    padding-block: var(--size-5);
	    cursor: pointer;

	    & > input {
	    	visibility: hidden;
	    	height: 0;
	    	width: 0;
	    }
		}

		& > header {
			flex: 2;
		}

		& > a {
			margin-inline-start: var(--size-3);

			&:hover {
				color: var(--link);
			}

			&:not(:hover) {
				color: var(--text-1);
			}
		}
	}


	h1 {
		font-family: "Climate Crisis", var(--font-sans);
		line-height: 1;
	}

	:global(body) {
		display: grid;
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
  
  footer {
    display: flex;
    gap: .5rem;
  }
</style>