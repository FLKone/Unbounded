<script>
	import { beforeUpdate } from "svelte";
	import Item from './Item.svelte';

	export let data;
	export let databaseByID;
</script>

<h4>Leveling</h4>

<table>
	<tbody>
	<tr><td style="text-align: center"><br> XP Table is shared across all skills and is <a style="font-weight: bold" href="./#/character">available here</a> <br>(scroll down)<br><br></td></tr>

	</tbody>
</table>

<h4>Loots</h4>

<table>
	<thead>
	<tr class="top">
		<th class="left first">Stats</th>
		<th class="left">Loots <br> (rate) XP </th>
	</tr>
</thead>
<tbody>
	{#each data.locations as location}
		{#if !location.hidden || location.itemIdentifierToUnlock}
			<tr class="title">
				<td colspan="2" class="title">
					{location.name} (Lv.{location.level})
					<br/>
					{#if location.hidden}
					<span class="hidden">
						{#if location.itemIdentifierToUnlock}
							Reveal with: {databaseByID[location.itemIdentifierToUnlock].name}
						{:else}
							Locked
						{/if}
					</span>
					{/if}
				</td>
			</tr>
			<tr>
				<td class="left">
					<span class="stats">{location.fishingMinCatchTime}-{location.fishingMaxCatchTime}</span>s
					<br><span class="stats">{location.fishingJunkChance * 100}%</span> Junk
				</td>
				<td class="left">
					{#if data.fishingDrops}
						<ul>
							{#each data.fishingDrops as drop}
								{#if drop.locationIdentifier == location.identifier}
									{#if drop.isGold}
										<ul>
											<li>
												{drop.minQuantity}-{drop.maxQuantity} golds <span class="droprate">({drop.dropChance * 100}%)</span>
											</li>
										</ul>
									{:else}
										<Item bind:item={databaseByID[drop.itemIdentifier]} bind:dropXP={drop.xp} bind:dropChance={drop.dropChance}/>
									{/if}
								{/if}
							{/each}
						</ul>
					{/if}
				</td>
			</tr>
		{/if}

	{/each}
</tbody>
</table>
