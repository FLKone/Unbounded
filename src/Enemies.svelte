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

<h4>Loots</h4>

<table>
	<thead>
	<tr class="top">
		<th class="right first">Stats</th>
		<th class="right">Loots <br> (rate)</th>
	</tr>
</thead>
<tbody>
	{#each data.enemies as enemy}
		<tr>
			<td colspan="2" class="title">{enemy.name} (Lv.{enemy.level})<br/>{#if enemy.isElite}<span class="elite">Elite</span>{/if}</td>
		</tr>
		<tr>
			<td class="right">
				{$number(enemy.hp)} HP
				<br/> {$number(enemy.minAttackDamage)}-{$number(enemy.maxAttackDamage)} dmg
				<br/> {$number(enemy.XP)} XP
			</td>
			<td class="left">
				{#if enemy.drops.length}
					{#each enemy.drops as drop}
						{#if drop.isGold}
							<ul>
								<li >
									<span class="sellprice">&#8811; {drop.minQuantity}-{drop.maxQuantity}</span> <span class="droprate">({drop.dropChance * 100}%)</span>
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