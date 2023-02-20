<script>
	export let label, xLabel, yLabel, margins, i, last
	const numberFormat = Intl.NumberFormat('es-ES', {
		notation: 'compact',
	})
	let textRef
	$: textBox = textRef?.getBBox()
	$: console.log('textBox :>> ', textBox)
</script>

{#if i === last}
	<text
		x={xLabel - 10}
		y={yLabel}
		bind:this={textRef}
		style="text-anchor:middle"
	>
		{`${numberFormat.format(label)} Migrantes`}
	</text>
{:else}
	<text x={xLabel} y={yLabel} bind:this={textRef}
		>{numberFormat.format(label)}
	</text>
{/if}
{#if textRef}
	<line
		x1={textBox?.x + textBox?.width}
		y1={yLabel + textBox?.height / 2}
		x2={margins.left}
		y2={yLabel + textBox?.height / 2}
		stroke={'brown'}
	/>
{/if}

<style>
	/* your styles go here */
</style>
