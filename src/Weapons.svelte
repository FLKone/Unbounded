<script>
    export let data;
    export let databaseByID;
</script>

<h3>
    Work In Progress
</h3>

While I work on adding the Weapons DPS Cheat Sheet right here, you can use this <a target="_blank" href="https://docs.google.com/spreadsheets/d/1j6p-FqQczukU8IoibimXovR0YO-vjyFjh4Ps6OOimQk/copy">Google Sheet</a>.
<br><br><br><br><br><br><br><br><br><br><br><br>

<!--
<h4>Raw Weapons</h4>

<table>
    <thead>
    <tr class="top">
        <th class="right half">Weapon</th>
        <th class="right">Min Damage</th>
        <th class="right">Max Damage</th>
        <th class="right">Crit Chance</th>
        <th class="right"></th>
        <th class="right"></th>
        <th class="right">Attack Speed</th>
    </tr>
    </thead>
    <tbody>
    {#each data.gear as gearItem}
        {#if gearItem.gearType == "gearMainHand" && gearItem.minimumLevel <= 50 && databaseByID[gearItem.itemIdentifier].ubd_sources.length > 0}
            <tr>
                <td class="right">
                    {databaseByID[gearItem.itemIdentifier].name}

                    {gearItem.itemIdentifier}

                    {#each databaseByID[gearItem.itemIdentifier].ubd_sources as source}
                        <span class="{source.name}">{source.name.charAt(0)}</span>
                    {/each}
                </td>
                <td class="left">
                    {#each gearItem.stats as stat}
                        {#if stat.statKey === "minDamage"}
                            {stat.statValue}
                        {/if}
                    {/each}
                </td>
                <td class="left">
                    {#each gearItem.stats as stat}
                        {#if stat.statKey === "maxDamage"}
                            {stat.statValue}
                        {/if}
                    {/each}
                </td>
                <td class="left">
                    {#each gearItem.stats as stat}
                        {#if stat.statKey === "critChance"}
                            {Math.round(stat.statValue * 100 * 100) / 100}%
                        {/if}
                    {/each}
                </td>
                <td class="left">

                </td>
                <td class="left">

                </td>
                <td class="left">
                    {#each gearItem.stats as stat}
                        {#if stat.statKey === "attackSpeed"}
                            {3.0 + stat.statValue}
                        {/if}
                    {/each}
                </td>
            </tr>
        {/if}
    {/each}
    </tbody>
</table>
-->




<style>
    h3 {
        border-radius: 10px;
        text-align: center;
        background-color: lightgoldenrodyellow;
        padding: 10px;
        font-size: 1em;
        color: black;
        margin-top: 30px;
    }
a {
    font-weight: bold;
}
</style>