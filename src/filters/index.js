import { separateCamelCase, capitalize } from './stringFilters'
import { formatDate } from './formatDate'
import { convertDate } from '@/utils'

export default {
  install (Vue) {
    Vue.filter('separateCamelCase', separateCamelCase)
    Vue.filter('formatDate', formatDate)
    Vue.filter('convertDate', convertDate)
    Vue.filter('capitalize', capitalize)
  }
}
