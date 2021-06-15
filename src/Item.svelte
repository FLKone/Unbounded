<script>
	import { beforeUpdate } from "svelte";
    import { number } from 'svelte-i18n'

	export let item;
	export let dropChance = null;
	export let dropXP = null;
</script>

<item class="gear">
    <div class="rarity {item.rarity}">
        <span class="name">{item.name}</span> <ul class="ratexp">{#if dropChance != null}<li><span class="droprate">({dropChance * 100}%)</span></li>{#if dropXP != null}<li><span>{$number(dropXP)} XP</span></li>{/if}{/if}</ul>
        {#if item.gear}
            <span class="type {item.gear.gearType.toLowerCase()}"></span>
            <span class="descriptiontop"></span>


            <ul>
                <li>{#each item.gear.stats as stat}{#if stat.statKey === "minDamage"}{$number(stat.statValue)}{/if}{/each}{#each item.gear.stats as stat}{#if stat.statKey === "maxDamage"}-{$number(stat.statValue)} dmg{/if}{/each}</li>

                {#each item.gear.stats as stat}
                    {#if stat.statKey !== "minDamage" && stat.statKey !== "maxDamage"}
                        {#if stat.statKey === "critChance"}
                            <li>Critical Hit +{Math.round(stat.statValue * 100 * 100) / 100}%</li>
                        {:else if stat.statKey === "dodgeChance"}
                            <li>Dodge +{Math.round(stat.statValue * 100 * 100) / 100}%</li>
                        {:else if stat.statKey === "attackSpeed"}
                            <li>Attack Speed {3.0 + stat.statValue}s</li>
                        {:else if stat.statKey === "armor"}
                            <li>Armor {stat.statValue}</li>
                        {:else if stat.statKey === "hp"}
                            <li>HP {stat.statValue}</li>
                        {:else if stat.statKey === "mp"}
                            <li>MP {stat.statValue}</li>
                        {:else if stat.statKey === "damage"}
                            <li>Damage {stat.statValue}</li>

                        {:else}
                        <li>{stat.statKey} {$number(stat.statValue)}</li>
                        {/if}
                    {/if}
                {/each}
            </ul>
            <span class="required">Combat Lv.{item.gear.minimumLevel}</span>
            <!--
            {item.gear.gearType.toLowerCase()}-->

        {:else if item.consumable}
            <span class="type {item.consumable.type.toLowerCase()}"></span>
            <span class="descriptiontop"></span>

            <ul>
            {#if item.consumable.healAmount} <li> {$number(item.consumable.healAmount)} HP {#if item.consumable.duration} over {item.consumable.duration}s{/if}</li>{/if}
            {#if item.consumable.manaAmount} <li> {$number(item.consumable.manaAmount)} MP {#if item.consumable.duration} over {item.consumable.duration}s{/if}</li>{/if}
            {#if item.consumable.cooldownTime} <li>Cooldown {item.consumable.cooldownTime}s </li> {/if}
            </ul>
            <span class="required">Combat Lv.{item.consumable.levelRequirement}</span>
        {:else}
            {#if item.name.includes("Recipe")}
                <span class="type recipe"></span>
            {:else if item.name.includes("Ore") || item.name.includes("Fragments") || item.name.includes("Coal")}
                <span class="type mining"></span>
            {:else if item.name.includes("Million Dollar Cookie")}
                <span class="type goldencookie"></span>
            {/if}
            <span class="descriptiontop"></span>

        {/if}
        <span class="sellprice">{$number(item.sellPrice)}</span>
        <div class="clearright"></div>

        {#if item.itemDescription}
            <span class="description">{item.itemDescription}</span> <!--<span class="">({item.rarity})</span>-->
        {/if}
        <div class="clearright"></div>
    </div>
</item>

<style>
    item {
        display: block;
        border: 1px solid black;
        padding:4px;
        margin:5px 0;
        background-color: #3b3535;
        border-radius: 10px;
        color: white;
    }
    /*
    common             white
    uncommon           green
    rare               blue
    epic               purple
    legendary          orange
    */
    item .rarity {
        border:3px solid;
        border-radius: 10px;
        padding:10px;
        position: relative;
    }

    item .rarity.common {
        border-color: #f4f4f4;
    }
    item .rarity.uncommon {
        border-color: #4fc44f;
    }
    item .rarity.rare {
        border-color: #4b81ff;
    }
    item .rarity.epic {
        border-color: #bb24bb;
    }
    item .rarity.legendary {
        border-color: darkorange;
    }
    item .rarity.special {
        border-color: yellow;
    }

    item .name {
    font-weight: bold;
    text-decoration: underline;
        padding-right: 24px;
    }

    item .type {
        width: 30px;
        height: 30px;
        position: absolute;
        top: 12px;
        right: 10px;
    }
    item .type.gearmainhand {
        background:url("../img/craftbound/hand-weapon.png") right top / 25px 25px no-repeat;
    }
    item .type.geargloves {
        background:url("../img/craftbound/gloves.png") right top / 25px 25px no-repeat;
    }
    item .type.gearhead {
        background:url("../img/craftbound/head.png") right top / 25px 25px no-repeat;
    }
    item .type.gearchest {
        background:url("../img/craftbound/armor.png") right top / 25px 25px no-repeat;
    }
    item .type.gearfinger {
        background:url("../img/craftbound/ring.png") right top / 25px 25px no-repeat;
    }
    item .type.gearfeet {
        background:url("../img/craftbound/placeholder.png") right top / 25px 25px no-repeat;
    }
    item .type.gearbelt  {
        background:url("../img/craftbound/placeholder.png") right top / 25px 25px no-repeat;
    }

    item .type.healthfood, item .type.manafood, item .type.healthmanafood {
        background:url("../img/craftbound/food.png") right top / 25px 25px no-repeat;
    }

    item .type.recipe  {
        background:url("../img/craftbound/recipe.png") right top / 25px 25px no-repeat;
    }
    item .type.mining  {
        background:url("../img/craftbound/mining.png") right top / 25px 25px no-repeat;
    }

    item .type.goldencookie  {
        background:url("../img/craftbound/goldencookie.png") right top / 25px 25px no-repeat;
    }

    item .type.healthpotion   {
        background:url("../img/craftbound/health-potion.png") right top / 25px 25px no-repeat;
    }
    item .type.manapotion  {
        background:url("../img/craftbound/mana-potion.png") right top / 25px 25px no-repeat;
    }


    item .required {
        font-style: normal;
        color: #c83c3c;
        font-weight: bold;
        font-size: 13px;
    }

    item .description {
        border-top:1px dashed white;
    font-style: italic;
    color: grey;
    font-size: 0.9em;
    display: block;
        padding-top:6px;

        margin-top:10px;
    }

    item .descriptiontop {
        border-top:1px dashed white;
        font-style: italic;
        color: grey;
        font-size: 0.9em;
        display: block;
        padding-top:6px;

        margin-top:10px;
    }

    item .sellprice {
        float:right;

    }

    .droprate {
        color: #c4c4c4;
        font-size: 0.9em;
    }

    div.clearright {
        clear:both;
    }

    ul.ratexp li {
        margin-right: 5px;
        display: inline-block;
    }

</style>