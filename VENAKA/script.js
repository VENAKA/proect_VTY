
let maliceItems = document.querySelectorAll('.malice');

maliceItems.forEach(malice => {
    let imgBlock = malice.querySelector('.img-block');
    let closeBtn = malice.querySelector('.malice__close');
    let nameText = malice.querySelector('.name');
    let infoText = malice.querySelector('.info');

    malice.addEventListener('click', function () {
        imgBlock.classList.add('img-block-open');
        malice.classList.add('malice__open');
        closeBtn.classList.add('close-open');
        nameText.classList.add('text__open');
        infoText.classList.add('info__open');
    });

    closeBtn.addEventListener('click', function (event) {
        event.stopPropagation();
        imgBlock.classList.remove('img-block-open');
        malice.classList.remove('malice__open');
        closeBtn.classList.remove('close-open');
        nameText.classList.remove('text__open');
        infoText.classList.remove('info__open');
    });
});

let survsItems = document.querySelectorAll('.survs');

survsItems.forEach(surv => {
    let imgBlock = surv.querySelector('.img-block');
    let closeBtn = document.createElement('button');
    let infoS = surv.querySelector('.info-s')
    closeBtn.classList.add('survs__close');
    closeBtn.textContent = 'X';
    surv.appendChild(closeBtn);
    
    let nameText = surv.querySelector('.name');

    surv.addEventListener('click', function () {
        imgBlock.classList.add('img-block-open');
        surv.classList.add('survs__open');
        closeBtn.classList.add('close-open');
        nameText.classList.add('text__open');
        infoS.classList.add('info-s__open');
    });

    closeBtn.addEventListener('click', function (event) {
        event.stopPropagation();
        imgBlock.classList.remove('img-block-open');
        surv.classList.remove('survs__open');
        closeBtn.classList.remove('close-open');
        nameText.classList.remove('text__open');
        infoS.classList.remove('info-s__open');
    });
});


let maliceBlock = document.querySelector('.main__gudes-malice');
let survsBlock = document.querySelector('.main__gudes-survs');


maliceBlock.classList.add('active');


document.querySelector('.change__malice').addEventListener('click', function () {
    maliceBlock.classList.add('active');
    survsBlock.classList.remove('active');
});

document.querySelector('.change__survs').addEventListener('click', function () {
    survsBlock.classList.add('active');
    maliceBlock.classList.remove('active');
});
