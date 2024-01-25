<script>
	import 'open-props/open-props.min.css';
	import 'open-props/normalize.min.css';

	import { onMount } from 'svelte'
	import { slide } from 'svelte/transition'

	import Settings from '$components/Settings.svelte'

	import IconPrevious from '$icons/Previous.svelte'
	import IconUser from '$icons/User.svelte'
	import IconSettings from '$icons/Settings.svelte'
	import IconPower from '$icons/Power.svelte'

	import {listAudioDevices} from '$lib/device-media.ts'
	import * as effects from '$lib/effects.ts'
	import {startParty, emitEvent} from '$lib/partykit.ts'

	import {gradient, deviceID, connections} from '$lib/store.ts'
	
	// svelte page meta data
	export let data;

	let device
	let devices

	let stream = {}
	let sound_data = {}

	let party

	onMount(async () => {
		// PARTY
		party = await startParty(data.slug)

		connections.subscribe(value => {
			emitEvent('GRADIENT', {type: $gradient})
		})

		// CLIENT
		deviceID.subscribe(value => {
			if (value == 'default') return
			startMicrophone()
		})

		gradient.subscribe(value => {
			emitEvent('GRADIENT', {type: value})

			document.firstElementChild.style
				.setProperty(
					'--user', 
					effects[value]()
				)
		})
	})

	async function startMicrophone() {
	  if ($deviceID !== 'default') {
	    device = await navigator.mediaDevices
	      .getUserMedia({
	        audio: {
	          autoGainControl: false,
	          latency: 0,
	          deviceId: {
	            exact: $deviceID,
	          },
	        }
	      })
	  }
	  else {
	   	device = await navigator.mediaDevices
	      .getUserMedia({audio: {
	        autoGainControl: false,
	        latency: 0,
	      }}) 
	  }

    if (!devices)
		  devices = await listAudioDevices()

		setupMediaStreams()
		readStream()
		emitEvent('GRADIENT', {type: $gradient})
	}

	function stopMicrophone() {
	  device.getTracks()
	    .forEach(track => 
	      track.stop())

	  device = null
	}

	function setupMediaStreams() {
		stream.audio = new AudioContext()
  
	  stream.micLow  = stream.audio.createMediaStreamSource(device)
	  stream.micHigh = stream.audio.createMediaStreamSource(device)
	  
	  stream.analyserLow = stream.audio.createAnalyser()
	  stream.analyserLow.fftSize = 256
	  
	  stream.analyserHigh = stream.audio.createAnalyser()
	  stream.analyserHigh.fftSize = 256
	  
	  stream.lowpass = stream.audio.createBiquadFilter()
	  stream.lowpass.type = 'highpass'
	  stream.lowpass.frequency.value = 3000
	  
	  stream.highpass = stream.audio.createBiquadFilter()
	  stream.highpass.type = 'highpass'
	  stream.highpass.frequency.value = 1500
	  
	  stream.micLow.connect(stream.lowpass)
	  stream.micHigh.connect(stream.highpass)
	  
	  stream.lowpass.connect(stream.analyserLow)
	  stream.highpass.connect(stream.analyserHigh)
	  
	  sound_data.low = new Uint8Array(stream.analyserLow.frequencyBinCount)
	  sound_data.high = new Uint8Array(stream.analyserHigh.frequencyBinCount)
	}

	function readStream() {
		if (!sound_data?.low) return
  
	  const {low, high} = sound_data
	  
	  stream.analyserLow.getByteFrequencyData(low)
	  stream.analyserHigh.getByteFrequencyData(high)
	  
	  low.value = Math.floor((low[1] + low[2]) / 512 * 100)
	  high.value = Math.floor((high[1] + high[2]) / 512 * 100)
	  
	  document.firstElementChild.style
	  	.setProperty(
	  		'--frequency-low', 
	  		low.value +'%'
	  	)
	  document.firstElementChild.style
	  	.setProperty(
	  		'--frequency-high', 
	  		high.value +'%'
	  	)

	  emitEvent('AUDIO', {
	  	low: low.value, 
	  	high: high.value,
	  })

	  if (device)
	    requestAnimationFrame(readStream)
	}
</script>

<main>
	<nav>
		<a class="back-btn" href="/" title="Go home">
			<IconPrevious/>
		</a>
		<header>
			<h1><span class="desktop-only">Room</span> {data.slug}</h1>
			<p class="connected-widget">
				<IconUser/>
				<span class="partyers">{$connections}</span>
			</p>
		</header>
		{#if device}
		  <label
			  tabindex="0"
		  	class="settings-btn"
		  	title="Settings" 
		  	transition:slide={{ duration: 300, axis: 'y' }}
		  >
		  	<IconSettings/>
		  	<input type="checkbox" id="open-settings">
		  </label>
		{/if}

	  {#if device}
		  <button 
		  	class="stop-btn"
		  	on:click={stopMicrophone} 
		  	title="Stop microphone capture" 
		  	transition:slide={{ duration: 300, axis: 'y', delay: 150 }}
		  >
		  	<IconPower/>
		  </button>
		{/if}
	</nav>

	<section>
		{#if !device}
		  <button 
		  	on:click={startMicrophone} 
		  	transition:slide={{ duration: 300, axis: 'y' }}
		  	title="Enable microphone to start jammin"
		  	class="jam"
		  >JAM</button>
		{/if}
	</section>

	<Settings devices={devices}></Settings>

	{#if device}
		<span class="live-tag" transition:slide={{ duration: 300, axis: 'y' }}>LIVE</span>
	{/if}

</main>

<style>
	@import 'static/theme.css';

	:global(html) {
		min-block-size: 100lvh;
	}

	:global(body) {
		display: grid;
	}

	:global(html) {
/*     transition: --frequency 250ms var(--ease-3); */
    background-blend-mode: difference;
    background-image: 
    	var(--user),
    	var(--partyer-0, linear-gradient(#0000 0 0)),
    	var(--partyer-1, linear-gradient(#0000 0 0)),
    	var(--partyer-2, linear-gradient(#0000 0 0)),
    	var(--partyer-3, linear-gradient(#0000 0 0)),
    	var(--partyer-4, linear-gradient(#0000 0 0)),
    	var(--partyer-5, linear-gradient(#0000 0 0)),
    	var(--partyer-6, linear-gradient(#0000 0 0)),
    	var(--partyer-7, linear-gradient(#0000 0 0)),
    	var(--partyer-8, linear-gradient(#0000 0 0)),
    	var(--partyer-9, linear-gradient(#0000 0 0)),
    	var(--partyer-10, linear-gradient(#0000 0 0));
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
			font-size: var(--font-size-4);

			@media (width >= 720px) {
				font-size: var(--font-size-8);
			}
		}
	}

	nav {
		display: flex;
		gap: 1px;
		justify-content: space-between;
		block-size: var(--size-11);

		@media (prefers-color-scheme: dark) {
			mix-blend-mode: difference;
		}

		& > header {
			flex: 2;
			align-self: center;
			display: grid;
			gap: var(--size-2);
		}

		& > a {
			align-self: center;
			margin-inline: var(--size-1);
			flex-shrink: 0;

			@media (width >= 720px) {
				margin-inline: var(--size-3);
			}

			&:is(:hover,:focus-visible) {
				color: var(--link);
			}

			&:not(:hover) {
				color: var(--text-1);
			}
		}
	}

	.settings-btn {
		display: flex;
		flex-shrink: 0;
		align-items: center;
    cursor: pointer;
    padding-inline: 0;
    padding-block: var(--size-2);

	  &:is(:hover, :focus-visible) {
	    background: var(--text-1);
	    color: var(--surface-1);
	  }

    @media (width >= 720px) {
    	padding-inline: var(--size-7);
	    padding-block: var(--size-5);
    }

    & > input {
    	visibility: hidden;
    	height: 0;
    	width: 0;
    }
	}

	.stop-btn {
		flex-shrink: 0;
    padding-inline: var(--size-3);
    padding-block: var(--size-2);

    @media (width >= 720px) {
    	padding-inline: var(--size-7);
	    padding-block: var(--size-5);
    }

	  &:is(:hover, :focus-visible) {
	    background: var(--red-7);
	    color: white;
	  }
  }

	.back-btn {
		transition: scale .5s var(--ease-squish-3);
		aspect-ratio: 1;
		border-radius: var(--radius-round);

  	&:hover {
  		scale: 1.25;
  	}

  	&:active {
  		scale: .95;
  	}
  }

	.partyers {
		font-weight: bold;
	}


	h1 {
		font-family: "Climate Crisis", var(--font-sans);
		line-height: 1;

		@media (width <= 480px) {
			font-size: var(--font-size-4);
		}
	}

  .desktop-only {
  	display: none;

  	@media (width >= 720px) {
  		display: inline;
  	}
  }

  .jam {
  	transition: scale .5s var(--ease-squish-3);

  	&:is(:hover,:focus-visible) {
  		scale: 1.25;
  	}

  	&:active {
  		scale: .95;
  	}
  }

  .live-tag {
  	place-self: end;
  	padding-inline: var(--size-3);
  	padding-block: var(--size-1);
  }

  .connected-widget {
  	display: flex;
  	gap: var(--size-2);
  	align-items: center;

  	& > svg {
  		block-size: 1lh;
  	}
  }
</style>