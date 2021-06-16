<script>
	import { beforeUpdate } from "svelte";
	import Item from './Item.svelte';
    import { number } from 'svelte-i18n'

	export let databaseByID;

	export let GoldProfits;

</script>

<h3>
    Beta - Work In Progress
    <br>All tasks are covered, scroll down :)
    <br>XP from sub tasks (ie: fishing XP > Cooking XP) is not yet available
</h3>

<h4>Combat</h4>

<h5>3s attack Speed weapon equipped</h5>
<h5>100% XP (enemy level = player level)</h5>
<table>
	<thead>
        <tr class="top">
            <th class="left first">Enemy</th>
            <th class="right">XP/Hour <br>(One Shot)</th>
            <th class="right">XP/1k HP</th>
        </tr>
    </thead>
    <tbody>
        <tr class="spacer">
            <td colspan="3"></td>
        </tr>
        {#each GoldProfits.combatProfits as profit}
            <tr>
                <td>
                    <span class="name">{#if profit.name}{:else}???{/if}{profit.name}</span><br> (Lv.{profit.level}) {#if profit.isElite}<span class="elite">Elite</span>{/if}
                    <span class="farming-breakdown"><br> {$number(profit.hp)} HP / {$number(profit.XP)} XP</span>
                </td>
                <td class="right">
                    {$number(profit.ubd_XPGrossProfits)}
                    <span class="farming-breakdown underline"><br>kills: {profit.ubd_XPGrossKills} </span>
                </td>
                <td class="right">
                    {$number(Math.round(profit.ubd_XPGrossProfitsPerHP))}
                </td>
            </tr>
            <tr class="spacer">
                <td colspan="3"></td>
            </tr>
        {/each}
    </tbody>
</table>

<h4>Fishing</h4>

<table>
	<thead>
        <tr class="top">
            <th class="left half">Zone</th>
            <th class="right">XP/hour</th>
        </tr>
    </thead>
    <tbody>
        <tr class="spacer">
            <td colspan="3"></td>
        </tr>
        {#each GoldProfits.fishingProfits as profit}
            <tr>
                <td>
                    <span class="name">{profit.name}</span><br> (Lv.{profit.level})
                </td>
                <td class="right">
                    {$number(Math.round(profit.ubd_XPGrossFishingGains))}
                </td>
            </tr>
            <tr class="spacer">
                <td colspan="3"></td>
            </tr>
        {/each}
    </tbody>
</table>

<h4>Cooking</h4>
<h5>percentages reflects time spent on each tasks</h5>

<table>
	<thead>
        <tr class="top">
            <th class="left third">Recipe</th>
            <th class="right first">XP/hour<br>(Raw)</th>
            <th class="right">XP/hour</th>
        </tr>
    </thead>
    <tbody>
        <tr class="spacer">
            <td colspan="3"></td>
        </tr>
        {#each GoldProfits.cookingProfits as profit}
            <tr>
                <td>
                    <!--{profit.itemIdentifier}
                    <br>-->
                    <span class="name">{databaseByID[profit.itemIdentifier].name}</span><br>(Lv.{profit.requiredLevel})
                    <span class="farming-breakdown"><br>{$number(profit.xp)} XP / {profit.duration}s</span>
                    <hr>
                    <ul class="reagents">
                    {#each profit.reagents as reagent}
                    <li>
                        {reagent.quantity}x {databaseByID[reagent.itemIdentifier].name}
                        {#each databaseByID[reagent.itemIdentifier].ubd_sources as source}
                            <span class="{source.name}">{source.name.charAt(0)}</span>
                        {/each}
                    </li>
                    {/each}
                    </ul>
                </td>
                <td class="right">
                    {$number(Math.round(profit.cookingGrossRecipesCompleted * profit.xp))}
                    <span class="farming-breakdown underline"><br>crafts: {(Math.round(profit.cookingGrossRecipesCompleted * 100) / 100).toFixed(2)}</span>
                </td>
                <td class="right">
                    {$number(Math.round(profit.cookingNetRecipesCompleted * profit.xp))}

                    <ul class="farming-breakdown">
                        {#each profit.activityBreak as activity}
                            {#if activity.name == "vendor"}
                                <li> Spending {(Math.round(activity.spending * 100) / 100).toFixed(2)}g</li>
                            {:else}
                                <li> {activity.name} {(activity.duration / profit.averageCookingNeededTime * 100).toFixed(1)}%</li>
                            {/if}
                        {/each}
                        <li class="underline">crafts: {(Math.round(profit.cookingNetRecipesCompleted * 100) / 100).toFixed(2)}</li>
                        {#if profit.warning}
                            <li class="warning">This recipe contains combat loots, xp gains could not be 100% accurate</li>
                        {/if}
                    </ul>
                </td>
            </tr>
            <tr class="spacer">
                <td colspan="3"></td>
            </tr>
        {/each}
    </tbody>
</table>

<h4>Mining</h4>

<table>
	<thead>
        <tr class="top">
            <th class="left half">Zone</th>
            <th class="right">XP/hour</th>
        </tr>
    </thead>
    <tbody>
        <tr class="spacer">
            <td colspan="3"></td>
        </tr>
        {#each GoldProfits.miningProfits as profit}
            <tr>
                <td>
                    <span class="name">{profit.name}</span><br> (Lv.{profit.level})
                </td>
                <td class="right">
                    {$number(Math.round(profit.ubd_XPGrossMiningGains))}
                </td>
            </tr>
            <tr class="spacer">
                <td colspan="3"></td>
            </tr>
        {/each}
    </tbody>
</table>

<h4>Blacksmithing</h4>
<h5>percentages reflects time spent on each tasks</h5>

<table>
	<thead>
        <tr class="top">
            <th class="left third">Recipe</th>
            <th class="right first">XP/hour<br>(Raw)</th>
            <th class="right">XP/hour</th>
        </tr>
    </thead>
    <tbody>
        <tr class="spacer">
            <td colspan="3"></td>
        </tr>
        {#each GoldProfits.blackProfits as profit}
        <tr>
            <td>
                <!--{profit.itemIdentifier}
                <br>-->
                <span class="name">{databaseByID[profit.itemIdentifier].name}</span><br>(Lv.{profit.requiredLevel})
                <span class="farming-breakdown"><br> {$number(profit.xp)} XP / {profit.duration}s</span>
                <hr>
                <ul class="reagents">
                {#each profit.reagents as reagent}
                <li>
                    {reagent.quantity}x {databaseByID[reagent.itemIdentifier].name}
                    {#each databaseByID[reagent.itemIdentifier].ubd_sources as source}
                        <span class="{source.name}">{source.name.charAt(0)}</span>
                    {/each}
                </li>
                {/each}
                </ul>
            </td>     
            <td class="right">
                {$number((Math.round(profit.blackGrossRecipesCompleted * profit.xp)))}
                <span class="farming-breakdown underline"><br>crafts: {(Math.round(profit.blackGrossRecipesCompleted * 100) / 100).toFixed(2)}</span>  
            </td>         
            <td class="right">
                {$number((Math.round(profit.blackNetRecipesCompleted * profit.xp)))}
                <ul class="farming-breakdown">
                    {#each profit.activityBreak as activity}
                        {#if activity.name == "vendor"}
                            <li> Spending {(Math.round(activity.spending * 100) / 100).toFixed(2)}g</li>
                        {:else}
                            <li> {activity.name} {(activity.duration * 100 / profit.averageBlackNeededTime).toFixed(1)}%</li>
                        {/if}
                    {/each}
                    <li class="underline">crafts: {(Math.round(profit.blackNetRecipesCompleted * 100) / 100).toFixed(2)}</li>
                </ul>
            </td>                
        </tr>
        <tr class="spacer">
            <td colspan="3"></td>
        </tr>
        {/each}
    </tbody>
</table>

<h4>Farming</h4>
<h5>All farming plots are considered unlocked</h5>
<table>
	<thead>
        <tr class="top">
            <th class="left first">Seed</th>
            <th class="right">XP/hour</th>
        </tr>
    </thead>
    <tbody>
        <tr class="spacer">
            <td colspan="3"></td>
        </tr>
        {#each GoldProfits.farmingProfits as profit}
            <tr>
                <td>
                    <span class="name">{databaseByID[profit.itemSeed].name}</span><br> (Lv.{profit.levelRequirement})
                    <span class="farming-breakdown"><br> {$number(profit.xp)} XP / {$number(profit.duration)}s</span>
                </td>
                <td class="right">
                    {$number(Math.round(profit.ubd_XPGrossGains))}
                </td>
            </tr>
            <tr class="spacer">
                <td colspan="3"></td>
            </tr>
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

    .farming-breakdown {
        color: grey;
        font-size: 0.8em;
        font-weight: normal;
    }

    .reagents li {
        display: flex;
        margin-bottom: 1px;
    }
    .reagents li span {
        text-transform: uppercase;
        margin:0 2px;
        padding: 0 2px;
        width:15px;
        height:22px;
        text-align: center;
    }
    span.vendor {
        background-color:gold;
        color:white;
    }
    span.fishing {
        background-color:#5b93db;
        color:white;
    }    

    span.farming {
        background-color:green;
        color:white;
    }  

    span.mining {
        background-color:chocolate;
        color:white;
    }

    span.blacksmithing {
        color:white;
        background-color:grey;

    }

    span.combat {
        color:white;
        background-color:#e51515;
    }

    .name {
        font-weight: bold;
    }

    .underline {
        text-decoration: underline;
    }

    .warning {
        color: #ca3232;
font-style: italic;
    }

    h3 {
        border-radius: 10px;
        text-align: center;
        background-color: lightgoldenrodyellow;
        padding: 10px;
font-size: 1em;
    }
</style>