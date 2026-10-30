import type { Expansion, Rarity } from './items';

// Recommended item sets per survivor, curated from community build guides and
// the wiki's skill notes, and validated against items.ts (every name resolves
// to a real, commandable item of the stated rarity).
//
// Picks are ranked: within each rarity the list runs best-first, and the
// sidebar shows the first BUILD_SLOTS[rarity] picks whose expansion is enabled.
// Strong DLC picks sit near the top and base-game fallbacks follow, so turning
// an expansion off swaps its picks for the next-best ones instead of leaving
// gaps. Every build keeps enough base-game picks to fill each base rarity on
// its own. Each item carries a survivor-specific reason shown in the hover.
export interface BuildItem {
  name: string;
  reason: string;
}

export interface Build {
  survivor: string;
  // Which expansion the survivor belongs to, for grouping the picker. Matches
  // the Expansion keys in items.ts ('' = base game).
  expansion: Expansion;
  identity: string;
  items: BuildItem[];
}

// How many picks the sidebar shows per rarity, in display order.
export const BUILD_SLOTS: Partial<Record<Rarity, number>> = {
  Common: 4,
  Uncommon: 4,
  Boss: 3,
  Legendary: 3,
  Hallowed: 2,
};

export const BUILDS: Build[] = [
  {
    survivor: 'Commando',
    expansion: '',
    identity:
      'On-hit proc machine — attack speed turns every bullet into a trigger.',
    items: [
      // Common
      {
        name: "Soldier's Syringe",
        reason:
          'More attack speed boosts his rapid double-tap and reload-cancel proc spam.',
      },
      {
        name: "Lens-Maker's Glasses",
        reason:
          'Crits on every bullet feed Shatterspleen and Predatory Instincts.',
      },
      {
        name: 'Tri-Tip Dagger',
        reason:
          'Bleed stacks well on his fast, low-damage individual bullet hits.',
      },
      {
        name: 'Bolstering Lantern',
        reason:
          'Mid-range gunfights keep enemies close enough for the attack speed.',
      },
      {
        name: 'Crowbar',
        reason:
          'Phase Round and Sabotage open on full-health targets for bonus burst.',
      },
      {
        name: 'Backup Magazine',
        reason:
          'Extra Phase Round charges mean more frequent piercing burst windows.',
      },
      // Uncommon
      {
        name: 'Ukulele',
        reason:
          'Many small bullet hits chain lightning to clustered enemies constantly.',
      },
      {
        name: 'AtG Missile Mk. 1',
        reason:
          'Frequent low-damage shots reliably proc missiles for extra burst.',
      },
      {
        name: 'Luminous Shot',
        reason:
          'Phase Round charges turn his Double Tap into lightning strikes.',
      },
      {
        name: "Kjaro's Band",
        reason: 'High proc-count fire bullets trigger the fire tornado often.',
      },
      {
        name: "Runald's Band",
        reason: 'Same frequent procs apply the slowing ice blast reliably.',
      },
      {
        name: 'Predatory Instincts',
        reason: 'Crit bullets stack attack speed, compounding his proc rate.',
      },
      // Boss
      {
        name: 'Shatterspleen',
        reason:
          'His high attack speed bleeds enemies, triggering explosive crit bursts.',
      },
      {
        name: 'Faulty Conductor',
        reason:
          'Energized pulses make Ukulele and Charged Perforator always crit.',
      },
      {
        name: 'Charged Perforator',
        reason:
          'Frequent procs call lightning bolts adding free single-target damage.',
      },
      {
        name: 'Molten Perforator',
        reason: 'Many hits proc the lava meteors for strong area damage.',
      },
      // Legendary
      {
        name: '57 Leaf Clover',
        reason: 'High proc count means many luck rerolls land favourably.',
      },
      {
        name: 'Sentient Meat Hook',
        reason: 'Rapid fire pulls and chains hits across grouped enemies.',
      },
      {
        name: 'Electric Boomerang',
        reason: 'Constant bullet procs throw stunning boomerangs into packs.',
      },
      {
        name: 'Resonance Disc',
        reason: 'Constant hits charge the disc quickly for big area nukes.',
      },
      // Hallowed
      {
        name: 'Infernal Mark',
        reason:
          'Ten skill hits arrive in a second of Double Tap, branding targets fast.',
      },
      {
        name: 'Nightmare Demon',
        reason:
          'A 20% on-hit chance lands demons constantly off his bullet stream.',
      },
    ],
  },
  {
    survivor: 'Huntress',
    expansion: '',
    identity:
      'Auto-aim proc chain — glaive bounces and Laser Cyclone ticks fire on-hit items across a room.',
    items: [
      // Common
      {
        name: "Lens-Maker's Glasses",
        reason: 'Crit chance scales her seeking glaive and arrow damage well.',
      },
      {
        name: "Soldier's Syringe",
        reason:
          'Attack speed boosts her glaive throws and auto-targeting arrows.',
      },
      {
        name: "Hiker's Boots",
        reason:
          'She shoots from ledges and mid-Blink, stacking crit from above.',
      },
      {
        name: 'Crowbar',
        reason:
          'Mobile hit-and-run lets her open fights with bonus burst damage.',
      },
      {
        name: 'Tri-Tip Dagger',
        reason: 'Glaive bounces apply bleed across multiple chained targets.',
      },
      // Uncommon
      {
        name: 'Ukulele',
        reason:
          'Multi-target glaive bounces trigger chain lightning on grouped enemies.',
      },
      {
        name: 'Predatory Instincts',
        reason: 'Frequent crits ramp her attack speed to extreme levels.',
      },
      {
        name: 'AtG Missile Mk. 1',
        reason:
          'Constant auto-aim attacks proc missiles while she kites freely.',
      },
      {
        name: "Hunter's Harpoon",
        reason: 'Kill bursts of speed keep her kiting ahead of every pack.',
      },
      {
        name: "Kjaro's Band",
        reason: 'High-proc glaive bounces ignite enemies with fire tornadoes.',
      },
      // Boss
      {
        name: 'Shatterspleen',
        reason:
          'Crit-focused build bleeds enemies for explosive guaranteed bursts.',
      },
      {
        name: 'Whispering Fragment',
        reason:
          'Her steady kill rate keeps an orbiting spirit firing alongside her.',
      },
      {
        name: 'Charged Perforator',
        reason: 'Frequent arrow procs call lightning on single targets.',
      },
      {
        name: 'Little Disciple',
        reason: 'She is always sprinting, so the wisps fire constantly.',
      },
      // Legendary
      {
        name: 'Laser Scope',
        reason: 'A crit-stacked Huntress turns every crit into double damage.',
      },
      {
        name: 'Brilliant Behemoth',
        reason: 'Every arrow and cyclone tick becomes an area explosion.',
      },
      {
        name: '57 Leaf Clover',
        reason: 'Rerolls her many proc chances toward success.',
      },
      {
        name: 'H3AD-5T v2',
        reason: 'Extra jump height and slams suit her aerial repositioning.',
      },
      // Hallowed
      {
        name: 'Ritual Helmet',
        reason:
          'Constant sprinting keeps it charged and her speed powers the skull.',
      },
      {
        name: 'Infernal Mark',
        reason: 'Laser Cyclone ticks five times a second, branding quickly.',
      },
    ],
  },
  {
    survivor: 'Bandit',
    expansion: '',
    identity:
      'Backstab-crit assassin — stack debuffs and chain executes for cooldown resets.',
    items: [
      // Common
      {
        name: "Lens-Maker's Glasses",
        reason: 'Crits outside backstabs keep his shotgun damage reliable.',
      },
      {
        name: 'Crowbar',
        reason: 'Opening Lights Out on full-health targets secures the kill.',
      },
      {
        name: 'Tri-Tip Dagger',
        reason: 'Shotgun pellets each roll bleed, stacking debuffs fast.',
      },
      {
        name: "Soldier's Syringe",
        reason: 'Faster reloads keep the shotgun pellets and procs flowing.',
      },
      {
        name: 'Backup Magazine',
        reason: 'Extra Serrated Shiv charges add more bleed and burst.',
      },
      // Uncommon
      {
        name: 'Noxious Thorn',
        reason:
          'Kills spread his bleed and Hemorrhage stacks onto the next target.',
      },
      {
        name: 'Death Mark',
        reason: 'Bleed, Hemorrhage and smoke debuffs easily reach the cap.',
      },
      {
        name: 'Predatory Instincts',
        reason: 'Backstab crits stack attack speed for faster shotgun fire.',
      },
      {
        name: 'Old Guillotine',
        reason: 'Executes low-health elites to chain Lights Out resets.',
      },
      {
        name: "Harvester's Scythe",
        reason: 'Backstab crits heal him while he fights at close range.',
      },
      // Boss
      {
        name: 'Shatterspleen',
        reason: 'Guaranteed backstab crits bleed and explode enemies.',
      },
      {
        name: 'Charged Perforator',
        reason: 'Pellet procs call lightning for extra single-target damage.',
      },
      {
        name: 'Genesis Loop',
        reason: 'A panic button nova when an ambush goes wrong.',
      },
      // Legendary
      {
        name: 'Laser Scope',
        reason: 'Backstabs always crit, so every one deals double damage.',
      },
      {
        name: 'Shattering Justice',
        reason: 'Armor shred amplifies Lights Out and Desperado stacks.',
      },
      {
        name: 'Ceremonial Dagger',
        reason: 'Every reset kill releases homing daggers into the pack.',
      },
      {
        name: '57 Leaf Clover',
        reason: 'Rerolls his bleed and proc chances toward success.',
      },
      // Hallowed
      {
        name: 'Sanguine Chalice',
        reason: 'His constant bleeds and Hemorrhage turn into self-healing.',
      },
      {
        name: 'Totem of Avarice',
        reason:
          'Lights Out clears 400% easily, freezing nearby enemies in gold.',
      },
    ],
  },
  {
    survivor: 'MUL-T',
    expansion: '',
    identity: 'Two-weapon bruiser — Nailgun proc spam or Rebar per-shot burst.',
    items: [
      // Common
      {
        name: "Soldier's Syringe",
        reason: 'Nailgun fire rate scales directly with attack speed.',
      },
      {
        name: 'Bolstering Lantern',
        reason: 'A frontline tank always has enemies within 20m for the buff.',
      },
      {
        name: 'Tri-Tip Dagger',
        reason: 'Every nail rolls bleed, stacking it rapidly on targets.',
      },
      {
        name: 'Crowbar',
        reason: 'Rebar and Scrap Launcher open fights with heavy burst.',
      },
      {
        name: 'Backup Magazine',
        reason: 'An extra Blast Canister charge for more stunning bomblets.',
      },
      // Uncommon
      {
        name: 'Ukulele',
        reason: 'Nail spam chains lightning through crowds constantly.',
      },
      {
        name: 'AtG Missile Mk. 1',
        reason: 'Thousands of nails reliably proc missile volleys.',
      },
      {
        name: "Kjaro's Band",
        reason: 'Big Rebar shots trigger the fire tornado on demand.',
      },
      {
        name: 'Bandolier',
        reason: 'Ammo packs reset his cooldowns mid-fight.',
      },
      {
        name: 'Fuel Cell',
        reason: 'Retool doubles equipment slots, so charges go twice as far.',
      },
      // Boss
      {
        name: 'Shatterspleen',
        reason: 'Fast nail crits bleed and explode packs on death.',
      },
      {
        name: 'Titanic Knurl',
        reason: 'Bonus health and regen suit a frontline tank.',
      },
      {
        name: 'Molten Perforator',
        reason: 'Many nail hits proc lava meteors for area damage.',
      },
      // Legendary
      {
        name: 'Brilliant Behemoth',
        reason: 'Every nail becomes an explosion, turning him into area clear.',
      },
      {
        name: 'Sentient Meat Hook',
        reason: 'Nail spam drags whole groups into his firing line.',
      },
      {
        name: 'Bottled Chaos',
        reason: 'Retool lets him fire two equipments, each triggering chaos.',
      },
      {
        name: '57 Leaf Clover',
        reason: 'Rerolls his many proc chances toward success.',
      },
      // Hallowed
      {
        name: 'Vile Censer',
        reason:
          'Transport Mode stuns, then nails chain smoke through the pack.',
      },
      {
        name: 'Nightmare Demon',
        reason: 'Nail spam lands demons fast and bursts them just as quickly.',
      },
    ],
  },
  {
    survivor: 'Engineer',
    expansion: '',
    identity:
      'Turrets inherit everything — a passive proc and DoT platform, now with a ramping Laser Cutter.',
    items: [
      // Common
      {
        name: "Soldier's Syringe",
        reason: 'Turrets and Laser Cutter both fire faster with attack speed.',
      },
      {
        name: 'Tri-Tip Dagger',
        reason: 'Turret fire rolls bleed constantly, doubled by inheritance.',
      },
      {
        name: 'Bolstering Lantern',
        reason: 'Turrets parked together count each other as nearby allies.',
      },
      {
        name: "Lens-Maker's Glasses",
        reason:
          'Laser Cutter rolls crit on every one of its nine hits a second.',
      },
      {
        name: 'Backup Magazine',
        reason: 'Extra mine charges for more burst while turrets hold.',
      },
      // Uncommon
      {
        name: 'Ukulele',
        reason: 'Turret fire chains lightning through crowds hands-free.',
      },
      {
        name: 'AtG Missile Mk. 1',
        reason: 'Turrets proc missiles constantly with zero effort.',
      },
      {
        name: "Kjaro's Band",
        reason: 'Turret hits trigger fire tornadoes on big targets.',
      },
      {
        name: "Harvester's Scythe",
        reason: 'Turret crits heal the turrets themselves.',
      },
      {
        name: 'Bandolier',
        reason: 'Ammo drops refill mines and turret placements faster.',
      },
      // Boss
      {
        name: 'Titanic Knurl',
        reason: 'Turrets inherit the health and regen to stay standing.',
      },
      {
        name: 'Shatterspleen',
        reason: 'Turret crits bleed and chain death explosions.',
      },
      {
        name: "Queen's Gland",
        reason: 'Each turret summons its own Beetle Guards.',
      },
      // Legendary
      {
        name: 'Brilliant Behemoth',
        reason: 'Turret bullets become explosions for hands-free area clear.',
      },
      {
        name: 'Spare Drone Parts',
        reason: 'Turrets gain attack speed and a bouncing chain gun.',
      },
      {
        name: "N'kuhana's Opinion",
        reason: 'Turret regen fuels skulls that fire automatically.',
      },
      {
        name: 'Sentient Meat Hook',
        reason: 'Turret fire hooks enemies into the kill zone.',
      },
      // Hallowed
      {
        name: 'Infernal Mark',
        reason: 'Laser Cutter racks up ten skill hits in about a second.',
      },
      {
        name: 'Nightmare Demon',
        reason: 'Turret fire charges demons he detonates with a skill.',
      },
    ],
  },
  {
    survivor: 'Artificer',
    expansion: '',
    identity:
      'Cooldown burst caster — wants charges and on-kill AoE over on-hit.',
    items: [
      // Common
      {
        name: 'Backup Magazine',
        reason: 'Extra Nano-Bomb or Nano-Spear charges for more burst.',
      },
      {
        name: 'Eclipse Lite',
        reason: 'Her skill-heavy rotation grants barrier as each comes back.',
      },
      {
        name: 'Gasoline',
        reason: 'On-kill fire spreads her damage through packs.',
      },
      {
        name: "Lens-Maker's Glasses",
        reason: 'Crits on big spells mean huge burst spikes.',
      },
      {
        name: 'Crowbar',
        reason: 'Nano-Bomb and Flamethrower open with bonus damage.',
      },
      // Uncommon
      {
        name: "Kjaro's Band",
        reason: 'Big spell hits trigger the fire tornado reliably.',
      },
      {
        name: 'Ignition Tank',
        reason: 'Flamethrower and Gasoline burns deal far more damage.',
      },
      {
        name: 'Luminous Shot',
        reason: 'Secondary charges turn Flame Bolts into lightning strikes.',
      },
      {
        name: "Runald's Band",
        reason: 'Paired with Kjaro for back-to-back burst procs.',
      },
      {
        name: "Harvester's Scythe",
        reason: 'Big crits heal her, covering a fragile caster.',
      },
      {
        name: 'Fuel Cell',
        reason: 'More equipment charges for extra burst options.',
      },
      // Boss
      {
        name: 'Little Disciple',
        reason: 'Sprinting between casts fires free homing wisps.',
      },
      {
        name: 'Molten Perforator',
        reason: 'Spell hits proc lava meteors on top of her burst.',
      },
      {
        name: 'Genesis Loop',
        reason: 'A defensive nova when enemies get too close.',
      },
      // Legendary
      {
        name: 'Alien Head',
        reason: 'Lower cooldowns mean more spells cast per fight.',
      },
      {
        name: 'Hardlight Afterburner',
        reason:
          'More Ion Surge or Tectonic Blast charges for mobility and oil.',
      },
      {
        name: 'Brilliant Behemoth',
        reason: 'Flame Bolts explode on hit for consistent area damage.',
      },
      // Hallowed
      {
        name: 'Totem of Avarice',
        reason:
          'Nano-Bomb and Ion Surge hits clear 400%, turning foes to gold.',
      },
      {
        name: 'Earthbound Vessel',
        reason: 'Extra jumps keep her airborne between hovering casts.',
      },
    ],
  },
  {
    survivor: 'Mercenary',
    expansion: '',
    identity:
      'Crit melee assassin — attack speed and crit keep him airborne and safe.',
    items: [
      // Common
      {
        name: "Lens-Maker's Glasses",
        reason: 'Crits fuel his lifesteal and attack-speed ramp.',
      },
      {
        name: "Soldier's Syringe",
        reason: 'Faster swings mean more hits and more procs.',
      },
      {
        name: "Hiker's Boots",
        reason: 'Rising Thunder and aerial combos strike from above.',
      },
      {
        name: 'Focus Crystal',
        reason: 'He is always in melee range for the bonus damage.',
      },
      {
        name: 'Crowbar',
        reason: 'Opening dashes on fresh targets hit harder.',
      },
      // Uncommon
      {
        name: 'Predatory Instincts',
        reason: 'Crits ramp attack speed for faster combos.',
      },
      {
        name: "Harvester's Scythe",
        reason: 'Crit lifesteal keeps a melee fighter alive.',
      },
      {
        name: 'Breaching Fin',
        reason: 'Launches enemies into the air to keep his juggles going.',
      },
      {
        name: "Berzerker's Pauldron",
        reason: 'Multi-kills from Eviscerate trigger frequent warcries.',
      },
      {
        name: 'Hopoo Feather',
        reason: 'Extra jumps extend his airborne invulnerability tricks.',
      },
      // Boss
      {
        name: 'Shatterspleen',
        reason: 'Crit bleed explodes enemies he cuts down.',
      },
      {
        name: 'Little Disciple',
        reason: 'Constant sprinting fires homing wisps between dashes.',
      },
      {
        name: 'Genesis Loop',
        reason: 'A nova escape when surrounded in melee.',
      },
      // Legendary
      {
        name: 'Hardlight Afterburner',
        reason: 'More Blinding Assault dashes for chained engagements.',
      },
      {
        name: 'Laser Scope',
        reason: 'His crit-stacked build doubles every critical swing.',
      },
      {
        name: 'Brilliant Behemoth',
        reason: 'Sword swings explode for area clear.',
      },
      {
        name: 'Wake of Vultures',
        reason: 'Stolen elite aspects stack on a melee killer.',
      },
      // Hallowed
      {
        name: 'Ritual Helmet',
        reason: 'Sprinting between fights charges the skull for his openers.',
      },
      {
        name: 'Infernal Mark',
        reason: 'Fast multi-hit combos brand targets almost instantly.',
      },
    ],
  },
  {
    survivor: 'REX',
    expansion: '',
    identity:
      'HP-cost sustain caster — healing and max HP to spam its skills safely.',
    items: [
      // Common
      {
        name: 'Topaz Brooch',
        reason: 'Kills grant barrier that soaks its health costs.',
      },
      {
        name: 'Bustling Fungus',
        reason: 'Rooted fights let it stand still and heal.',
      },
      {
        name: 'Cautious Slug',
        reason: 'Out-of-combat regen recovers spent health between fights.',
      },
      {
        name: 'Tougher Times',
        reason: 'Blocked hits matter more when it runs low on purpose.',
      },
      {
        name: 'Medkit',
        reason: 'Heals back each chunk of health it spends.',
      },
      // Uncommon
      {
        name: 'Leeching Seed',
        reason:
          'Every hit heals, paying back Seed Barrage and Bramble Volley costs.',
      },
      {
        name: "Harvester's Scythe",
        reason: 'Crit healing tops up health after each cast.',
      },
      {
        name: 'Infusion',
        reason: 'Permanent max health makes each percentage cost go further.',
      },
      {
        name: 'AtG Missile Mk. 1',
        reason: 'Bramble Volley and syringes proc missiles for extra damage.',
      },
      // Boss
      {
        name: 'Titanic Knurl',
        reason: 'Health and regen directly fuel its skill costs.',
      },
      {
        name: 'Planula',
        reason: 'Flat heal on every hit taken offsets self-damage.',
      },
      {
        name: 'Genesis Loop',
        reason: 'It spends time at low health, so the nova fires often.',
      },
      // Legendary
      {
        name: 'Rejuvenation Rack',
        reason: 'Doubles all its healing, turning costs into a non-issue.',
      },
      {
        name: "N'kuhana's Opinion",
        reason: 'Its constant healing becomes homing skulls.',
      },
      {
        name: 'Aegis',
        reason: 'Overhealing turns into barrier that absorbs costs.',
      },
      // Hallowed
      {
        name: 'Stained Scimitar',
        reason:
          'Big DIRECTIVE: Harvest heals spawn blades it fires with its secondary.',
      },
      {
        name: 'Vengeful Spirit',
        reason: 'The spirit soaks half the damage while it sits low on health.',
      },
    ],
  },
  {
    survivor: 'Loader',
    expansion: '',
    identity: 'Velocity bruiser — movement speed scales her gauntlet damage.',
    items: [
      // Common
      {
        name: "Paul's Goat Hoof",
        reason: 'More speed means harder-hitting charged punches.',
      },
      {
        name: 'Elusive Antlers',
        reason: 'Stacking speed orbs feed straight into punch damage.',
      },
      {
        name: 'Crowbar',
        reason: 'Charged punches open on full-health targets for huge hits.',
      },
      {
        name: 'Personal Shield Generator',
        reason: 'Shield stacks with her passive barrier for a sturdy brawler.',
      },
      {
        name: 'Repulsion Armor Plate',
        reason: 'Flat damage reduction against swarms of small hits.',
      },
      // Uncommon
      {
        name: 'Faraday Spur',
        reason: 'Up to +160% speed from moving, then jumps that explode.',
      },
      {
        name: 'Wax Quail',
        reason: 'Sprint-jump bursts launch her into grapple combos.',
      },
      {
        name: 'Hopoo Feather',
        reason: 'Extra jumps keep her momentum between grapples.',
      },
      {
        name: "Berzerker's Pauldron",
        reason: 'Multi-kills from punches grant speed and attack speed.',
      },
      {
        name: "Kjaro's Band",
        reason: 'Huge punch hits trigger the fire tornado.',
      },
      // Boss
      {
        name: 'Mycelium Cap',
        reason: 'High-speed landings and Thunderslam drops leave spore clouds.',
      },
      {
        name: 'Titanic Knurl',
        reason: 'Health and regen for a frontline brawler.',
      },
      {
        name: 'Charged Perforator',
        reason: 'Big punches proc lightning strikes.',
      },
      {
        name: 'Shatterspleen',
        reason: 'Crit punches bleed and explode enemies.',
      },
      // Legendary
      {
        name: 'H3AD-5T v2',
        reason: 'Downward slams from height pair with her momentum.',
      },
      {
        name: 'Hardlight Afterburner',
        reason: 'More gauntlet charges for back-to-back charged punches.',
      },
      {
        name: 'Orphaned Core',
        reason:
          'The Solus unit inherits her speed items and hits harder for it.',
      },
      {
        name: 'Brilliant Behemoth',
        reason: 'Punch impacts explode across groups.',
      },
      // Hallowed
      {
        name: 'Ritual Helmet',
        reason: 'Her top speed makes the sprinting skull hit enormously hard.',
      },
      {
        name: 'Totem of Avarice',
        reason: 'Charged punches easily clear 400%, turning packs to gold.',
      },
    ],
  },
  {
    survivor: 'Acrid',
    expansion: '',
    identity:
      'DoT bruiser — stack debuffs and lifesteal while poison does the work.',
    items: [
      // Common
      {
        name: 'Tri-Tip Dagger',
        reason: 'Bleed adds another debuff alongside poison or blight.',
      },
      {
        name: "Soldier's Syringe",
        reason: 'Faster slashes apply more debuffs and procs.',
      },
      {
        name: 'Bustling Fungus',
        reason:
          'Holding ground beside Cloying Breath clouds lets the fungus heal.',
      },
      {
        name: 'Medkit',
        reason: 'Heals after taking hits in close-range brawls.',
      },
      {
        name: 'Monster Tooth',
        reason: 'Poison kills drop healing orbs around him.',
      },
      // Uncommon
      {
        name: 'Noxious Thorn',
        reason: 'Kills hand poison and blight stacks to the next enemy.',
      },
      {
        name: 'Death Mark',
        reason: 'Poison, bleed and blight quickly hit the debuff count.',
      },
      {
        name: 'Leeching Seed',
        reason: 'Every slash and bite heals in melee.',
      },
      {
        name: 'Predatory Instincts',
        reason: 'Crits ramp attack speed for more debuff applications.',
      },
      {
        name: "Harvester's Scythe",
        reason: 'Crit bites heal him mid-brawl.',
      },
      // Boss
      {
        name: 'Shatterspleen',
        reason: 'Crits add bleed and death explosions to his DoTs.',
      },
      {
        name: 'Planula',
        reason: 'Flat healing on every hit taken in melee range.',
      },
      {
        name: 'Titanic Knurl',
        reason: 'Health and regen for a frontline poisoner.',
      },
      // Legendary
      {
        name: 'Sentient Meat Hook',
        reason: 'Pulls fleeing enemies back into his poison.',
      },
      {
        name: 'Symbiotic Scorpion',
        reason: 'Fast slashes permanently shred armor on tanky targets.',
      },
      {
        name: "N'kuhana's Opinion",
        reason: 'His regen and lifesteal fire homing skulls.',
      },
      {
        name: 'Wake of Vultures',
        reason: 'Poisoned elites drop aspects to stack.',
      },
      // Hallowed
      {
        name: 'Corpse Lily',
        reason: 'Its teleporter Blight cloud stacks with his own blight build.',
      },
      {
        name: 'Sanguine Chalice',
        reason: 'Tri-Tip and Chalice bleeds turn into steady healing.',
      },
    ],
  },
  {
    survivor: 'Captain',
    expansion: '',
    identity:
      'On-hit support — proc items and bleed explosions off the shotgun blast.',
    items: [
      // Common
      {
        name: 'Tri-Tip Dagger',
        reason: 'Every shotgun pellet rolls bleed.',
      },
      {
        name: "Lens-Maker's Glasses",
        reason: 'Pellet crits feed Shatterspleen bursts.',
      },
      {
        name: "Soldier's Syringe",
        reason: 'Faster shotgun charge and more pellets per second.',
      },
      {
        name: 'Backup Magazine',
        reason: 'Extra Power Tazer charges for more stuns.',
      },
      {
        name: 'Crowbar',
        reason: 'Full-charge blasts open on fresh targets.',
      },
      // Uncommon
      {
        name: 'Ukulele',
        reason: 'Pellet spreads chain lightning through groups.',
      },
      {
        name: 'AtG Missile Mk. 1',
        reason: 'Many pellets per shot proc missiles reliably.',
      },
      {
        name: "Kjaro's Band",
        reason: 'Big shotgun blasts trigger fire tornadoes.',
      },
      {
        name: 'Squid Polyp',
        reason: 'Beacons and interactables summon extra squid turrets.',
      },
      // Boss
      {
        name: 'Shatterspleen',
        reason: 'Pellet crits bleed and explode packs on death.',
      },
      {
        name: 'Charged Perforator',
        reason: 'Shotgun procs call lightning on single targets.',
      },
      {
        name: 'Defense Nucleus',
        reason: 'Elite kills build an army of constructs around him.',
      },
      {
        name: 'Molten Perforator',
        reason: 'Pellet procs rain lava meteors.',
      },
      // Legendary
      {
        name: 'Sentient Meat Hook',
        reason: 'Pellet spreads hook groups together.',
      },
      {
        name: '57 Leaf Clover',
        reason: 'Rerolls his many proc chances toward success.',
      },
      {
        name: 'Resonance Disc',
        reason: 'Kills charge the disc for big area nukes.',
      },
      // Hallowed
      {
        name: 'Vile Censer',
        reason: 'Power Tazer stuns, then pellets chain smoke between enemies.',
      },
      {
        name: 'Infernal Mark',
        reason: 'A full shotgun blast lands ten skill hits at once.',
      },
    ],
  },
  {
    survivor: 'Railgunner',
    expansion: 'Survivors of the Void',
    identity: 'Per-hit crit sniper — multipliers to one-shot priority targets.',
    items: [
      // Common
      {
        name: "Lens-Maker's Glasses",
        reason: 'Crits off-weak-point keep unscoped shots dangerous.',
      },
      {
        name: 'Crowbar',
        reason: 'Scoped shots on full-health targets get the bonus.',
      },
      {
        name: 'Armor-Piercing Rounds',
        reason: 'Her slow, heavy shots are best spent on bosses.',
      },
      {
        name: 'Delicate Watch',
        reason: 'She fights from range, so the damage bonus rarely breaks.',
      },
      {
        name: "Soldier's Syringe",
        reason: 'Attack speed shortens the gap between her heavy shots.',
      },
      // Uncommon
      {
        name: "Kjaro's Band",
        reason: 'Every big shot triggers the fire tornado.',
      },
      {
        name: "Runald's Band",
        reason: 'Pairs with Kjaro for back-to-back burst.',
      },
      {
        name: 'Predatory Instincts',
        reason: 'Crits speed up her slow fire rate.',
      },
      {
        name: 'Death Mark',
        reason: 'Debuffed targets take more from her finishing shots.',
      },
      // Boss
      {
        name: 'Shatterspleen',
        reason: 'Big crits bleed and explode enemies.',
      },
      {
        name: 'Charged Perforator',
        reason: 'Heavy hits call extra lightning.',
      },
      {
        name: 'Molten Perforator',
        reason: 'Big shots proc lava meteors.',
      },
      // Legendary
      {
        name: 'Laser Scope',
        reason: 'Weak-point crits deal double, deleting priority targets.',
      },
      {
        name: 'Shattering Justice',
        reason: 'Armor shred amplifies every high-damage shot.',
      },
      {
        name: 'Runic Lens',
        reason: 'Meteor chance and damage scale with her huge per-shot damage.',
      },
      {
        name: '57 Leaf Clover',
        reason: 'Rerolls her few but critical proc chances.',
      },
      // Hallowed
      {
        name: 'Totem of Avarice',
        reason: 'Every scoped shot clears 400%, golding enemies around it.',
      },
      {
        name: 'Nightmare Demon',
        reason: 'Huge shots fill the demon charge in one or two hits.',
      },
    ],
  },
  {
    survivor: 'Void Fiend',
    expansion: 'Survivors of the Void',
    identity:
      'Corruption duality — crit and attack speed plus shields for sustain.',
    items: [
      // Common
      {
        name: "Lens-Maker's Glasses",
        reason: 'Crits boost both his corrupted and uncorrupted forms.',
      },
      {
        name: 'Topaz Brooch',
        reason: 'Kills grant barrier during risky corruption phases.',
      },
      {
        name: "Soldier's Syringe",
        reason: 'Faster Drown fire applies more procs.',
      },
      {
        name: 'Crowbar',
        reason: 'Corrupted bursts open on fresh targets.',
      },
      // Uncommon
      {
        name: 'Predatory Instincts',
        reason: 'Crits ramp his attack speed in both forms.',
      },
      {
        name: "Harvester's Scythe",
        reason: 'Crit healing sustains him while corrupted.',
      },
      {
        name: 'Leeching Seed',
        reason: 'Drown hits heal steadily.',
      },
      {
        name: 'Death Mark',
        reason: 'Debuffed targets take extra damage from his beams.',
      },
      // Boss
      {
        name: 'Shatterspleen',
        reason: 'Crit bleed explosions clear packs.',
      },
      {
        name: "Queen's Gland",
        reason: 'Beetle guards draw aggro while he channels.',
      },
      {
        name: 'Planula',
        reason: 'Flat healing on hit taken during corruption.',
      },
      // Legendary
      {
        name: 'Brilliant Behemoth',
        reason: 'Drown hits explode for area damage.',
      },
      {
        name: "N'kuhana's Opinion",
        reason: 'His healing turns into homing skulls.',
      },
      {
        name: 'Alien Head',
        reason: 'Faster Trespass and Suppress cooldowns between forms.',
      },
      // Hallowed
      {
        name: 'Stained Scimitar',
        reason: 'Suppress heals in big chunks, summoning ghost blades.',
      },
      {
        name: 'Vengeful Spirit',
        reason: 'The spirit absorbs damage he takes while corrupted.',
      },
    ],
  },
  {
    survivor: 'Seeker',
    expansion: 'Seekers of the Storm',
    identity:
      'Burst multiplier — band procs and barrier sustain around Tranquility.',
    items: [
      // Common
      {
        name: 'Crowbar',
        reason: 'Spirit Punch combos open with bonus damage.',
      },
      {
        name: 'Tri-Tip Dagger',
        reason: 'Fast punches stack bleed.',
      },
      {
        name: "Soldier's Syringe",
        reason: 'Faster punches mean more procs per combo.',
      },
      {
        name: 'Bison Steak',
        reason: 'Max health scales Meditate healing and barrier.',
      },
      // Uncommon
      {
        name: "Runald's Band",
        reason: 'Unseen Hand and punch hits trigger ice blasts.',
      },
      {
        name: "Harvester's Scythe",
        reason: 'Crit healing tops up her health.',
      },
      {
        name: 'Leeching Seed',
        reason: 'Every punch heals her.',
      },
      {
        name: 'Razorwire',
        reason: 'Punishes enemies that swarm her in melee.',
      },
      // Boss
      {
        name: 'Shatterspleen',
        reason: 'Crit punches bleed and explode.',
      },
      {
        name: 'Titanic Knurl',
        reason: 'Max health scales Meditate healing.',
      },
      {
        name: 'Charged Perforator',
        reason: 'Punch procs call lightning.',
      },
      // Legendary
      {
        name: 'Sentient Meat Hook',
        reason: 'Pulls groups into her punch range.',
      },
      {
        name: 'Rejuvenation Rack',
        reason: 'Doubles Unseen Hand and Meditate healing.',
      },
      {
        name: 'Hardlight Afterburner',
        reason: 'More Sojourn charges for repositioning and stuns.',
      },
      // Hallowed
      {
        name: 'Stained Scimitar',
        reason: 'Unseen Hand heals her in chunks, summoning ghost blades.',
      },
      {
        name: 'Vengeful Spirit',
        reason: 'Absorbs half the damage she takes in melee.',
      },
    ],
  },
  {
    survivor: 'CHEF',
    expansion: 'Seekers of the Storm',
    identity:
      'On-hit proc bruiser — double-hit cleavers and oil-fed burns love proc items.',
    items: [
      // Common
      {
        name: 'Gasoline',
        reason: 'On-kill fire spreads alongside Sear burns.',
      },
      {
        name: "Soldier's Syringe",
        reason: 'Faster cleaver throws mean more hits.',
      },
      {
        name: "Lens-Maker's Glasses",
        reason: 'Cleavers hit twice, rolling crit each time.',
      },
      {
        name: 'Crowbar',
        reason: 'Boosted skills open on fresh targets.',
      },
      // Uncommon
      {
        name: 'Ignition Tank',
        reason: 'Sear on oiled targets burns far harder with this.',
      },
      {
        name: 'AtG Missile Mk. 1',
        reason: 'Double-hit cleavers proc missiles often.',
      },
      {
        name: 'Ukulele',
        reason: 'Cleaver hits chain lightning through crowds.',
      },
      {
        name: "Kjaro's Band",
        reason: 'Boosted Dice hits trigger the fire tornado.',
      },
      {
        name: "Runald's Band",
        reason: 'Pairs with Kjaro on big boosted cleaver hits.',
      },
      // Boss
      {
        name: 'Shatterspleen',
        reason: 'Cleaver crits bleed and explode.',
      },
      {
        name: 'Molten Perforator',
        reason: 'Many cleaver hits proc lava meteors.',
      },
      {
        name: 'Charged Perforator',
        reason: 'Cleaver procs call lightning.',
      },
      // Legendary
      {
        name: 'Brilliant Behemoth',
        reason: 'Every cleaver hit explodes.',
      },
      {
        name: 'Shattering Justice',
        reason: 'Armor shred amplifies all cleaver hits.',
      },
      {
        name: 'Wake of Vultures',
        reason: 'Elite kills stack aspects.',
      },
      // Hallowed
      {
        name: 'Infernal Mark',
        reason: 'Double-hit cleavers rack up skill hits fast.',
      },
      {
        name: 'Nightmare Demon',
        reason: 'Sixteen-cleaver Boosted Dice charges and pops demons fast.',
      },
    ],
  },
  {
    survivor: 'False Son',
    expansion: 'Seekers of the Storm',
    identity:
      'HP-stacking tank — every health item feeds Growth in a feedback loop.',
    items: [
      // Common
      {
        name: 'Bison Steak',
        reason: 'Flat max health feeds Growth directly.',
      },
      {
        name: 'Tri-Tip Dagger',
        reason: 'Lunar Spikes and club hits stack bleed.',
      },
      {
        name: "Paul's Goat Hoof",
        reason: 'Speed for a slow, heavy bruiser.',
      },
      {
        name: "Soldier's Syringe",
        reason: 'Faster club swings and laser ticks.',
      },
      // Uncommon
      {
        name: 'Infusion',
        reason: 'Permanent max health from kills keeps raising Growth.',
      },
      {
        name: 'Leeching Seed',
        reason: 'Hits heal in long brawls.',
      },
      {
        name: 'Death Mark',
        reason: 'Lunar Ruin and bleed stack debuffs quickly.',
      },
      {
        name: 'Predatory Instincts',
        reason: 'Crits speed up club swings.',
      },
      // Boss
      {
        name: 'Titanic Knurl',
        reason: 'Health and regen feed Growth.',
      },
      {
        name: 'Planula',
        reason: 'Flat healing on every hit taken.',
      },
      {
        name: 'Charged Perforator',
        reason: 'Heavy club hits call lightning.',
      },
      // Legendary
      {
        name: 'Sentient Meat Hook',
        reason: 'Pulls groups into his club range.',
      },
      {
        name: 'Rejuvenation Rack',
        reason: 'Doubles healing for a huge health pool.',
      },
      {
        name: 'Wake of Vultures',
        reason: 'Elite aspects stack on a tank.',
      },
      // Hallowed
      {
        name: 'Totem of Avarice',
        reason:
          'Charged club slams clear 400%, turning nearby enemies to gold.',
      },
      {
        name: 'Vengeful Spirit',
        reason: 'Absorbs half the damage on a frontline tank.',
      },
    ],
  },
  {
    survivor: 'Operator',
    expansion: 'Alloyed Collective',
    identity:
      "Drone commander — drones inherit Operator's items through ADMIN-OVERRIDE.",
    items: [
      // Common
      {
        name: 'Crowbar',
        reason: 'Bonus opening damage stacks with focused drone-target fire.',
      },
      {
        name: 'Backup Magazine',
        reason: 'Extra secondary charges mean more commands issued to drones.',
      },
      {
        name: 'Bolstering Lantern',
        reason: 'A drone fleet nearby counts toward the attack speed buff.',
      },
      {
        name: 'Topaz Brooch',
        reason: 'Drone-assisted kills grant barrier to keep Operator safe.',
      },
      {
        name: 'Cautious Slug',
        reason: 'Out-of-combat regen sustains a backline commander.',
      },
      // Uncommon
      {
        name: 'Box of Dynamite',
        reason: 'Every drone drops stunning dynamite in combat.',
      },
      {
        name: 'AtG Missile Mk. 1',
        reason: 'Drone and personal hits proc reliable missile salvos.',
      },
      {
        name: 'Squid Polyp',
        reason: 'More allied turrets reinforce the summon-focused playstyle.',
      },
      {
        name: "Will-o'-the-wisp",
        reason: 'Drone-cleared kills detonate area explosions on packs.',
      },
      // Boss
      {
        name: 'Faulty Conductor',
        reason: 'Energize pulses speed up Operator and the whole drone fleet.',
      },
      {
        name: 'Empathy Cores',
        reason: 'Two combat drones directly amplify the commander identity.',
      },
      {
        name: 'Defense Nucleus',
        reason: 'Elite kills spawn fighting constructs, growing the swarm.',
      },
      {
        name: "Queen's Gland",
        reason: 'Beetle guards add another autonomous minion to the army.',
      },
      // Legendary
      {
        name: 'Spare Drone Parts',
        reason: 'Buffs and arms every drone in the fleet.',
      },
      {
        name: 'Brilliant Behemoth',
        reason: "Splash extends Operator's and the drones' attacks to areas.",
      },
      {
        name: 'Resonance Disc',
        reason: 'Charges from kills then fires a heavy backline laser.',
      },
      {
        name: 'Orphaned Core',
        reason: 'Another autonomous Solus unit joins the fleet.',
      },
      // Hallowed
      {
        name: 'Corpse Lily',
        reason: 'A teleporter Blight cloud while the drones hold the zone.',
      },
      {
        name: 'Vengeful Spirit',
        reason: 'Absorbs half the damage while the drones hold the line.',
      },
    ],
  },
  {
    survivor: 'Drifter',
    expansion: 'Alloyed Collective',
    identity:
      'Melee scavenger — hits generate Junk, and scrap in her bag powers her stats.',
    items: [
      // Common
      {
        name: "Soldier's Syringe",
        reason: 'Faster Blunt Force swings roll for Junk more often.',
      },
      {
        name: 'Crowbar',
        reason: 'Bonus damage on her heavy scavenged-weapon openers.',
      },
      {
        name: "Paul's Goat Hoof",
        reason: 'Speed helps her reposition between Repossess throws.',
      },
      {
        name: 'Bustling Fungus',
        reason: 'Standing still heals while she works the junk pile.',
      },
      // Uncommon
      {
        name: 'Predatory Instincts',
        reason: 'Crit stacks reward her rapid melee combos.',
      },
      {
        name: 'AtG Missile Mk. 1',
        reason: 'Frequent melee hits proc steady missile damage.',
      },
      {
        name: 'Bandolier',
        reason: 'Ammo pickups restore skill charges between fights.',
      },
      {
        name: "Harvester's Scythe",
        reason: 'Crit lifesteal sustains her aggressive brawling.',
      },
      // Boss
      {
        name: 'Shatterspleen',
        reason: 'Crit bleed scales with her fast multi-hit attacks.',
      },
      {
        name: 'Titanic Knurl',
        reason: 'Bonus health and regen support a frontline scavenger.',
      },
      {
        name: 'Charged Perforator',
        reason: 'Hard hits trigger lightning to clear surrounding foes.',
      },
      // Legendary
      {
        name: '57 Leaf Clover',
        reason: 'Rerolls her many on-hit effects toward favourable procs.',
      },
      {
        name: 'Brilliant Behemoth',
        reason: 'Splash turns her junk attacks into area clear.',
      },
      {
        name: 'Sentient Meat Hook',
        reason: 'Drags packs into range of her swings and Junk Cubes.',
      },
      // Hallowed
      {
        name: 'Vile Censer',
        reason: 'Cleanup junk balls stun, so follow-up hits chain smoke.',
      },
      {
        name: 'Nightmare Demon',
        reason: 'Fast melee charges demons that set off her on-kill effects.',
      },
    ],
  },
  {
    survivor: 'Enforcer',
    expansion: 'Hallowed Concepts',
    identity:
      'Shield-wall bruiser — barrier and shield fuel Surge Protection, cooldowns keep the stance cycling.',
    items: [
      // Common
      {
        name: 'Eclipse Lite',
        reason:
          'Each skill off cooldown adds barrier for Surge Protection to spend.',
      },
      {
        name: 'Topaz Brooch',
        reason:
          'Kill barrier stacks up, then Surge Protection detonates it as damage.',
      },
      {
        name: 'Personal Shield Generator',
        reason: 'Surge Protection consumes shield too, adding flat damage.',
      },
      {
        name: 'Bolstering Lantern',
        reason: 'Holding a shield wall means enemies are always within 20m.',
      },
      {
        name: "Lens-Maker's Glasses",
        reason: 'Parry reflections and Big Man slams can crit too.',
      },
      {
        name: 'Backup Magazine',
        reason: 'A second stance charge lets him re-shield right after a bash.',
      },
      // Uncommon
      {
        name: 'Kinetic Dampener',
        reason:
          'Shield and armor for a tank, and its break pulse stuns the line.',
      },
      {
        name: 'Ukulele',
        reason: 'Defensive Stance pellets pierce, chaining lightning widely.',
      },
      {
        name: "Harvester's Scythe",
        reason: 'Tracer guarantees a crit every magazine, healing him.',
      },
      {
        name: 'AtG Missile Mk. 1',
        reason: 'Six pellets per stance shot proc missiles reliably.',
      },
      {
        name: "Berzerker's Pauldron",
        reason: 'Rally Point slams and pellet sprays chain multi-kills.',
      },
      // Boss
      {
        name: 'Mycelium Cap',
        reason: 'Big Man and Crash Point landings leave damaging spore clouds.',
      },
      {
        name: 'Titanic Knurl',
        reason: 'Health and regen for a fortress that stands in the open.',
      },
      {
        name: 'Genesis Loop',
        reason: 'A stunning nova when the shield wall gets flanked.',
      },
      {
        name: 'Charged Perforator',
        reason: 'Slug hits call lightning on targets behind the line.',
      },
      // Legendary
      {
        name: 'Aegis',
        reason: 'Overhealing becomes barrier for Surge Protection to cash in.',
      },
      {
        name: 'Alien Head',
        reason: 'He plays around cooldowns, cycling stance and Rally Point.',
      },
      {
        name: 'Hardlight Afterburner',
        reason: 'Extra Shield Tackle charges extend each held dash.',
      },
      {
        name: 'Brilliant Behemoth',
        reason: 'Pellets and slugs explode on impact for area control.',
      },
      // Hallowed
      {
        name: 'Vile Censer',
        reason:
          'His bash, tackle and slams all stun, so his next hit chains smoke.',
      },
      {
        name: 'Totem of Avarice',
        reason: 'Parry reflections and Crash Point clear 400% with ease.',
      },
      {
        name: 'Vengeful Spirit',
        reason: 'An extra layer of damage absorption behind the shield.',
      },
    ],
  },
  {
    survivor: 'Acolyte',
    expansion: 'Hallowed Concepts',
    identity:
      'Soul-reaping duelist — healing turns into attack speed, and Sacrifice feeds the Litany.',
    items: [
      // Common
      {
        name: "Soldier's Syringe",
        reason: 'Attack speed adds hits to every quickstrike, up to nine.',
      },
      {
        name: 'Bolstering Lantern',
        reason: 'She fights inside packs, so the attack speed is always up.',
      },
      {
        name: 'Monster Tooth',
        reason: "Heal orbs become attack speed through her N'kuhana passives.",
      },
      {
        name: "Lens-Maker's Glasses",
        reason: 'Multi-hit quickstrikes roll crit on every hit.',
      },
      {
        name: 'Tri-Tip Dagger',
        reason: 'Quickstrikes land several hits, stacking bleed quickly.',
      },
      {
        name: 'Crowbar',
        reason: 'Sacrifice opens on fresh targets for even more damage.',
      },
      // Uncommon
      {
        name: 'Leeching Seed',
        reason:
          'Every hit is a heal, and every heal adds attack speed for her.',
      },
      {
        name: 'Noxious Thorn',
        reason: 'Spreads Soul Jar Haunt on kill, multiplying the wights.',
      },
      {
        name: "Harvester's Scythe",
        reason: 'Crit heals convert into more attack speed stacks.',
      },
      {
        name: 'Predatory Instincts',
        reason: 'Crits stack attack speed on top of her healing buffs.',
      },
      {
        name: 'Ukulele',
        reason: 'Sacrifice procs can kill with lightning for extra Conviction.',
      },
      // Boss
      {
        name: 'Whispering Fragment',
        reason: 'Her kill rate keeps an orbiting spirit attacking with her.',
      },
      {
        name: 'Titanic Knurl',
        reason: 'Regen converts into permanent attack speed under her passive.',
      },
      {
        name: 'Shatterspleen',
        reason: 'Quickstrike crits bleed and explode packs on death.',
      },
      {
        name: 'Charged Perforator',
        reason: 'Sacrifice and quickstrike hits call extra lightning.',
      },
      // Legendary
      {
        name: 'Alien Head',
        reason: 'Faster Sacrifice means Convictions and Litanies come sooner.',
      },
      {
        name: 'Rejuvenation Rack',
        reason: 'Doubled healing means far more attack speed from her passive.',
      },
      {
        name: 'Hardlight Afterburner',
        reason: 'Extra Javelin or Blade Sling charges for chained dashes.',
      },
      {
        name: 'Brainstalks',
        reason: 'Elite kills free Sacrifice to spam Convictions.',
      },
      // Hallowed
      {
        name: 'Vile Censer',
        reason: 'Bola and Javelin stun, so her follow-ups chain smoke.',
      },
      {
        name: 'Infernal Mark',
        reason: 'Quickstrikes land up to nine hits, branding almost at once.',
      },
      {
        name: 'Nightmare Demon',
        reason: 'Multi-hit slashes charge demons that pop her on-kill effects.',
      },
    ],
  },
];
