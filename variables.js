var player = JSON.parse(localStorage.getItem(`DimDim`)) || {}

function reviveLS(prop, els = `0`) {
  if (player[prop])
    player[prop] = LS(player[prop])
  else
    player[prop] = LS(els)
}

reviveLS(`antimatter`, 10)
reviveLS(`speedcrystals`)
reviveLS(`boosts`)
reviveLS(`boostpower`)
reviveLS(`galaxies`)
reviveLS(`galacticpower`)
if (!player.lastupdate) player.lastupdate = Date.now()

for (i = 1; i < 9; i++) {
  reviveLS(`antimatter${i}amount`)
  reviveLS(`antimatter${i}bought`)

  reviveLS(`speed${i}amount`)
  reviveLS(`speed${i}bought`)

  reviveLS(`booster${i}amount`)

  reviveLS(`galactic${i}amount`)

  reviveLS(`infinity${i}amount`)
  reviveLS(`infinity${i}bought`)

  reviveLS(`replicating${i}amount`)
  reviveLS(`replicating${i}bought`)

  reviveLS(`time${i}amount`)
  reviveLS(`time${i}bought`)

  reviveLS(`knowledge${i}amount`)
  reviveLS(`knowledge${i}bought`)

  reviveLS(`tachyonic${i}amount`)
  reviveLS(`tachyonic${i}bought`)
}

function save() {
  localStorage.setItem(`DimDim`, JSON.stringify(player))
}
setInterval(save, 1000)
