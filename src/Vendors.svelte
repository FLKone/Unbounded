<script>
	import { beforeUpdate } from "svelte";
	import Item from './Item.svelte';
    import { number } from 'svelte-i18n'

	export let data;
	export let databaseByID;
</script>

<table>
	<thead>
	<tr class="top">
		<th class="left ">Items</th>
		<th class="right first">Price</th>
	</tr>
</thead>
<tbody>
	{#each data.vendors as vendor}
		<tr class="title">
			<td colspan="2" class="title">{vendor.vendorName} <br><span class="hidden"> {vendor.vendorSubtitle}</span></td>
        </tr>
        {#each vendor.items as item}
			<tr>
				<td class="left">
					<Item bind:item={databaseByID[item]}/>
				</td>
				<td class="right">
					<span class="sellprice">{$number(databaseByID[item].buyPrice)}</span>
				</td>
			</tr>
			<tr class="spacer">
				<td colspan="2"></td>
			</tr>
		{/each}
	{/each}
</tbody>
</table>