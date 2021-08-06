<script>
    import { beforeUpdate } from "svelte";
    import Item from './Item.svelte';
    import { number } from 'svelte-i18n'

    export let data;
    export let databaseByID;

    var geardb = data.skillGear.sort((a, b) => databaseByID[a.itemIdentifier].name.localeCompare(databaseByID[b.itemIdentifier].name))

</script>

<h4>Gears</h4>

<table>
    <thead>
    <tr class="top">
        <th class="left half">Item</th>
        <th class="left">Stats</th>
    </tr>
    </thead>
    <tbody>
    {#each geardb as skillgear}
        <tr class="spacer">
            <td colspan="2">
            </td>
        </tr>
        <tr>
            <td class="left">
                <Item bind:item={databaseByID[skillgear.itemIdentifier]} />
            </td>
            <td class="left">
                {skillgear.skillKey}
                <br>Req. Lv.{skillgear.levelRequirement}
                <br>{skillgear.amount * 100}% {skillgear.buff}
                <br>
            </td>
        </tr>
    {/each}
    </tbody>
</table>

{#each data.items as item}
    {#if databaseByID[item.identifier].ubd_sources.length == 0}
        <br>{databaseByID[item.identifier].name}
    {/if}
{/each}