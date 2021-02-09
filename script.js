const generateDot = (x) => {
    let map = {
        'a': [[1,2,3], [0,4], [0,1,2,3,4], [0,4], [0,4]],
        'b': [[0,1,2,3], [0,4], [0,1,2,3], [0,4], [0,1,2,3]],
        'c': [[1,2,3,4], [0], [0], [0], [1,2,3,4]],
        'd': [[0,1,2,3], [0,4], [0,4], [0,4], [0,1,2,3]],
        'e': [[0,1,2,3,4], [0], [0,1,2,3,4], [0], [0,1,2,3,4]],
        'f': [[0, 1, 2, 3, 4], [0], [0, 1, 2, 3, 4], [0], [0]],
        'g': [[1,2,3,4], [0], [0,3,4], [0,4], [1,2,3,4]],
        'h': [[0,4], [0,4], [0,1,2,3,4], [0,4], [0,4]],
        'i': [[0], [0], [0], [0], [0]],
        'j': [[2,3,4], [4], [4], [0,4], [1,2,3]],
        'k': [[0,3], [0,2], [0,1], [0,2], [0,3]], 
        'l': [[0], [0], [0], [0], [0,1,2,3]],
        'm': [[0,4], [0,1,3,4], [0,2,4], [0,4], [0,4]], 
        'n': [[0,4], [0,1,4], [0,2,4], [0,3,4], [0,4]],
        'o': [[1,2,3], [0,4], [0,4], [0,4], [1,2,3]],
        'p': [[0,1,2], [0,3], [0,1,2], [0], [0]],
        'q': [[1,2,3], [0,4], [0,4], [0,3], [1,2,4]],
        'r': [[0,1,2,3], [0,4], [0,1,2,3], [0,3], [0,4]],
        's': [[1,2,3], [0], [1,2], [3], [0,1,2]],
        't': [[0,1,2,3,4], [2], [2], [2], [2]],
        'u': [[0,4], [0,4], [0,4], [0,4], [1,2,3]],
        'v': [[0,4], [0,4], [0,4], [1,3], [2]],
        'w': [[0,4], [0,4], [0,2,4], [0,2,4], [1,3]],
        'x': [[0,4], [1,3], [2], [1,3], [0,4]],
        'y': [[0,4], [1,3], [2], [2], [2]],
        'z': [[0,1,2,3,4], [3], [2], [1],[0,1,2,3,4]]
    }
    const letter = map[x.toLowerCase()]
    const dot = document.querySelector("div.dot")
    const blackDot = "<div class='dot black'></div>"
    const box = document.querySelector("div.box")
    let div = ""
    for (let row = 0; row < 5; row++) {
        div  += "<div class='row'>"
        for (let column = 0; column < 5; column++) {
            if(letter[row].includes(column) ) {
                div += blackDot
            } else {
                div += dot.outerHTML
            }
        }
        div += "</div>"
    }
    box.innerHTML = div
}
generateDot('a')