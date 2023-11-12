import { MediaQueryAllQueryable, useMediaQuery } from 'react-responsive'
import { EBreakPoint } from 'enums/theme'
import { breakPoints } from 'theme/globalStyles'

type MediaQuerySettings = Partial<
  MediaQueryAllQueryable & {
    query?: string
  }
>

const getBreakPointValue = (breakPoint: EBreakPoint): string => {
  switch (breakPoint) {
    case EBreakPoint.XS:
      // INFO: using breakPoinTValue of sm because in this design we have min break point is sm
      return breakPoints.sm
    case EBreakPoint.SM:
      return breakPoints.sm
    case EBreakPoint.MD:
      return breakPoints.md
    case EBreakPoint.LG:
      return breakPoints.lg
    case EBreakPoint.XL:
      return breakPoints.xl
    default:
      return breakPoints.base
  }
}

const useBreakPoint = (minBreakPoint: EBreakPoint, maxBreakPoint?: EBreakPoint): boolean => {
  const minWidth: string = String(Number(getBreakPointValue(minBreakPoint).replace('px', '')) + 0.1) + 'px'
  const settings: MediaQuerySettings = { minWidth }
  if (maxBreakPoint) {
    settings.maxWidth = getBreakPointValue(maxBreakPoint)
  }
  const isMatched: boolean = useMediaQuery(settings)

  return isMatched
}

export default useBreakPoint
