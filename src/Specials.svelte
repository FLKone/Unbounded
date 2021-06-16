<script>
	import { beforeUpdate } from "svelte";
	import Item from './Item.svelte';

	export let data;
	export let databaseByID;
</script>

<table>
	<thead>
	<tr class="top">
		<th class="left half">Item</th>        
		<th class="right">Combine/Use with > Loot</th>
	</tr>
</thead>
<tbody>
	{#each data.specialUsables as special}
        <tr class="title"><td colspan="2" class="title">{databaseByID[special.usableItemIdentifier].name}</td></tr>
		<tr>
			<td class="left">
                <!--<Item bind:item={databaseByID[special.usableItemIdentifier]}/>-->
                1x {databaseByID[special.usableItemIdentifier].name}
                <!--
                <ul>
                    <li class="gear">
                        <span class="name">{databaseByID[special.usableItemIdentifier].name}</span>
                        <span class="description">{databaseByID[special.usableItemIdentifier].itemDescription}</span> <span class="rarity">({databaseByID[special.usableItemIdentifier].rarity})</span>
                    </li>
                </ul>-->
            </td>            
            <td class="left">
                {#if special.requiredItems}
                <ul>
                    {#each special.requiredItems as required}
                        <li>
                            {required.quantity}x <span class="name">{databaseByID[required.requiredItemIdentifier].name}</span>
                        </li>
                    {/each}
                </ul>
                {:else}
                    None
                {/if}	
            <hr>
                {#if special.drops}
                    {#each special.drops as drop}
                    
                        {#if drop.isGold}
                        <ul>
                            <li>
                            {drop.minQuantity}-{drop.maxQuantity} golds <span class="droprate">({drop.dropChance * 100}%)</span>
                            </li>
                        </ul>
                        {:else}
                             <Item bind:item={databaseByID[drop.itemIdentifier]} bind:dropChance={drop.dropChance}/>
                        {/if}
                    {/each}
            {:else}
                None
            {/if}	
            </td>
        </tr>

	{/each}
</tbody>
</table>