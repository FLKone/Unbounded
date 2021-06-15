<script>
	import { beforeUpdate } from "svelte";
	import Item from './Item.svelte';

	export let database;
    database = database.sort((a, b) => a.name.localeCompare(b.name))
</script>
<h3>Beta - Work In Progress</h3>
<table>
	<thead>
	<tr class="top">
		<th class="right half">Item [value]</th>
		<th class="right">Source</th>
	</tr>
</thead>
<tbody>
	{#each database as item}
		<tr>
			<td class="right">  
                <Item {item}/>
			</td>
			<td class="left">
				WIP
			</td>
		</tr>	
	{/each}
</tbody>
</table>

<style>
    h3 {
        text-align: center;
        background-color: lightgoldenrodyellow;
    }
</style>