<script>
	import 'open-props/open-props.min.css';
	import 'open-props/normalize.min.css';

	import { onMount } from 'svelte'
	import { slide } from 'svelte/transition'

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
			document.firstElementChild.style.setProperty('--user', effects[value]() + ',' +effects.conic())
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
		<a class="back-btn" href="/" title="Go home">
			<svg aria-hidden="true" width="48" height="48" viewBox="0 0 24 24">
				<path fill="currentColor" d="M20 5v14l-7-7M6 5v14H4V5m9 0v14l-7-7"/>
			</svg>
		</a>
		<header>
			<h1><span class="desktop-only">Room</span> {data.slug}</h1>
			<p class="connected-widget">
				<svg width="24" height="24" viewBox="0 0 24 24">
					<path fill="currentColor" d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"/>
				</svg>
				<span class="partyers">0</span>
			</p>
		</header>
		{#if device}
		  <label
		  	class="settings-btn"
		  	title="Settings" 
		  	transition:slide={{ duration: 300, axis: 'y' }}
		  >
		  	<svg aria-hidden="true" width="60" height="60" viewBox="0 0 256 256">
		  		<path fill="currentColor" d="M108 60a16 16 0 1 1-16-16a16 16 0 0 1 16 16m56 16a16 16 0 1 0-16-16a16 16 0 0 0 16 16m-72 36a16 16 0 1 0 16 16a16 16 0 0 0-16-16m72 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16m-72 68a16 16 0 1 0 16 16a16 16 0 0 0-16-16m72 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16"/>
		  	</svg>
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
		  	<svg width="50" height="50" viewBox="0 0 24 24">
		  		<path fill="currentColor" d="M11 13V3h2v10zm1 8q-1.85 0-3.488-.712T5.65 18.35q-1.225-1.225-1.937-2.863T3 12q0-2 .825-3.775T6.15 5.15L7.6 6.6q-1.25.95-1.925 2.375T5 12q0 2.9 2.05 4.95T12 19q2.925 0 4.963-2.05T19 12q0-1.6-.663-3.025T16.4 6.6l1.45-1.45q1.5 1.3 2.325 3.075T21 12q0 1.85-.712 3.488t-1.925 2.862q-1.213 1.225-2.85 1.938T12 21"/>
		  	</svg>
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
		gap: 1px;
		justify-content: space-between;
		block-size: var(--size-11);
		backdrop-filter: blur(25px);

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