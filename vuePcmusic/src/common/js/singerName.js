export default function (arr) {
    let name = []
    arr.forEach(function(singer) {
        name.push(singer.name)
    })

    return name.join('/')
}
