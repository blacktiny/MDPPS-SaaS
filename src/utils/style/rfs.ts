import valueParser, { FunctionNode } from 'postcss-value-parser'
import variables from '../../assets/styles/variables'

const BREAKPOINT_ERROR =
  'breakpoint option is invalid, it should be set in `px`, `rem` or `em`.'
const BREAKPOINT_UNIT_ERROR =
  'breakpointUnit option is invalid, it should be `px`, `rem` or `em`.'
const BASE_RFS_ERROR =
  'baseValue option is invalid, it should be set in `px` or `rem`.'

interface Options {
  baseValue?: number | string
  unit?: 'rem' | 'px'
  breakpoint?: number | string
  breakpointUnit?: 'em' | 'rem' | 'px'
  factor?: number
  twoDimensional?: boolean
  unitPrecision?: number
  remValue?: number
  functionName?: string
  enableRfs?: boolean
  mode?: string
}

class RfsInit {
  private static instance: RfsInit
  private opts: Options = {
    baseValue: 20,
    unit: 'rem',
    breakpoint: 1200,
    breakpointUnit: 'px',
    factor: 10,
    twoDimensional: false,
    unitPrecision: 5,
    remValue: 16,
    functionName: 'rfs',
    enableRfs: true,
    mode: 'min-media-query'
  }
  private constructor(opts?: Options) {
    this.opts = Object.assign(this.opts, opts)

    if (typeof this.opts.baseValue !== 'number') {
      if (this.opts.baseValue.endsWith('px')) {
        this.opts.baseValue = parseFloat(this.opts.baseValue)
      } else if (this.opts.baseValue.endsWith('rem')) {
        this.opts.baseValue =
          parseFloat(this.opts.baseValue) / this.opts.remValue
      } else {
        console.error(BASE_RFS_ERROR)
      }
    }

    if (typeof this.opts.breakpoint !== 'number') {
      if (this.opts.breakpoint.endsWith('px')) {
        this.opts.breakpoint = parseFloat(this.opts.breakpoint)
      } else if (this.opts.breakpoint.endsWith('em')) {
        this.opts.breakpoint =
          parseFloat(this.opts.breakpoint) * this.opts.remValue
      } else {
        console.error(BREAKPOINT_ERROR)
      }
    }

    if (!['px', 'rem', 'em'].includes(this.opts.breakpointUnit)) {
      console.error(BREAKPOINT_UNIT_ERROR)
    }
  }

  public static getInstance(opts?: Options): RfsInit {
    if (!RfsInit.instance) {
      RfsInit.instance = new RfsInit(opts)
    }

    return RfsInit.instance
  }

  toFixed = (number: number, precision: number) => {
    const multiplier = 10 ** (precision + 1)
    const wholeNumber = Math.floor(number * multiplier)

    return (Math.round(wholeNumber / 10) * 10) / multiplier
  }

  renderValue = (value: number) => {
    // Do not add unit if value is 0
    if (value === 0) {
      return value
    }

    // Render value in desired unit
    if (this.opts.unit === 'rem') {
      return `${this.toFixed(
        value / this.opts.remValue,
        this.opts.unitPrecision
      )}rem`
    }

    return `${this.toFixed(value, this.opts.unitPrecision)}px`
  }

  process = (declarationValue: string, fluid = true) => {
    const parsed = valueParser(declarationValue)

    // Function walk() will visit all the of the nodes in the tree,
    // invoking the callback for each.
    parsed.walk(node => {
      // Since we only want to transform rfs() values,
      // we can ignore anything else.
      if (node.type !== 'function' && node.value !== this.opts.functionName) {
        return
      }
      ;(node as FunctionNode).nodes
        .filter((node: { type: string }) => node.type === 'word')
        .forEach((node: { value: string }) => {
          node.value = node.value.replace(
            /^(-?\d*\.?\d+)(.*)/g,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (match: any, value: string | number, unit: string) => {
              if (typeof value === 'number') {
                value = value.toString()
              }
              value = parseFloat(value)

              // Return value if it's not a number or px/rem value
              if (isNaN(value) || !['px', 'rem'].includes(unit)) {
                return match
              }

              // Convert to px if in rem
              if (unit === 'rem') {
                value *= this.opts.remValue
              }

              // Only add responsive function if needed
              if (
                !fluid ||
                this.opts.baseValue >= Math.abs(value) ||
                this.opts.factor <= 1 ||
                !this.opts.enableRfs
              ) {
                return this.renderValue(value)
              }

              // Calculate base and difference
              let baseValue: number =
                (this.opts.baseValue as number) +
                (Math.abs(value) - (this.opts.baseValue as number)) /
                  this.opts.factor
              const diff = Math.abs(value) - baseValue

              // Divide by remValue if needed
              if (this.opts.unit === 'rem') {
                baseValue /= this.opts.remValue
              }

              const viewportUnit = this.opts.twoDimensional ? 'vmin' : 'vw'
              if (value > 0) {
                return `calc(${this.toFixed(
                  baseValue,
                  this.opts.unitPrecision
                )}${this.opts.unit} + ${this.toFixed(
                  (diff * 100) / (this.opts.breakpoint as number),
                  this.opts.unitPrecision
                )}${viewportUnit})`
              }

              return `calc(-${this.toFixed(
                baseValue,
                this.opts.unitPrecision
              )}${this.opts.unit} - ${this.toFixed(
                (diff * 100) / (this.opts.breakpoint as number),
                this.opts.unitPrecision
              )}${viewportUnit})`
            }
          )
        })

      // Now we will transform the existing rgba() function node
      // into a word node with the hex value
      node.type = 'word'
      node.value = valueParser.stringify((node as FunctionNode).nodes)
    })

    return parsed.toString()
  }

  // Return the value without `rfs()` function
  // eg. `4px rfs(32px)` => `.25rem 2rem`
  value = (value: string) => this.process(value, false)

  // Convert `rfs()` function to fluid css
  // eg. `4px rfs(32px)` => `.25rem calc(1.325rem + 0.9vw)`
  fluidValue = (value: string) => this.process(value, true)

  getOptions = () => this.opts
}

export default (val: string) =>
  RfsInit.getInstance({
    remValue: variables.Fonts.Size.Base,
    breakpoint: 1920
  }).fluidValue(`rfs(${val})`)

export const boxModel = (val: string, fluid?: boolean) => {
  const instance = RfsInit.getInstance({
    remValue: variables.Fonts.Size.Base,
    breakpoint: 1920
  })

  if (fluid) {
    return instance.fluidValue(`rfs(${val})`)
  }
  return instance.value(`rfs(${val})`)
}
