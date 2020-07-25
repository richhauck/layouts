const setMainClass = (targClass) => {
    const newClass = (document.querySelector('main').classList.contains(targClass)) ? '' : targClass;
    if(newClass !== ''){
        document.querySelector('main').classList = '';
        const myInterval = setInterval(function(){
            document.querySelector('main').classList = newClass;
            clearInterval(myInterval);
        }, 1000)
    }else{
        document.querySelector('main').classList = newClass;
    }
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

document.querySelector('.w1').addEventListener("click", () => setMainClass('b1'))
document.querySelector('.w2').addEventListener("click", () => setMainClass('b2'))
document.querySelector('.w3').addEventListener("click", () => setMainClass('b3'))
document.querySelector('.w4').addEventListener("click", () => setMainClass('b4'))