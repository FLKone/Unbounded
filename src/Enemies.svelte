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
		<th class="left first">Stats</th>
		<th class="left">Loots <br> (rate)</th>
	</tr>
</thead>
<tbody>
	{#each data.enemies as enemy}
		<tr class="title">
			<td colspan="2" class="title">{#if enemy.name}{enemy.name}{:else}???{/if} (Lv.{enemy.level})<br/>{#if enemy.isElite}<span class="elite">Elite</span>{/if}</td>
		</tr>
		<tr>
			<td class="left">
				<span class="stats">{$number(enemy.hp)}</span> HP
				<br/> <span class="stats">{$number(enemy.minAttackDamage)}-{$number(enemy.maxAttackDamage)}</span> Dmg
				<br/> <span class="stats">{$number(enemy.XP)}</span> XP
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