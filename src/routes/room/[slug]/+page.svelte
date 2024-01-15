<script>
	import 'open-props/open-props.min.css';
	import 'open-props/normalize.min.css';

	import { onMount } from 'svelte'

	import Settings from '$components/Settings.svelte'

	import {listAudioDevices} from '$lib/device-media.ts'
	import * as effects from '$lib/effects.ts'

	import {gradient} from '$lib/store.ts'
	import {deviceID} from '$lib/store.ts'
	
	export let data;

	let device
	let devices

	let stream = {}
	let sound_data = {}

	onMount(() => {
		deviceID.subscribe(value => {
			if (value == 'default') return
			startMicrophone()
		})

		gradient.subscribe(value => {
			document.firstElementChild.style.setProperty('--user', effects[value]())
		})
	})

	async function startMicrophone() {
	  if ($deviceID) {
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
	  
	  document.firstElementChild.style.setProperty('--frequency-low', low.value +'%')
	  document.firstElementChild.style.setProperty('--frequency-high', high.value +'%')

	  if (device)
	    requestAnimationFrame(readStream)
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
			<h1><span class="desktop-only">Room</span> {data.slug}</h1>
			<p>0 <span class="desktop-only">others</span></p>
		</header>
		{#if device}
		  <label title="Settings">
		  	<svg aria-hidden="true" width="60" height="60" viewBox="0 0 256 256">
		  		<path fill="currentColor" d="M108 60a16 16 0 1 1-16-16a16 16 0 0 1 16 16m56 16a16 16 0 1 0-16-16a16 16 0 0 0 16 16m-72 36a16 16 0 1 0 16 16a16 16 0 0 0-16-16m72 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16m-72 68a16 16 0 1 0 16 16a16 16 0 0 0-16-16m72 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16"/>
		  	</svg>
		  	<input type="checkbox" id="open-settings">
		  </label>
		{/if}

	  {#if device}
		  <button on:click={stopMicrophone}>QUIT</button>
		{/if}
	</nav>

	<section>
		{#if !device}
		  <button on:click={startMicrophone}>JAM</button>
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

	:global(body) {
		display: grid;
	}

	:global(html) {
    transition: --frequency 250ms var(--ease-3);
    background-blend-mode: difference;
    background-image: 
    	var(--user),
    	var(--partyer-1, linear-gradient(#0000 0 0)),
    	var(--partyer-2, linear-gradient(#0000 0 0)),
    	var(--partyer-3, linear-gradient(#0000 0 0));
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
		gap: var(--size-3);
		justify-content: space-between;
		block-size: var(--size-11);

		& > label {
			display: flex;
			flex-shrink: 0;
			align-items: center;
	    cursor: pointer;
	    padding-inline: 0;
	    padding-block: var(--size-2);

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

    & > button {
	    padding-inline: var(--size-3);
	    padding-block: var(--size-2);

	    @media (width >= 720px) {
	    	padding-inline: var(--size-7);
		    padding-block: var(--size-5);
	    }
    }

		& > header {
			flex: 2;
			align-self: center;
		}

		& > a {
			align-self: center;
			margin-inline-start: var(--size-1);
			flex-shrink: 0;

			@media (width >= 720px) {
				margin-inline-start: var(--size-3);
			}

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

  .desktop-only {
  	display: none;

  	@media (width >= 720px) {
  		display: inline;
  	}
  }
</style>