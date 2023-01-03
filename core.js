function mainloop() {

  temp = (Date.now() - player.lastupdate) / 1000

  for (i = 7; i > 0; i--) {
    player[`galactic${i}amount`] = player[`galactic${i}amount`].add(getprod(`galactic${i + 1}`).mul(temp))
  }
  player.galacticpower = player.galacticpower.add(getprod(`galactic1`).mul(temp))

  for (i = 7; i > 0; i--) {
    player[`booster${i}amount`] = player[`booster${i}amount`].add(getprod(`booster${i + 1}`).mul(temp))
  }
  player.boostpower = player.boostpower.add(getprod(`booster1`).mul(temp))

  for (i = 7; i > 0; i--) {
    player[`speed${i}amount`] = player[`speed${i}amount`].add(getprod(`speed${i + 1}`).mul(temp))
  }
  player.speedcrystals = player.speedcrystals.add(getprod(`speed1`).mul(temp))

  for (i = 7; i > 0; i--) {
    player[`antimatter${i}amount`] = player[`antimatter${i}amount`].add(getprod(`antimatter${i + 1}`).mul(temp))
  }
  player.antimatter = player.antimatter.add(getprod(`antimatter1`).mul(temp)).softcap(Number.MAX_VALUE, 1)
  player.lastupdate = Date.now()
}

function getspeedcrystaleff() {
  return player.speedcrystals.root(7.5).max(1)
}

function getboostpowereff() {
  return player.boostpower.root(5).max(1)
}

function getgalacticpowereff() {
  return player.galacticpower.mul(1e10).log(1e10).max(1).sub(1)
}

function getboostreq() {
  return player.boosts.add(2).trunc()
}

function getgalaxyreq() {
  return player.galaxies.mul(2).add(4).trunc()
}

function getboosttext() {
  if (player.antimatter8bought.lt(getboostreq()))
    return `Requires ${getboostreq().mul(10).toFixed(0)} Anti D8`
  else if (player.boosts.eq(0))
    return `Reset previous progress to unlock Booster D1`
  else if (player.boosts.eq(1))
    return `Reset previous progress to unlock Booster D2`
  else if (player.boosts.eq(2))
    return `Reset previous progress to unlock Booster D3`
  else if (player.boosts.eq(3))
    return `Reset previous progress to unlock Booster D4`
  else if (player.boosts.eq(4))
    return `Reset previous progress to unlock Booster D5`
  else if (player.boosts.eq(5))
    return `Reset previous progress to unlock Booster D6`
  else if (player.boosts.eq(6))
    return `Reset previous progress to unlock Booster D7`
  else if (player.boosts.eq(7))
    return `Reset previous progress to unlock Booster D8`
  else
    return `Reset previous progress for a boost to all Booster Dims`
}

function getgalaxytext() {
  if (player.speed8bought.lt(getgalaxyreq()))
    return `Requires ${getgalaxyreq().mul(10).toFixed(0)} Speed D8`
  else if (player.galaxies.eq(0))
    return `Reset previous progress to unlock Galactic D1`
  else if (player.galaxies.eq(1))
    return `Reset previous progress to unlock Galactic D2`
  else if (player.galaxies.eq(2))
    return `Reset previous progress to unlock Galactic D3`
  else if (player.galaxies.eq(3))
    return `Reset previous progress to unlock Galactic D4`
  else if (player.galaxies.eq(4))
    return `Reset previous progress to unlock Galactic D5`
  else if (player.galaxies.eq(5))
    return `Reset previous progress to unlock Galactic D6`
  else if (player.galaxies.eq(6))
    return `Reset previous progress to unlock Galactic D7`
  else if (player.galaxies.eq(7))
    return `Reset previous progress to unlock Galactic D8`
  else
    return `Reset previous progress for a boost to Galactic D`
}

function getmult(d) {
  if (d.startsWith(`antimatter`))
    return LS(2).pow(player[`${d}bought`]).mul(getspeedcrystaleff()).mul(getboostpowereff())
  else if (d.startsWith(`speed`))
    return LS(2).add(getgalacticpowereff()).pow(player[`${d}bought`])
  else if (d.startsWith(`booster`))
    return LS(2).pow(player.boosts.sub(8))
  else if (d.startsWith(`galactic`))
    return LS(2).pow(player.galaxies.sub(8))
}

function getprod(d) {
  return player[`${d}amount`].mul(getmult(d))
}

const DIMCOSTS = {
  antimatter1: LS(1e1),
  antimatter2: LS(1e2),
  antimatter3: LS(1e4),
  antimatter4: LS(1e6),
  antimatter5: LS(1e9),
  antimatter6: LS(1e13),
  antimatter7: LS(1e18),
  antimatter8: LS(1e24),
  speed1: LS(1e2),
  speed2: LS(1e4),
  speed3: LS(1e8),
  speed4: LS(1e12),
  speed5: LS(1e18),
  speed6: LS(1e26),
  speed7: LS(1e36),
  speed8: LS(1e48),
}

const DIMCOSTSCALING = {
  antimatter1: LS(1e3),
  antimatter2: LS(1e4),
  antimatter3: LS(1e5),
  antimatter4: LS(1e6),
  antimatter5: LS(1e8),
  antimatter6: LS(1e10),
  antimatter7: LS(1e12),
  antimatter8: LS(1e15),
  speed1: LS(1e6),
  speed2: LS(1e8),
  speed3: LS(1e10),
  speed4: LS(1e12),
  speed5: LS(1e16),
  speed6: LS(1e20),
  speed7: LS(1e24),
  speed8: LS(1e30),
}

function getcost(d) {
  var temp = DIMCOSTS[d].mul(DIMCOSTSCALING[d].pow(player[`${d}bought`]))
  return temp
}

function buydim(d) {
  currency = `antimatter`
  if (player[currency].lt(getcost(d)))
    return
  player[currency] = player[currency].sub(getcost(d))
  player[`${d}amount`] = player[`${d}amount`].add(10)
  player[`${d}bought`] = player[`${d}bought`].add(1)
}

function getboostergemgain() {
  return player.antimatter8bought
}

function boost() {
  if (player.antimatter8bought.lt(getboostreq())) return

  player.boosts = player.boosts.add(1)

  for (i = 1; i < 9; i++) {
    player[`antimatter${i}amount`] = LS(0)
    player[`antimatter${i}bought`] = LS(0)
    player[`speed${i}amount`] = LS(0)
    player[`speed${i}bought`] = LS(0)
  }
  player.antimatter = LS(10)
  player.speedcrystals = LS(0)

  if (player.boosts.eq(1)) player.booster1amount = LS(10)
  if (player.boosts.eq(2)) player.booster2amount = LS(10)
  if (player.boosts.eq(3)) player.booster3amount = LS(10)
  if (player.boosts.eq(4)) player.booster4amount = LS(10)
  if (player.boosts.eq(5)) player.booster5amount = LS(10)
  if (player.boosts.eq(6)) player.booster6amount = LS(10)
  if (player.boosts.eq(7)) player.booster7amount = LS(10)
  if (player.boosts.eq(8)) player.booster8amount = LS(10)
}

function galaxy() {
  if (player.speed8bought.lt(getgalaxyreq())) return

  player.galaxies = player.galaxies.add(1)

  for (i = 1; i < 9; i++) {
    player[`antimatter${i}amount`] = LS(0)
    player[`antimatter${i}bought`] = LS(0)
    player[`speed${i}amount`] = LS(0)
    player[`speed${i}bought`] = LS(0)
    player[`booster${i}amount`] = LS(0)
    player[`booster${i}bought`] = LS(0)
  }
  player.antimatter = LS(10)
  player.speedcrystals = LS(0)
  player.boostpower = LS(0)
  player.boosts = LS(0)

  if (player.galaxies.eq(1)) player.galactic1amount = LS(10)
  if (player.galaxies.eq(2)) player.galactic2amount = LS(10)
  if (player.galaxies.eq(3)) player.galactic3amount = LS(10)
  if (player.galaxies.eq(4)) player.galactic4amount = LS(10)
  if (player.galaxies.eq(5)) player.galactic5amount = LS(10)
  if (player.galaxies.eq(6)) player.galactic6amount = LS(10)
  if (player.galaxies.eq(7)) player.galactic7amount = LS(10)
  if (player.galaxies.eq(8)) player.galactic8amount = LS(10)
}

function maxall() {

  for (i = 8; i > 0; i--) {
    for (j = 1; j < 1001; j++) {
      buydim(`antimatter${i}`)
      buydim(`speed${i}`)
    }
  }
}

setInterval(mainloop, 10)

onkeydown = (event) => {
  if (event.key == `m`) {
    maxall()
  }
  if (event.key == `ArrowRight` && event.shiftKey == true) {
    maxall()
    player.lastupdate -= 1000
    maxall()
  }
}

function reset() {
  localStorage.clear()
  location.reload()
}