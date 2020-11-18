const checkForWinner = (marker) => {
    // check rows
    const gridCells = document.querySelectorAll('.gridCell')
    for (let i = 0; i < gridCells.length; i += 3) {
        if (gridCells[i].textContent == marker) {
            if ((gridCells[i+1].textContent == marker) && (gridCells[i+2].textContent == marker)){
                return true;
            }
        }
    }
    // check columns
    for (i = 0; i < 3; i++) {
        if (gridCells[i].textContent == marker) {
            if ((gridCells[i+3].textContent == marker) && (gridCells[i+6].textContent == marker)){
                return true;
            }
        } 
    }
    // check backslash diagonal
    if (gridCells[0].textContent == marker) {
        if ((gridCells[4].textContent == marker) && (gridCells[8].textContent == marker)){
            return true;
        }
    } 
    // check forwardslash diagonal
    if (gridCells[2].textContent == marker) {
        if ((gridCells[4].textContent == marker) && (gridCells[6].textContent == marker)){
            return true;
        }
    }
    return false;
}
