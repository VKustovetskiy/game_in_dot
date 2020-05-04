import dayjs from 'dayjs'

export function convertDate (date, format = 'HH:mm DD MMMM YYYY') {
    return dayjs(date).format(format)
}
