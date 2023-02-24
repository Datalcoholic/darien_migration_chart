<script>
	import { onMount } from 'svelte'
	import Chart from './lib/chart.svelte'
	import { boxSize } from './stores/size-store'
	let boxEl
	// let boxSize

	onMount(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			// We're only watching one element
			const entry = entries.at(0)
			//Get the block size
			boxSize.set({
				width: entry.contentRect.width,
				height: entry.contentRect.height,
			})
		})
		resizeObserver.observe(boxEl)
		// This callback cleans up the observer
		return () => resizeObserver.unobserve(boxEl)
	})
</script>

<main>
	<section class="container" bind:this={boxEl}>
		<h2>Migrantes en transito por el Darien por pais de origen</h2>
		<Chart />
	</section>
</main>

<style>
	main {
		max-width: 100%;
	}
	.container {
		width: clamp(650px, 100vw, 1000px);
		height: 90vh;
		/* outline: 2px solid brown; */
	}
	h2 {
		margin: 10px 0 0 0;
	}
</style>
