let Updater = (update, interval) => {
  let timer = 0
  if (!timer)
    timer = setInterval(_ => update(), interval * 1000)

  return {
    stop: () => {
      clearInterval(timer)
      timer = 0
    },
    continue: () => {
      if (!timer)
        timer = setInterval(update, interval * 1000)
    },
    updateInterval: (newInterval) => {
      clearInterval(timer)
      timer = setInterval(update, newInterval * 1000)
    }
  }
}

module.exports = Updater
