<script>
    import { beforeUpdate } from "svelte";
    import Item from './Item.svelte';
    import { number } from 'svelte-i18n'

    export let data;
    export let databaseByID;
</script>

<h4>Buildings</h4>

<table>
    <thead>
    <tr class="top">
        <th class="left first">Tier - Level</th>
        <th class="right">Perks <br> Requirements</th>
    </tr>
    </thead>
    <tbody>
    {#each data.guildBuildings as building}
        <tr class="title">
            <td colspan="2" class="title">{building.name}</td>
        </tr>
        {#each building.upgrades as upgrade}
            <tr>
                <td class="left">
                    Tier <strong>{upgrade.tier}</strong>
                    <br><span class="building-level">Level {upgrade.level}</span>
                </td>
                <td class="right">
                    {#if upgrade.perks.length}
                        <ul>
                        {#each upgrade.perks as perk}
                            <li>
                                <strong>{perk.perkTitle}</strong>
                                <br> <span class="building-level">{perk.perkDescription}</span>
                            </li>
                        {/each}
                        </ul>
                    {:else}
                        <span class="building-level">No perks</span>
                    {/if}
                    <ul class="reagents">
                        <li>
                            <span class="sellprice">{$number(upgrade.goldRequirement)}</span>
                        </li>
                        {#each upgrade.itemsRequired as itemsRequired}
                            <li>
                                {databaseByID[itemsRequired.itemIdentifier].name}: {$number(itemsRequired.quantity)}
                            </li>
                        {/each}
                    </ul>
                    {#if upgrade.buildDuration == 0}
                        <span class="building-level underline">Instant Build</span>
                    {:else}
                        <span class="building-level underline">Completed in {upgrade.buildDuration / 3600}h</span>
                    {/if}
                </td>
            </tr>
            <tr class="spacer">
                <td colspan="2" ></td>
            </tr>
        {/each}

    {/each}


    </tbody>
</table>

<style>
    .reagents {
        border-top: 1px dashed #d0d0d0;
        margin-top: 8px;
        padding-top: 10px;
    }

    .underline {
        text-decoration: underline;
    }
</style>