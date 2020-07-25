const setMainClass = (targClass) => {
    document.querySelector('main').classList = targClass;
}

if(document.querySelector('#b0')){
    document.querySelector('#b0').addEventListener("click", () =>{
    document.querySelector('main').classList=''
})
}
document.querySelector('#b1').addEventListener("click", () => setMainClass('b1'))
document.querySelector('#b2').addEventListener("click", () => setMainClass('b2'))
document.querySelector('#b3').addEventListener("click", () => setMainClass('b3'))
document.querySelector('#b4').addEventListener("click", () => setMainClass('b4'))