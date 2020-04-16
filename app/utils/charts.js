import _ from 'lodash'

const generateTicks = (ticksCount, maxValue) => {
  const step = Math.floor(maxValue / ticksCount)
  const remainder = maxValue % step
  const maxTick = remainder === 0
    ? maxValue + step
    : maxValue + (step - remainder) + step

  return _.range(0, maxTick, step)
}

export {
  generateTicks,
}
