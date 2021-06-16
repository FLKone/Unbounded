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
			<th class="left first">Stats</th>
			<th class="left">Reagents > Craft</th>
		</tr>
	</thead>
	<tbody>
	{#each data.blacksmithingRecipes as recipe}
		{#if !recipe.hidden || recipe.itemIdentifierToUnlock}
			<tr class="title">
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
				<td class="left">
					<span class="stats">{recipe.duration}</span>s
					<br><span class="stats">{$number(recipe.xp)}</span> XP
					<br><span class="droprate"><span class="stats">{$number(Math.round(recipe.xp * 60 * 60 / recipe.duration))}</span> XP/h</span>
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
		{/if}
	{/each}
</tbody>
</table>

