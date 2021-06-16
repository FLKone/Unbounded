<script>
  import { locale, number } from 'svelte-i18n'

  locale.set('fr-FR')

  function scrollTop() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth'});
  }

  import * as data from './get-release-v2.json';
  let newGear = [];
  let newConsumable = [];
  let database = data.items;
  let databaseByID = [];
  let newCookingRecipes = [];
  let newSpecialsRecipes = [];
  for (var i = 0; i < data.gear.length; i++){
    newGear[data.gear[i].itemIdentifier] = data.gear[i];
  }
  for (var i = 0; i < data.consumables.length; i++){
    newConsumable[data.consumables[i].identifier] = data.consumables[i];
  }
  for (var i = 0; i < data.specialUsables.length; i++){
    newSpecialsRecipes[data.specialUsables[i].usableItemIdentifier] = data.specialUsables[i];
  }
  for (var i = 0; i < data.cookingRecipes.length; i++){
    newCookingRecipes[data.cookingRecipes[i].itemIdentifier] = data.cookingRecipes[i];
  }
  for (var i = 0; i < database.length; i++){
    //console.log(database[i].identifier + " " + database[i].name)
    //database[data.items[i].identifier] = data.items[i];

    if(newGear[database[i].identifier]) {
      //console.log("gear");
      database[i]["gear"] = newGear[database[i].identifier]
    }
    if(newConsumable[database[i].identifier]) {
      //console.log("consumable");
      database[i]["consumable"] = newConsumable[database[i].identifier]

    }
    if(newCookingRecipes[database[i].identifier]) {
      //console.log("Cooking Recipe");
    }

    databaseByID[database[i].identifier] = database[i];
    databaseByID[database[i].identifier]["ubd_sources"] = [];
  }

  import { onMount } from 'svelte';
  import Enemies from './Enemies.svelte';
  import Locations from './Locations.svelte';
  import Vendors from './Vendors.svelte';
  import Blacksmithing from './Blacksmithing.svelte';
  import Mining from './Mining.svelte';
  import Specials from './Specials.svelte';
  import Cooking from './Cooking.svelte';
  import Database from './Database.svelte';
  import Gold from './Gold.svelte';
  import XP from './XP.svelte';
  import Character from './Character.svelte';
  import Weapons from './Weapons.svelte';

  $: title = "Unbounded - Craftbound Confidential";

  let page;

  async function hashchange() {
    // the poor man's router!
    const path = window.location.hash.slice(1);

    if (path.startsWith('/fishing')) {
      const id = path.slice(6);
      page = "fishing";

      window.scrollTo(0,0);
    }	else if (path.startsWith('/mining')) {
      page = "mining";

      window.scrollTo(0,0);
    }	else if (path.startsWith('/cooking')) {
      page = "cooking";

      window.scrollTo(0,0);
    } else if (path.startsWith('/combat')) {
      page = "combat";

      window.scrollTo(0,0);
    } else if (path.startsWith('/vendors')) {
      page = "vendors";

      window.scrollTo(0,0);
    } else if (path.startsWith('/blacksmithing')) {
      page = "blacksmithing";

      window.scrollTo(0,0);
    } else if (path.startsWith('/specials')) {
      page = "specials";

      window.scrollTo(0,0);
    } else if (path.startsWith('/gold-farming')) {
      page = "gold-farming";

      window.scrollTo(0,0);
    } else if (path.startsWith('/character')) {
      page = "character";

      window.scrollTo(0,0);
    } else if (path.startsWith('/weapons-dps')) {
      page = "weapons-dps";

      window.scrollTo(0,0);
    } else if (path.startsWith('/xp-farming')) {
      page = "xp-farming";

      window.scrollTo(0,0);
      //} else if (path.startsWith('/database')) {
      //  page = "database";
      //  window.scrollTo(0,0);
    } else {
      window.location.hash = '/combat';
    }
  }

  onMount(hashchange);

  // ====== PROFITS
  let GoldProfits = [];
  GoldProfits.fishingProfits = [];
  GoldProfits.miningProfits = [];
  GoldProfits.cookingProfits = [];
  GoldProfits.farmingProfits = [];
  GoldProfits.vendorProfits = [];
  GoldProfits.blackProfits = [];
  GoldProfits.combatProfits = [];

  // COMBAT
  var rewardsPerHP = 1000;
  var rewardsPerSecs = 3;
  var combatTimer = 1 * 60 * 60; //1 Hour

  for (var i = 0; i < data.enemies.length; i++){
    var enemy = data.enemies[i];
    var debug = false;
    if(enemy.identifier === 0 || enemy.identifier === 1) debug = false;

    var enemyProfit = enemy;
    if(debug) console.log("> " + enemyProfit.identifier + " " + enemyProfit.name + " lv." + enemyProfit.level)

    var grossGains = 0;
    var grossGainsXP = enemy.XP;

    enemy.drops.forEach(drop => {
      var dropLootChance = drop.dropChance;

      if(drop.isGold) {
        grossGains += dropLootChance * (drop.minQuantity + drop.maxQuantity) / 2;
        if(debug) console.log(dropLootChance + "*" + (drop.minQuantity + drop.maxQuantity) / 2 + "=" + dropLootChance * (drop.minQuantity + drop.maxQuantity) / 2);

      } else {
        grossGains += dropLootChance * databaseByID[drop.itemIdentifier].sellPrice;
        if(debug) console.log(dropLootChance + "*" + databaseByID[drop.itemIdentifier].sellPrice + "=" + dropLootChance * databaseByID[drop.itemIdentifier].sellPrice);

        if(debug) console.log("> Drop " + databaseByID[drop.itemIdentifier].name + " " + rewardsPerSecs + "/" + dropLootChance + " TTD= "+ rewardsPerSecs / dropLootChance)
        databaseByID[drop.itemIdentifier]["ubd_sources"].push({name: "combat", timeToDrop: rewardsPerSecs / dropLootChance});

      }
      //var averageKillTime = (location.fishingMinCatchTime+location.fishingMaxCatchTime) / 2;



      //console.log("Average Time to loot " + databaseByID[drop.itemIdentifier].name + "=" + averageLootTime / dropLootChance);
      //databaseByID[drop.itemIdentifier]["ubd_sources"].push({name: "combat", timeToDrop: averageLootTime / dropLootChance});
      //console.log(databaseByID[drop.itemIdentifier]["ubd_averageTimeToDrop"] + "" + databaseByID[drop.itemIdentifier]["ubd_averageTimeToDrop"]*10)
    });

    enemyProfit["ubd_GrossProfits"] = grossGains * combatTimer / rewardsPerSecs;
    enemyProfit["ubd_GrossGains"] = grossGains;
    enemyProfit["ubd_GrossKills"] = combatTimer / rewardsPerSecs;
    enemyProfit["ubd_GrossProfitsPerHP"] = grossGains * rewardsPerHP / enemy.hp;

    enemyProfit["ubd_XPGrossProfits"] = grossGainsXP * combatTimer / rewardsPerSecs;
    enemyProfit["ubd_XPGrossGains"] = grossGainsXP;
    enemyProfit["ubd_XPGrossKills"] = combatTimer / rewardsPerSecs;
    enemyProfit["ubd_XPGrossProfitsPerHP"] = grossGainsXP * rewardsPerHP / enemy.hp;

    GoldProfits.combatProfits.push(enemyProfit);

  }



  // === FISHING & MINING
  var fishingTimer = 1 * 60 * 60; //1 Hour
  var miningTimer = 1 * 60 * 60; //1 Hour

  for (var i = 0; i < data.locations.length; i++){
    var location = data.locations[i];
    if(location.hidden === true && location.itemIdentifierToUnlock === null)  { continue};

    var locationProfit = location;
    //locationProfit["name"] = location.name;
    //locationProfit["level"] = location.level;
    //console.log("> " + locationProfit.identifier + " " + locationProfit.name + " lv." + locationProfit.level)

    // FISHING
    if(location.skillKeys[0] === "all" || location.skillKeys[0] === "fishing") {

      var averageFishingGains = 0;
      var grossFishingGainsXP = 0;
      data.fishingDrops.forEach(drop => {
        if(drop.locationIdentifier === locationProfit.identifier) {
          //console.log("| Drop " + databaseByID[drop.itemIdentifier].name);
          var dropLootChance = drop.dropChance*(1 - location.fishingJunkChance);
          var averageLootTime = (location.fishingMinCatchTime+location.fishingMaxCatchTime) / 2;
          averageFishingGains += drop.dropChance * databaseByID[drop.itemIdentifier].sellPrice * (1 - location.fishingJunkChance);
          //console.log(drop.dropChance +" * "+ drop.xp + " * " + (1 - location.fishingJunkChance)+ " = " + drop.dropChance * drop.xp * (1 - location.fishingJunkChance));
          //console.log(drop.dropChance +" * "+ databaseByID[drop.itemIdentifier].sellPrice + " * " + (1 - location.fishingJunkChance)+ " = " + drop.dropChance * databaseByID[drop.itemIdentifier].sellPrice * (1 - location.fishingJunkChance));
          grossFishingGainsXP += drop.dropChance * drop.xp * (1 - location.fishingJunkChance);
          //console.log("Average Time to loot " + databaseByID[drop.itemIdentifier].name + "=" + averageLootTime / dropLootChance);
          databaseByID[drop.itemIdentifier]["ubd_sources"].push({name: "fishing", timeToDrop: averageLootTime / dropLootChance});
          //console.log(databaseByID[drop.itemIdentifier]["ubd_averageTimeToDrop"] + "" + databaseByID[drop.itemIdentifier]["ubd_averageTimeToDrop"]*10)
        }
      });
      data.fishingJunk.forEach(junk => {
        averageFishingGains += location.fishingJunkChance * databaseByID[junk].sellPrice / data.fishingJunk.length;
        grossFishingGainsXP += location.fishingJunkChance * 1 / data.fishingJunk.length;
        //console.log("| Drop " + databaseByID[junk].name);
        //console.log(location.fishingJunkChance +" * "+ 1 + " / " + data.fishingJunk.length + " = " + location.fishingJunkChance * 1 / data.fishingJunk.length);

        //console.log(location.fishingJunkChance +"*"+ databaseByID[junk].sellPrice + "/" + data.fishingJunk.length + "=" + location.fishingJunkChance * databaseByID[junk].sellPrice / data.fishingJunk.length);
      });

      var averageTime = ((locationProfit.fishingMinCatchTime + locationProfit.fishingMaxCatchTime) / 2);
      //console.log("| averageFishingGains " + averageFishingGains + " * " +  fishingTimer + " / " + averageTime + " = " + averageFishingGains * fishingTimer / averageTime);

      locationProfit["ubd_grossFishingGains"] = averageFishingGains * fishingTimer / averageTime;
      locationProfit["ubd_XPGrossFishingGains"] = grossFishingGainsXP * fishingTimer / averageTime;
      //console.log(locationProfit["ubd_grossFishingGains"]);
      GoldProfits.fishingProfits.push(locationProfit);
    }


    if(location.skillKeys[0] === "all") {
      // MINING

      var averageMiningGains = 0;
      var grossMiningGainsXP = 0;

      location.miningDrops.forEach(drop => {
        //console.log("> Mining " + drop.itemIdentifier + " " + databaseByID[drop.itemIdentifier].name);
        var dropLootChance = drop.dropChance;
        var averageLootTime = location.mineTime;

        averageMiningGains += drop.dropChance * databaseByID[drop.itemIdentifier].sellPrice;
        grossMiningGainsXP += drop.dropChance * drop.XP;

        //if(newSpecialsRecipes[drop.itemIdentifier]) {
        // var quantityNeeded = newSpecialsRecipes[drop.itemIdentifier].requiredItems[0].quantity+1
        //console.log("| Special - Qty " + quantityNeeded + " TTD " + (averageLootTime/dropLootChance)*quantityNeeded)
        //}

        //console.log("| TTD " + averageLootTime / dropLootChance);

        databaseByID[drop.itemIdentifier]["ubd_sources"].push({name: "mining", dropChance: dropLootChance, timeToDrop: averageLootTime / dropLootChance});
      });

      location.miningDrops.forEach(drop => {
        //console.log("> Mining v2 " + drop.itemIdentifier + " " + databaseByID[drop.itemIdentifier].name);
        var dropLootChance = drop.dropChance;
        var averageLootTime = location.mineTime;

        if(newSpecialsRecipes[drop.itemIdentifier]) {
          var oreItemIdentifier = newSpecialsRecipes[drop.itemIdentifier].drops[0].itemIdentifier;

          var quantityNeeded = newSpecialsRecipes[drop.itemIdentifier].requiredItems[0].quantity + 1

          databaseByID[oreItemIdentifier]["ubd_sources"][0].timeToDrop = averageLootTime * (1/((dropLootChance * 1 / quantityNeeded) + databaseByID[oreItemIdentifier]["ubd_sources"][0].dropChance));

          //console.log("| Special - TTD " + quantityNeeded + " Frag = " + (averageLootTime/dropLootChance)*quantityNeeded)
          //console.log("| Special - TTD Ore " + databaseByID[oreItemIdentifier]["ubd_sources"][0].timeToDrop )
        }
      });

      locationProfit["ubd_grossMiningGains"] = averageMiningGains * miningTimer / locationProfit.mineTime;
      locationProfit["ubd_XPGrossMiningGains"] = grossMiningGainsXP * miningTimer / locationProfit.mineTime;

      GoldProfits.miningProfits.push(locationProfit);
    }
  }

  // === VENDORS
  for (var i = 0; i < data.vendors.length; i++) {
    var vendor = []
    vendor = data.vendors[i];
    for (var j = 0; j < vendor.items.length; j++) {
      var item = [];
      item = vendor.items[j];
      databaseByID[item]["ubd_sources"].push({name: "vendor", timeToDrop: 0});
    }
  }

  // === FARMING
  var farmingTimer = 1 * 60 * 60; // 1 hour in seconds
  var farmingPlots = 16;
  var yieldPerPlot = 5;
  var newFarmingRecipes = data.farmingRecipes.sort((a, b) => a.levelRequirement > b.levelRequirement)

  for (var i = 0; i < data.farmingRecipes.length; i++) {
    var recipe = data.farmingRecipes[i];
    if (recipe.itemHarvest === 0) continue;
    if (databaseByID[recipe.itemSeed]["ubd_sources"].length === 0) continue;

    //console.log("> " + recipe.itemSeed + " " + databaseByID[recipe.itemSeed].name + " > " + databaseByID[recipe.itemHarvest].name + " Duration." + recipe.duration)

    var farmingProfit = recipe;

    var numberOfRecipes = farmingTimer / recipe.duration;
    //console.log("| Duration " + recipe.duration)
    //console.log("| # / 1 hours " + numberOfRecipes + " sell Price " + databaseByID[recipe.itemHarvest].sellPrice);

    var farmingSpendings = 0;

    var farmingGrossProfits = 0;
    var farmingNetProfits = 0;
    var grossGainsXP = 0;

    farmingGrossProfits = databaseByID[recipe.itemHarvest].sellPrice * yieldPerPlot * farmingPlots * numberOfRecipes;
    grossGainsXP = recipe.xp * yieldPerPlot * farmingPlots * numberOfRecipes;
    //carrot 2750
    //console.log("| Gains = " + grossGainsXP + " xp/ " + recipe.xp + " yieldPerPlot/ " + yieldPerPlot + " farmingPlots/ " + farmingPlots + " numberOfRecipes/ " + numberOfRecipes)
    farmingSpendings = databaseByID[recipe.itemSeed].buyPrice * yieldPerPlot * farmingPlots * numberOfRecipes;

    databaseByID[recipe.itemHarvest]["ubd_sources"].push({name: "farming", timeToDrop: 0, passiveTimeToDrop: recipe.duration / (yieldPerPlot * farmingPlots)});

    //console.log(databaseByID[recipe.itemHarvest]["ubd_sources"]);
    //console.log("| Gains " + farmingGrossProfits);

    farmingProfit["ubd_farmingGrossProfits"] = farmingGrossProfits;
    farmingProfit["ubd_farmingNetProfits"] = farmingGrossProfits - farmingSpendings;
    farmingProfit["ubd_XPGrossGains"] = grossGainsXP;

    GoldProfits.farmingProfits.push(farmingProfit);
  }


  // === COOKING
  var cookingTimer = 1 * 60 * 60; //1 hour

  for (var i = 0; i < data.cookingRecipes.length; i++) {
    var debug = false;
    var recipe = data.cookingRecipes[i];
    if(recipe.hidden === true && recipe.itemIdentifierToUnlock === null) continue;
    if(recipe.itemIdentifier == 69  || recipe.itemIdentifier == 211141 ) debug = false; //242 69 249

    var recipeProfit = recipe;
    if (debug) console.log("=======================================================");
    if (debug) console.log("=======================================================");
    //console.log("> " + recipe.itemIdentifier + " " + databaseByID[recipe.itemIdentifier].name + " unlock " + recipe.itemIdentifierToUnlock + " hidden " + recipe.hidden)
    //Number of completes recipes on 1 hrs
    var numberOfRecipes = cookingTimer / recipe.duration;
    if (debug) console.log("| "+ numberOfRecipes + " / 1 hour - sell Price " + databaseByID[recipe.itemIdentifier].sellPrice);


    var averageCookingGains = 0.0;
    averageCookingGains += numberOfRecipes * databaseByID[recipe.itemIdentifier].sellPrice;

    var averageCookingSpendings = 0.0;
    var averageCookingNeededTime = cookingTimer;
    var averagePassiveCookingNeededTime = 0;
    var activityBreak = [];
    var activityPassiveBreak = [];
    activityBreak.push({name: "cooking", duration: cookingTimer});

    for (var j = 0; j < recipe.reagents.length; j++) {
      var reagent = [];
      reagent = recipe.reagents[j];
      if (debug) console.log("Reagents " + reagent.quantity + "x " + databaseByID[reagent.itemIdentifier].name);
      if (debug) console.log(databaseByID[reagent.itemIdentifier]["ubd_sources"]);
      if (databaseByID[reagent.itemIdentifier]["ubd_sources"].length == 1) {
        var source = [];
        source = databaseByID[reagent.itemIdentifier]["ubd_sources"][0]
        if (debug) console.log("| One source > " + source.name)
        if (source.name === "combat") recipeProfit["warning"] = true;

        if (source.name === "vendor") {
          if (debug) console.log("| Buying " + databaseByID[reagent.itemIdentifier].name + " " + numberOfRecipes * reagent.quantity + "*" + databaseByID[reagent.itemIdentifier].buyPrice + "=" + numberOfRecipes * reagent.quantity * databaseByID[reagent.itemIdentifier].buyPrice)
          var spendings = numberOfRecipes * reagent.quantity * databaseByID[reagent.itemIdentifier].buyPrice
          averageCookingSpendings += spendings;
          activityBreak.push({name: source.name, duration: numberOfRecipes * reagent.quantity * source.timeToDrop, spending: spendings});

        } else if (typeof source.passiveTimeToDrop === 'undefined')  {
          if (debug) console.log("| Gathering from " + source.name + " " + databaseByID[reagent.itemIdentifier].name + " " + numberOfRecipes + " * " + reagent.quantity + " * " + source.timeToDrop)

          averageCookingNeededTime += numberOfRecipes * reagent.quantity * source.timeToDrop;
          activityBreak.push({name: source.name, duration: numberOfRecipes * reagent.quantity * source.timeToDrop});

        } else if (typeof source.passiveTimeToDrop !== 'undefined') {
          if (debug) console.log("| Passive from " + source.name + " " + databaseByID[reagent.itemIdentifier].name + " " + numberOfRecipes + " * " + reagent.quantity + " * " + source.timeToDrop)

          averagePassiveCookingNeededTime += numberOfRecipes * reagent.quantity * source.passiveTimeToDrop;
          activityPassiveBreak.push({name: source.name, duration: numberOfRecipes * reagent.quantity * source.passiveTimeToDrop});


        } else {
          console.log("WARNING")
        }
      } else if (databaseByID[reagent.itemIdentifier]["ubd_sources"].length > 1) {
        if (debug) console.log("| Multiples source > " + databaseByID[reagent.itemIdentifier]["ubd_sources"].length + " sources")

        var sourceEstimate = [];

        for (var k = 0; k < databaseByID[reagent.itemIdentifier]["ubd_sources"].length; k++) {
          var source = []
          source = databaseByID[reagent.itemIdentifier].ubd_sources[k];

          if (source.name === "vendor") continue;
          if (source.name === "combat") recipeProfit["warning"] = true;

          if (typeof source.passiveTimeToDrop === 'undefined')  {
            if (debug) console.log("| MS Gathering from " + source.name + " " + databaseByID[reagent.itemIdentifier].name + " " + numberOfRecipes + " * " + reagent.quantity + " * " + source.timeToDrop)

            averageCookingNeededTime += numberOfRecipes * reagent.quantity * source.timeToDrop;
            activityBreak.push({name: source.name, duration: numberOfRecipes * reagent.quantity * source.timeToDrop, passiveDuration: numberOfRecipes * reagent.quantity * source.passiveTimeToDrop});
            break;
          } else if (typeof source.passiveTimeToDrop !== 'undefined') {
            if (debug) console.log("| MS Passive from " + source.name + " " + databaseByID[reagent.itemIdentifier].name + " " + numberOfRecipes + " * " + reagent.quantity + " * " + source.timeToDrop)

            averagePassiveCookingNeededTime += numberOfRecipes * reagent.quantity * source.passiveTimeToDrop;
            activityPassiveBreak.push({name: source.name, duration: numberOfRecipes * reagent.quantity * source.passiveTimeToDrop});
            break;
          } else {
            if (debug) console.log("MS WARNING")
          }

        }
      } else {
        if (debug) console.log("MS no source")

        recipeProfit["warning"] = true;
      }

    }

    recipeProfit["ubd_canBeSustained"] = true;

    if (averagePassiveCookingNeededTime > averageCookingNeededTime) {
      if (debug) console.log("| Cannot be sustained");
      recipeProfit["ubd_canBeSustained"] = false;
      var waitingTime = (1 - (averageCookingNeededTime / averagePassiveCookingNeededTime)) * averageCookingNeededTime / (averageCookingNeededTime / averagePassiveCookingNeededTime)
      averageCookingNeededTime += waitingTime;
      var maxAmountRecipesCompleted = numberOfRecipes * ((averageCookingNeededTime - waitingTime) / averageCookingNeededTime);
      if (debug) console.log("| Can make " + maxAmountRecipesCompleted + " recipes");

      for (var k = 1; k < activityBreak.length; k++) {
        if(activityBreak[k].name === "farming") continue;

        var updatedActivity = {name:  activityBreak[k].name, duration: activityBreak[k].duration * activityBreak[0].duration / averageCookingNeededTime, spending: activityBreak[k].spending * activityBreak[0].duration / averageCookingNeededTime};
        if (debug) console.log("| spending: " + activityBreak[k].spending);
        if (debug) console.log("| Uspending: " + updatedActivity.spending);

        activityBreak[k] = updatedActivity;
      }

      activityBreak.push({name: "Waiting for " + activityPassiveBreak[0].name, duration: waitingTime})
    } else {
      var netRecipes = numberOfRecipes * cookingTimer / averageCookingNeededTime;
      for (var k = 1; k < activityBreak.length; k++) {
        if(activityBreak[k].name !== "vendor") continue;

        var updatedActivity = {name:  activityBreak[k].name, duration: activityBreak[k].duration * activityBreak[0].duration / averageCookingNeededTime, spending: activityBreak[k].spending * activityBreak[0].duration / averageCookingNeededTime};
        if (debug) console.log("| 22 spending: " + activityBreak[k].spending);
        if (debug) console.log("| 22 Uspending: " + updatedActivity.spending);
        activityBreak[k] = updatedActivity;

      }
    }

    recipeProfit["activityBreak"] = activityBreak;
    recipeProfit["activityPassiveBreak"] = activityPassiveBreak;



    var cookingGrossProfits = averageCookingGains;

    recipeProfit["cookingGrossProfits"] = 0.0;
    recipeProfit["cookingNetProfits"] = 0.0;



    recipeProfit["cookingGrossRecipesCompleted"] = numberOfRecipes;
    recipeProfit["cookingNetRecipesCompleted"] = numberOfRecipes * cookingTimer / averageCookingNeededTime;
    recipeProfit["averageCookingGains"] = averageCookingGains;
    recipeProfit["averageCookingSpendings"] = averageCookingSpendings;
    recipeProfit["averageCookingNeededTime"] = averageCookingNeededTime;
    recipeProfit["cookingGrossProfits"] = cookingGrossProfits;
    recipeProfit["cookingNetProfits"] = Number.parseFloat((cookingGrossProfits - averageCookingSpendings) * cookingTimer / averageCookingNeededTime);

    if (debug) console.log("| G " + recipeProfit["averageCookingGains"]);
    if (debug) console.log("| S " + recipeProfit["averageCookingSpendings"]);
    if (debug) console.log("| T " + recipeProfit["averageCookingNeededTime"]);
    if (debug) console.log("| GP/h " + recipeProfit["cookingGrossProfits"]);

    if(averageCookingNeededTime) {
      if (debug) console.log("| Time required = cookingTimer + averageCookingNeededTime " + (averageCookingNeededTime) + " = " + (averageCookingNeededTime) / 60 / 60 + "h");
      if (debug) console.log("| Passive Time  = averagePassiveCookingNeededTime " + (averagePassiveCookingNeededTime) / 60 / 60 + "h");
      if (debug) console.log("| NP/h " + recipeProfit.cookingNetProfits)
    }
    if (debug) console.log("| R = " + recipeProfit["cookingNetRecipesCompleted"] + " | " + activityBreak[0].duration / averageCookingNeededTime * 100 + "%");

    //if (debug) console.log(recipeProfit);
    //if (debug) console.log(activityBreak);
    GoldProfits.cookingProfits.push(recipeProfit);
  };

  // === BLACKSMITHING
  var blackTimer = 1 * 60 * 60; //10 hours

  for (var i = 0; i < data.blacksmithingRecipes.length; i++) {
    var debug = false;
    var recipe = data.blacksmithingRecipes[i];
    if(recipe.hidden === true && recipe.itemIdentifierToUnlock === null) continue;
    if(recipe.itemIdentifier === 106  || recipe.itemIdentifier === 96) debug = false; //242 69 249

    var recipeProfit = recipe;
    if (debug) console.log("=======================================================");
    //console.log("> " + recipe.itemIdentifier + " " + databaseByID[recipe.itemIdentifier].name + " unlock " + recipe.itemIdentifierToUnlock + " hidden " + recipe.hidden)
    //Number of completes recipes on 10 hrs
    var numberOfRecipes = blackTimer / recipe.duration;
    if (debug) console.log("| "+ numberOfRecipes + " / 10 hour - sell Price " + databaseByID[recipe.itemIdentifier].sellPrice);

    var averageBlackGains = 0.0;
    var averageBlackSpendings = 0.0;
    var averageBlackNeededTime = blackTimer;

    averageBlackGains += numberOfRecipes * databaseByID[recipe.itemIdentifier].sellPrice;

    var activityBreak = [];
    activityBreak.push({name: "smithing", duration: blackTimer});

    for (var j = 0; j < recipe.reagents.length; j++) {
      var reagent = [];
      reagent = recipe.reagents[j];
      if (debug) console.log("Reagents " + reagent.quantity + "x " + databaseByID[reagent.itemIdentifier].name);
      if (debug) console.log(databaseByID[reagent.itemIdentifier]["ubd_sources"]);

      if (databaseByID[reagent.itemIdentifier]["ubd_sources"].length === 1) {

        var source = [];
        source = databaseByID[reagent.itemIdentifier]["ubd_sources"][0];
        if (debug) console.log("| One source > " + source.name)

        if (typeof source.passiveTimeToDrop === 'undefined')  {
          if (debug) console.log("| Gathering from " + source.name + " " + databaseByID[reagent.itemIdentifier].name + " " + numberOfRecipes + " * " + reagent.quantity + " * " + source.timeToDrop)

          averageBlackNeededTime += numberOfRecipes * reagent.quantity * source.timeToDrop;
          activityBreak.push({name: source.name, duration: numberOfRecipes * reagent.quantity * source.timeToDrop});

        } else {
          if (debug) console.log("WARNING")
        }
      } else {
        if (debug) console.log("WARNING 2" + recipe.itemIdentifier + " " + databaseByID[recipe.itemIdentifier].name);
      }
    }





    var netRecipes = numberOfRecipes * blackTimer / averageBlackNeededTime;

    recipeProfit["activityBreak"] = activityBreak;
    var blackGrossProfits = averageBlackGains;

    //add TTD for Ingots
    var itemSource = {name: "blacksmithing", timeToDrop: blackTimer / netRecipes}
    databaseByID[recipe.itemIdentifier]["ubd_sources"].push(itemSource);

    recipeProfit["blackGrossProfits"] = 0.0;
    recipeProfit["blackNetProfits"] = 0.0;

    recipeProfit["blackGrossRecipesCompleted"] = numberOfRecipes;
    recipeProfit["blackNetRecipesCompleted"] = netRecipes;
    recipeProfit["averageBlackGains"] = averageBlackGains;
    recipeProfit["averageBlackSpendings"] = averageBlackSpendings;
    recipeProfit["averageBlackNeededTime"] = averageBlackNeededTime;
    recipeProfit["blackGrossProfits"] = blackGrossProfits;
    recipeProfit["blackNetProfits"] = (blackGrossProfits - averageBlackSpendings) * blackTimer / averageBlackNeededTime;

    GoldProfits.blackProfits.push(recipeProfit);
  }
</script>

<svelte:window on:hashchange={hashchange}/>

<main>
  <h1>Unbounded</h1>
  <h2>Craftbound Confidential</h2>
  <menu>
    <h3>Tasks</h3>
    <ul class="menu">
      <li><a href="./#/combat">Combat</a></li> |
      <li><a href="./#/fishing">Fishing</a></li> |
      <li><a href="./#/cooking">Cooking</a></li> |
      <li><a href="./#/mining">Mining</a></li> |
      <li><a href="./#/blacksmithing">Blacksmithing</a></li>
    </ul>
    <h3>Misc.</h3>
    <ul class="menu">
      <li><a href="./#/vendors">Vendors</a></li> |
      <li><a href="./#/specials">Specials Items</a></li> |
      <li><a href="./#/character">Character Stats</a></li> |

      <!--<li><a href="./#/database">Database (Beta)</a></li>-->
    </ul>
    <h3>Guides</h3>
    <ul class="menu">
      <li><a href="./#/gold-farming">Gold Farm (	&beta; )</a></li> |
      <li><a href="./#/xp-farming">XP Farm (	&beta; )</a></li> |
      <li><a href="./#/weapons-dps">Weapons (	&beta; )</a></li>
      <!--<li><a href="./#/database">Database (Beta)</a></li>-->
    </ul>
  </menu>
  <h1 class="page-title">‣ {page}</h1>
  {#if page == "combat"}
    <Enemies {data} {databaseByID}/>
  {:else if page == "fishing"}
    <Locations {data}  {databaseByID}/>
  {:else if page == "cooking"}
    <Cooking {data} {databaseByID}/>
  {:else if page == "mining"}
    <Mining {data}  {databaseByID}/>
  {:else if page == "vendors"}
    <Vendors {data} {databaseByID}/>
  {:else if page == "blacksmithing"}
    <Blacksmithing {data} {databaseByID}/>
  {:else if page == "specials"}
    <Specials {data} {databaseByID}/>
  {:else if page == "gold-farming"}
    <Gold {GoldProfits} {databaseByID} />
  {:else if page == "xp-farming"}
    <XP {GoldProfits} {databaseByID}/>
  {:else if page == "character"}
    <Character {data} {databaseByID}/>
  {:else if page == "weapons-dps"}
    <Weapons {data} {databaseByID}/>
  {:else if page == "database"}
    <Database {database}/>
  {/if}



  <topper>
    <a href="javascript:void(0)" on:click={scrollTop}>&#9652; TOP &#9652;</a>
  </topper>

  <footbar>
    <ul class="community">
      <li>
        <span><a target="_blank" href="https://discord.com/invite/u94kZdggkv">Discuss</a></span>
        <a target="_blank" href="https://discord.com/invite/u94kZdggkv"> <img src="./img/discord.svg" alt="Discord"/> </a>
      </li>
      <li>
        <span><a target="_blank" href="https://www.reddit.com/r/Craftbound/">Share</a></span>
        <a target="_blank" href="https://www.reddit.com/r/Craftbound/"> <img src="./img/reddit.svg" alt="Reddit"/> </a>
      </li>
      <li>
        <span><a target="_blank" href="https://testflight.apple.com/join/RsDKAJFG">Play</a></span>
        <a target="_blank" href="https://testflight.apple.com/join/RsDKAJFG"> <img class="apple" src="./img/appstore.svg" alt="AppStore"/> </a>
      </li>
    </ul>
  </footbar>

  <footer>
    <span>Open Source & <a target="_blank" href="https://github.com/FLKone/Unbounded">Hosted</a> on <a target="_blank" href="https://github.com">Github</a></span>&nbsp;<img src="./img/github-mark.svg" alt="Github"/>&nbsp;|&nbsp;&copy;<span>2020</span>&nbsp;<span><a
          href="https://github.com/FLKone/Unbounded/releases">v0.3.1</a></span>
  </footer>
</main>



<style>
  topper {
    text-align:center;
    display: block;
    padding: 20px 0;
  }
  topper a {
    color: black;
    text-decoration: none;
    display: block;
  }

  .community img {
    height:50px;
  }

  ul.community {
    margin-top:20px;
  }
  ul.community li {
    text-align: center;
    width: 33.3333%;
    float:left;
    height:90px;
  }

  ul.community li span {
    display: block;
    font-size: 0.9em;
    margin-bottom: 5px;

  }

  ul.community li span a {

    text-decoration: none;
    color: grey;

  }
  ul.community li span a:hover {

    text-decoration: underline;


  }
  ul.community li .apple {
    height:40px;
  }

  footer {
    text-align:center;
    padding:15px 0 20px 0;
    display:flex;
    align-items:center;
    color:#b3b3b3;
    font-size:0.9em;
    float:right;
  }

  footer a {
    text-decoration: none;
    color:grey;
  }
  footer a:hover {
    text-decoration: underline;
  }
  footer img {
    width:15px;
    height:15px;
  }
  main {
    padding: 5px;
    margin: 0 auto;
    justify-content: center;
    max-width: 500px;

  }

  h1 {
    margin: auto;
    font-size: 1.9em;
    font-variant: small-caps;
    text-align: right;
  }

  h1.page-title {
    text-transform: uppercase;
    font-size: 20px;
    border-bottom: 5px solid mediumpurple;
    display: inline;
    padding-right: 10px;
  }

  h2 {
    margin: auto;
    font-size: 0.9em;
    color: mediumpurple;
    text-align: right;
    font-variant: small-caps;
  }

  h3 {
    margin:0;
    font-size: 0.8em;
    /*text-decoration: underline;*/
    clear:left;
  }

  menu {
    border-left: 5px solid mediumpurple;
    border-radius: 10px;
    padding: 10px;
  }

  .menu {
    list-style: none;
    padding: 0 20px;
    margin: 0;
  }

  .menu li {
    margin: 0;
    display: inline-block;
  }

</style>

<svelte:head>
  <title>{title}</title>
  <link rel="stylesheet" href="/css/dark.css" media="(prefers-color-scheme: dark)">
  <link rel="stylesheet" href="/css/light.css" media="(prefers-color-scheme: light)">
  <style>

    a {
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline !important;
    }

    table {
      border-collapse: collapse;
      width: 100%;
    }

    td.title {
      text-transform: uppercase;
      font-weight: bold;
      border-bottom: 1px solid #d0d0d0 !important;
    }

    tr td, tr th {
      padding: 10px;
      border-right: 1px solid #d0d0d0;
    }

    tr td:last-child, tr th:last-child {
      border: none !important;
    }

    h4 {
      padding: 5px 10px;
      font-variant: small-caps;
      border-bottom: 2px solid mediumpurple;
    }


    tbody tr.spacer:hover {
      background-color: transparent;
    }
    tr.title:hover {
      background-color: transparent;
    }

    tr.spacer, tr.spacer td {
      border: none;
      height: 10px;
      padding: 0;
    }



    .top .first {
      width: 120px;
    }
    .top .half {
      width: 50%;
    }

    tr.top th {
      font-variant: small-caps;
    }
    .top .third {
      width: 40%;

    }

    .right {
      text-align: right;
    }
    .left {
      text-align: left;
    }

    .elite, .hidden {
      background: rgb(236, 222, 14);
      font-weight: bold;
      padding:0 5px;
    }

    ul {
      padding-left: 0px;
      list-style: none;
      margin: 0;
    }

    .droprate {
      color: grey;
      font-size: 0.9em;
    }

    .sellprice {

      background:right 1px no-repeat url('/img/craftbound/gold.png');
      background-size: 20px 20px;
      padding-right: 22px;
    }

    span.stats {
      font-weight: bold;
    }

  </style>
</svelte:head>