<script>
	import { beforeUpdate } from "svelte";
	import Item from './Item.svelte';
    import { number } from 'svelte-i18n'

	export let data;
	export let databaseByID;
</script>

<h4>Leveling</h4>

<table>
	<tbody>
	<tr><td style="text-align: center"><br> XP Table is shared across all skills and is <a style="font-weight: bold" href="./#/character">available here</a> <br>(scroll down)<br><br></td></tr>

	</tbody>
</table>

<h4>Recipes</h4>

<table>
	<thead>
	<tr class="top">
		<th class="right first">Stats</th>
		<th class="right">Reagents > Craft</th>
	</tr>
</thead>
<tbody>
	{#each data.cookingRecipes as recipe}
		<tr>
			<td colspan="2" class="title">
                {databaseByID[recipe.itemIdentifier].name} Lv.{recipe.requiredLevel}

                {#if recipe.hidden}
                    <br><span class="hidden">
                    {#if recipe.itemIdentifierToUnlock}
                        Learn with: {databaseByID[recipe.itemIdentifierToUnlock].name} 
                    {:else}
                        Locked
                    {/if}
                    </span>
                {/if}
			</td>
		</tr>                
		<tr>
			<td class="right">  
				{recipe.duration}s
				<br>{$number(recipe.xp)} XP
				<br><span class="droprate">{$number(Math.round(recipe.xp * 60 / recipe.duration))} XP/min</span>					
			</td>
			<td class="left">
				<ul>         
					{#each recipe.reagents as reagent}
						<li>{reagent.quantity}x {databaseByID[reagent.itemIdentifier].name}</li>
					{/each}
				</ul>
				<hr/>
                <Item bind:item={databaseByID[recipe.itemIdentifier]}/>
			</td>
		</tr>	
	{/each}
</tbody>
</table>