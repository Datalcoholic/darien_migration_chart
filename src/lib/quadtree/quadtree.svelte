<script>
	import { quadtree, Delaunay } from 'd3'
	import { quadtreeData } from '../../stores/dataStore'
	import { y } from '../../stores/scalesStores'
	import { boxSize } from '../../stores/size-store'
	export let margins

	$: dataForPoints = $quadtreeData.flat(2).map((d) => {
		// return {
		// 	...d,
		// 	from: $y ? $y(d.from) : null,
		// 	to: $y ? $y(d.to) : null,
		// }

		return [
			[d.x, $y ? $y(d.from) : null],
			[d.x, $y ? $y(d.to) : null],
		]
	})

	// 	$: tree = quadtree()
	// 		.addAll(dataForPoints.flat(1))
	// 		.extent([
	// 			[$boxSize.width, $boxSize.height],
	// 			[0, 0],
	// 		])
	// 	function nodes(quadtree) {
	// 		const nodes = []
	// 		quadtree.visit(
	// 			(node, x0, y0, x1, y1) => void nodes.push({ x0, y0, x1, y1 })
	// 		)
	// 		return nodes
	// 	}
	// 	$: nod = nodes(tree)
	// 	$: console.log('nodes :>> ', nod)
	// 	$: console.log('tree :>> ', tree)
	// 	$: console.log('dataForPoints :>> ', dataForPoints.flat(1))

	// 	$: delaunay = Delaunay.from(dataForPoints.flat(1))
	// 	let voronoi
	// 	$: voronoi = delaunay.voronoi([50, 20, $boxSize.width, $boxSize.height])
</script>

{#each dataForPoints.flat(1) as point}
	<circle cx={point.at(0)} cy={point.at(1)} r="1.5" />
{/each}
<!-- <path d={voronoi.render()} fill="none" stroke="black" /> -->

<!-- {#each nod as node}
	<rect
		x={node.x0}
		y={node.y0}
		width={node.x1 - node.x0}
		height={node.y1 - node.y0}
		fill="none"
		stroke="black"
	/>
{/each} -->
<style>
	rect {
		stroke-width: 0.5px;
	}
</style>
