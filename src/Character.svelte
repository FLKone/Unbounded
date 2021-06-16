<script>
    import { number } from 'svelte-i18n'

    export let data;
    export let databaseByID;
</script>

<h4>Stats</h4>

<h5>Health & Mana regen needs to be confirmed</h5>
<table>
    <thead>
    <tr class="top">
        <th class="right">Level</th>
        <th class="right">Damage <br> (min-max)</th>
        <th class="right">Health Points<br> Regen</th>
        <th class="right">Mana Points<br> Regen</th>
    </tr>
    </thead>
    <tbody>
    <tr class="spacer">
        <td colspan="4"></td>
    </tr>
    {#each data.characterCombat as combat}
        {#if combat.level <= 50}
            <tr class="">
                <td class="right">
                    {combat.level}
                </td>
                <td class="right">
                    {combat.attackDamageMin}-{combat.attackDamageMax}
                </td>
                <td class="right">
                    {$number(combat.health)}
                    <br> {Math.round(combat.healthRegenPercent * 100) / 100}% / {combat.healthRegenInterval}s
                </td>

                <td class="right">
                    {$number(combat.mana)}
                    <br> {Math.round(combat.manaRegenPercent * 100) / 100}% / {combat.manaRegenInterval}s
                </td>
            </tr>
            <tr class="spacer">
                <td colspan="4"></td>
            </tr>
        {/if}

    {/each}
    </tbody>
</table>

<h4>XP Table</h4>

<h5>All skills use the same XP Table</h5>

<table>
    <thead>
    <tr class="top">
        <th class="right first">Level</th>
        <th class="right">XP Required <br>(per level)</th>
    </tr>
    </thead>
    <tbody>
        <tr>
            <td class="right">
                1
            </td>
            <td class="right">
                N/A
            </td>
        </tr>
        {#each data.xp as xp}
            {#if xp.level <= 50}
                <tr>
                    <td class="right">
                        {xp.level}
                    </td>
                    <td class="right">
                        {$number(xp.xpRequired)}
                    </td>
                </tr>
                <tr class="spacer">
                    <td colspan="2"></td>
                </tr>
            {/if}
        {/each}
    </tbody>
</table>


<style>
    h5 {
        margin: 0 0 5px 0;
        text-align: right;
        font-size: 0.7em;
        color: gray;
    }
</style>

