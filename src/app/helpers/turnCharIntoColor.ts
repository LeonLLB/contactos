

export const turnCharIntoColor = (char: string)=>{
    const alphabetLowerCase = 'abcdefghijklmnñopqrstuvwxyz'
    const alphabetUpperCase = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'
    const validInputs = 'abcdef'
    
    if(validInputs.includes(char)) return char
    if(alphabetLowerCase.includes(char)){
        const index = alphabetLowerCase.indexOf(char)
        if(index > 10){
            return index.toString().split('')[0]
        }
        return index
    }
    
    const index = alphabetUpperCase.indexOf(char)
    if(index > 10){
        return index.toString().split('')[0]
    }
    return index
}