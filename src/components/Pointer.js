import { ShakeRotate } from 'reshake'
import styled from 'styled-components'
import * as hx from '../helpers'

const Pointer = styled.div`
  --reactour-accent: ${props => props.accentColor};
  border-right: 31px solid ${props => props.background};
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  ${'' /* top: 20px;
  left: -30px; */}
  width: 0;
  height: 0;
  position: fixed;
  ${'' /* top: 0;
  left: -30px; */}
  z-index: 1000000;
  transform: ${props => {
    const {
      targetTop,
      targetRight,
      targetBottom,
      targetLeft,
      windowWidth,
      windowHeight,
      helperWidth,
      helperHeight,
      helperPosition,
      padding,
    } = props

    const available = {
      left: targetLeft,
      right: windowWidth - targetRight,
      top: targetTop,
      bottom: windowHeight - targetBottom,
    }

    const couldPositionAt = position => {
      return (
        available[position] >
        (hx.isHoriz(position)
          ? helperWidth + padding * 2
          : helperHeight + padding * 2)
      )
    }

    const autoPosition = () => {
      const positionsOrder = hx.bestPositionOf(available)
      for (let j = 0; j < positionsOrder.length; j++) {
        if (couldPositionAt(positionsOrder[j])) {
          return positionsOrder[j]
        }
      }
      return 'center'
    }

    const pos = helperPosition => {
      if (Array.isArray(helperPosition)) {
        const isOutX = hx.isOutsideX(helperPosition[0], windowWidth)
        const isOutY = hx.isOutsideY(helperPosition[1], windowHeight)
        const warn = (axis, num) => {
          console.warn(
            `${axis}:${num} is outside window, falling back to center`
          )
        }
        if (isOutX) warn('x', helperPosition[0])
        if (isOutY) warn('y', helperPosition[1])
        return [
          isOutX ? windowWidth / 2 - helperWidth / 2 : helperPosition[0],
          isOutY ? windowHeight / 2 - helperHeight / 2 : helperPosition[1],
        ]
      }

      const hX = hx.isOutsideX(targetLeft + helperWidth, windowWidth)
        ? hx.isOutsideX(targetRight + padding, windowWidth)
          ? targetRight - helperWidth
          : targetRight - helperWidth + padding
        : targetLeft - padding
      const x = hX > padding ? hX : padding
      const hY = hx.isOutsideY(targetTop + helperHeight, windowHeight)
        ? hx.isOutsideY(targetBottom + padding, windowHeight)
          ? targetBottom - helperHeight
          : targetBottom - helperHeight + padding
        : targetTop - padding
      const y = hY > padding ? hY : padding
      const coords = {
        top: [x, targetTop - 30 - helperHeight - padding * 2],
        right: [targetRight + 30 + padding * 2, y],
        bottom: [x, targetBottom + 30 + padding * 2],
        left: [targetLeft - helperWidth - 30 - padding * 2, y],
        center: [
          windowWidth / 2 - helperWidth / 2,
          windowHeight / 2 - helperHeight / 2,
        ],
      }
      if (helperPosition === 'center' || couldPositionAt(helperPosition)) {
        return helperPosition
      }
      return autoPosition()
    }

    const p = pos(helperPosition)
    if (p == 'center') return 'rotate(0deg)'
    if (p == 'top') return 'rotate(270deg)'
    if (p == 'bottom') return 'rotate(90deg)'
    if (p == 'right') return 'rotate(0deg)'
    if (p == 'left') return 'rotate(180deg)'
    return 'rotate(0deg)'
  }};
  top: ${props => {
    const {
      targetTop,
      targetRight,
      targetBottom,
      targetLeft,
      windowWidth,
      windowHeight,
      helperWidth,
      helperHeight,
      helperPosition,
      padding,
    } = props

    const available = {
      left: targetLeft,
      right: windowWidth - targetRight,
      top: targetTop,
      bottom: windowHeight - targetBottom,
    }

    const couldPositionAt = position => {
      return (
        available[position] >
        (hx.isHoriz(position)
          ? helperWidth + padding * 2
          : helperHeight + padding * 2)
      )
    }

    const autoPosition = () => {
      const positionsOrder = hx.bestPositionOf(available)
      for (let j = 0; j < positionsOrder.length; j++) {
        if (couldPositionAt(positionsOrder[j])) {
          return positionsOrder[j]
        }
      }
      return 'center'
    }

    const pos = helperPosition => {
      if (Array.isArray(helperPosition)) {
        const isOutX = hx.isOutsideX(helperPosition[0], windowWidth)
        const isOutY = hx.isOutsideY(helperPosition[1], windowHeight)
        const warn = (axis, num) => {
          console.warn(
            `${axis}:${num} is outside window, falling back to center`
          )
        }
        if (isOutX) warn('x', helperPosition[0])
        if (isOutY) warn('y', helperPosition[1])
        return [
          isOutX ? windowWidth / 2 - helperWidth / 2 : helperPosition[0],
          isOutY ? windowHeight / 2 - helperHeight / 2 : helperPosition[1],
        ]
      }

      const hX = hx.isOutsideX(targetLeft + helperWidth, windowWidth)
        ? hx.isOutsideX(targetRight + padding, windowWidth)
          ? targetRight - helperWidth
          : targetRight - helperWidth + padding
        : targetLeft - padding
      const x = hX > padding ? hX : padding
      const hY = hx.isOutsideY(targetTop + helperHeight, windowHeight)
        ? hx.isOutsideY(targetBottom + padding, windowHeight)
          ? targetBottom - helperHeight
          : targetBottom - helperHeight + padding
        : targetTop - padding
      const y = hY > padding ? hY : padding
      const coords = {
        top: [x, targetTop - 30 - helperHeight - padding * 2],
        right: [targetRight + 30 + padding * 2, y],
        bottom: [x, targetBottom + 30 + padding * 2],
        left: [targetLeft - helperWidth - 30 - padding * 2, y],
        center: [
          windowWidth / 2 - helperWidth / 2,
          windowHeight / 2 - helperHeight / 2,
        ],
      }
      if (helperPosition === 'center' || couldPositionAt(helperPosition)) {
        return helperPosition
      }
      return autoPosition()
    }
    const autoPositionhelper = coords => {
      const positionsOrder = hx.bestPositionOf(available)
      for (let j = 0; j < positionsOrder.length; j++) {
        if (couldPositionAt(positionsOrder[j])) {
          return coords[positionsOrder[j]]
        }
      }
      return coords.center
    }
    const helperLocation = helperPosition => {
      if (Array.isArray(helperPosition)) {
        const isOutX = hx.isOutsideX(helperPosition[0], windowWidth)
        const isOutY = hx.isOutsideY(helperPosition[1], windowHeight)
        const warn = (axis, num) => {
          console.warn(
            `${axis}:${num} is outside window, falling back to center`
          )
        }
        if (isOutX) warn('x', helperPosition[0])
        if (isOutY) warn('y', helperPosition[1])
        return [
          isOutX ? windowWidth / 2 - helperWidth / 2 : helperPosition[0],
          isOutY ? windowHeight / 2 - helperHeight / 2 : helperPosition[1],
        ]
      }

      const hX = hx.isOutsideX(targetLeft + helperWidth, windowWidth)
        ? hx.isOutsideX(targetRight + padding, windowWidth)
          ? targetRight - helperWidth
          : targetRight - helperWidth + padding
        : targetLeft - padding
      const x = hX > padding ? hX : padding
      const hY = hx.isOutsideY(targetTop + helperHeight, windowHeight)
        ? hx.isOutsideY(targetBottom + padding, windowHeight)
          ? targetBottom - helperHeight
          : targetBottom - helperHeight + padding
        : targetTop - padding
      const y = hY > padding ? hY : padding
      const coords = {
        top: [x, targetTop - 30 - helperHeight - padding * 2],
        right: [targetRight + 30 + padding * 2, y],
        bottom: [x, targetBottom + 30 + padding * 2],
        left: [targetLeft - helperWidth - 30 - padding * 2, y],
        center: [
          windowWidth / 2 - helperWidth / 2,
          windowHeight / 2 - helperHeight / 2,
        ],
      }
      if (helperPosition === 'center' || couldPositionAt(helperPosition)) {
        return coords[helperPosition]
      }
      return autoPositionhelper(coords)
    }
    const p = pos(helperPosition)
    const l = helperLocation(helperPosition)

    if (p == 'center') return '0px'
    if (p == 'top') return helperHeight - 2 + 'px'
    if (p == 'bottom') return '-30px'
    if (p == 'right')
      return l[1] < targetTop
        ? targetTop - l[1] + 30 > helperHeight
          ? targetTop - l[1] - (targetTop - l[1] + 34 - helperHeight) + 'px'
          : targetTop - l[1] + 'px'
        : 2 + 'px'
    if (p == 'left')
      return l[1] < targetTop
        ? targetTop - l[1] + 30 > helperHeight
          ? targetTop - l[1] - (targetTop - l[1] + 34 - helperHeight) + 'px'
          : targetTop - l[1] + 'px'
        : 2 + 'px'
    return 'rotate(0deg)'
  }};
  left: ${props => {
    const {
      targetTop,
      targetRight,
      targetBottom,
      targetLeft,
      windowWidth,
      windowHeight,
      helperWidth,
      helperHeight,
      helperPosition,
      padding,
    } = props

    const available = {
      left: targetLeft,
      right: windowWidth - targetRight,
      top: targetTop,
      bottom: windowHeight - targetBottom,
    }

    const couldPositionAt = position => {
      return (
        available[position] >
        (hx.isHoriz(position)
          ? helperWidth + padding * 2
          : helperHeight + padding * 2)
      )
    }

    const autoPosition = () => {
      const positionsOrder = hx.bestPositionOf(available)
      for (let j = 0; j < positionsOrder.length; j++) {
        if (couldPositionAt(positionsOrder[j])) {
          return positionsOrder[j]
        }
      }
      return 'center'
    }

    const pos = helperPosition => {
      if (Array.isArray(helperPosition)) {
        const isOutX = hx.isOutsideX(helperPosition[0], windowWidth)
        const isOutY = hx.isOutsideY(helperPosition[1], windowHeight)
        const warn = (axis, num) => {
          console.warn(
            `${axis}:${num} is outside window, falling back to center`
          )
        }
        if (isOutX) warn('x', helperPosition[0])
        if (isOutY) warn('y', helperPosition[1])
        return [
          isOutX ? windowWidth / 2 - helperWidth / 2 : helperPosition[0],
          isOutY ? windowHeight / 2 - helperHeight / 2 : helperPosition[1],
        ]
      }

      const hX = hx.isOutsideX(targetLeft + helperWidth, windowWidth)
        ? hx.isOutsideX(targetRight + padding, windowWidth)
          ? targetRight - helperWidth
          : targetRight - helperWidth + padding
        : targetLeft - padding
      const x = hX > padding ? hX : padding
      const hY = hx.isOutsideY(targetTop + helperHeight, windowHeight)
        ? hx.isOutsideY(targetBottom + padding, windowHeight)
          ? targetBottom - helperHeight
          : targetBottom - helperHeight + padding
        : targetTop - padding
      const y = hY > padding ? hY : padding
      const coords = {
        top: [x, targetTop - 30 - helperHeight - padding * 2],
        right: [targetRight + 30 + padding * 2, y],
        bottom: [x, targetBottom + 30 + padding * 2],
        left: [targetLeft - helperWidth - 30 - padding * 2, y],
        center: [
          windowWidth / 2 - helperWidth / 2,
          windowHeight / 2 - helperHeight / 2,
        ],
      }
      if (helperPosition === 'center' || couldPositionAt(helperPosition)) {
        return helperPosition
      }
      return autoPosition()
    }
    const autoPositionhelper = coords => {
      const positionsOrder = hx.bestPositionOf(available)
      for (let j = 0; j < positionsOrder.length; j++) {
        if (couldPositionAt(positionsOrder[j])) {
          return coords[positionsOrder[j]]
        }
      }
      return coords.center
    }
    const helperLocation = helperPosition => {
      if (Array.isArray(helperPosition)) {
        const isOutX = hx.isOutsideX(helperPosition[0], windowWidth)
        const isOutY = hx.isOutsideY(helperPosition[1], windowHeight)
        const warn = (axis, num) => {
          console.warn(
            `${axis}:${num} is outside window, falling back to center`
          )
        }
        if (isOutX) warn('x', helperPosition[0])
        if (isOutY) warn('y', helperPosition[1])
        return [
          isOutX ? windowWidth / 2 - helperWidth / 2 : helperPosition[0],
          isOutY ? windowHeight / 2 - helperHeight / 2 : helperPosition[1],
        ]
      }

      const hX = hx.isOutsideX(targetLeft + helperWidth, windowWidth)
        ? hx.isOutsideX(targetRight + padding, windowWidth)
          ? targetRight - helperWidth
          : targetRight - helperWidth + padding
        : targetLeft - padding
      const x = hX > padding ? hX : padding
      const hY = hx.isOutsideY(targetTop + helperHeight, windowHeight)
        ? hx.isOutsideY(targetBottom + padding, windowHeight)
          ? targetBottom - helperHeight
          : targetBottom - helperHeight + padding
        : targetTop - padding
      const y = hY > padding ? hY : padding
      const coords = {
        top: [x, targetTop - 30 - helperHeight - padding * 2],
        right: [targetRight + 30 + padding * 2, y],
        bottom: [x, targetBottom + 30 + padding * 2],
        left: [targetLeft - helperWidth - 30 - padding * 2, y],
        center: [
          windowWidth / 2 - helperWidth / 2,
          windowHeight / 2 - helperHeight / 2,
        ],
      }
      if (helperPosition === 'center' || couldPositionAt(helperPosition)) {
        return coords[helperPosition]
      }
      return autoPositionhelper(coords)
    }
    const p = pos(helperPosition)
    const l = helperLocation(helperPosition)

    console.log('targetleft', targetLeft)
    console.log('helperleft', l[0])
    console.log('helperwidth', helperWidth)
    console.log('helperheight', helperHeight)

    if (p == 'center') return '0px'
    if (p == 'top') return targetLeft > l[0] ? targetLeft + 'px' : '2px'
    if (p == 'bottom') return targetLeft > l[0] ? targetLeft + 'px' : '2px'
    if (p == 'right') return -29 + 'px'
    if (p == 'left') return helperWidth - 2 + 'px'
    return 'rotate(0deg)'
  }};
`

export default Pointer
