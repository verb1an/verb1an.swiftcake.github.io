document.addEventListener('DOMContentLoaded', function() {
    

    teamSlider();
});

const teamSlider = () => {
    const controlls = document.querySelectorAll('#team .slider__controlls .control');
    const items = document.querySelectorAll('#team .content .item');
    let active = 0;

    move();
    controlls.forEach((el) => {
        el.addEventListener('click', function() {

            if(el.classList.contains('forw')) {
                if(active < items.length-1) {
                    active++;
                    move();
                }
            }else{
                if(active > 0){
                     active--;
                     move();
                }
            }

            

        })
    })

    function move() {
        items.forEach((item) => {
            item.classList.remove('active');
        });
        items[active].classList.add('active');
        for(let m = 1; m <= active; m++) {
            console.log(active-m)
            items[active-m].style = `
                transform: translate(${-50-(30*m)}%, ${-50-(5*m)}%);
                z-index: ${items.length-m};
                opacity: ${0.2*(items.length-m)-0.2};
            `;
        }
        for(let p = active; p < items.length; p++) {
            items[p].style = `
                transform: translate(${-50+(30*(p-active))}%, ${-50-(5*(p-active))}%);
                z-index: ${active-p};
                opacity: ${1-(0.2*(p-active))};
            `;
        }
        items[active].style = 'transform: translate(-50%, -50%); z-index: 6;';
    }
}