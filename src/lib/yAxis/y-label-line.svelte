<script>
	import { boxSize } from '../../stores/size-store'
	export let label, xLabel, yLabel, margins, i, last
	const numberFormat = Intl.NumberFormat('es-ES', {
		notation: 'compact',
	})
	let textRef
	$: textBox = textRef?.getBBox()
</script>

<g class="label">
	{#if i === last}
		<text
			x={xLabel - 10}
			y={yLabel}
			bind:this={textRef}
			style="text-anchor:middle"
		>
			{`${numberFormat.format(label)} Personas`}
		</text>
	{:else}
		<text x={xLabel} y={yLabel} bind:this={textRef} style="text-anchor:end"
			>{numberFormat.format(label)}
		</text>
	{/if}
</g>
{#if textRef}
	<line
		x1={textBox?.x}
		y1={yLabel + textBox?.height / 7}
		x2={$boxSize.width - margins.right - margins.left}
		y2={yLabel + textBox?.height / 7}
	/>
{/if}

<style>
	.label {
		stroke: var(--antiflash-white-1);
		stroke-width: 1px;
		paint-order: stroke;
		font-weight: 400;
		font-size: var(--font-axis-size);
		letter-spacing: -1.8px;
		fill: var(--antiflash-grey);
	}

	line {
		stroke: var(--antiflash-white-1);
		stroke-width: 0.5px;
	}
</style>
