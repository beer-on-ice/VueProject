export default function nums(num) {
    return num > 9999 ? (Math.floor(num/1000)/10) + '万' : num
}
