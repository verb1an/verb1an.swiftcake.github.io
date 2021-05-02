document.addEventListener('DOMContentLoaded', function() {
    menu();
    adv__slider();
    filter__products();
    teamSlider();
    popap();
    totop();
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

const adv__slider = () => {
    const controlls = document.querySelectorAll('#adv__slider .slider__controlls .control');
    const items = document.querySelectorAll('#adv__slider .slider .item');
    const maxWidth = Math.round(document.querySelector('#adv__slider .slider').getBoundingClientRect().width/items[0].getBoundingClientRect().width)
    let active = 0;

    controlls.forEach((el) => {
        el.addEventListener('click', function() {
            if( this.classList.contains('forw') ) {
                active < items.length-maxWidth ? active++ : active = active;
            }else{
                active > 0 ? active-- : active = active;
            }
            move();
        });
    });

    function move() {
        items.forEach((item) => {
            item.style = `transform: translateX(${item.getBoundingClientRect().width*-active-(20*active)}px)`;
        });

        if( active == 0 ) {
            controlls[0].classList.add('disabled');
        }else if( active == items.length-maxWidth ) {
            controlls[1].classList.add('disabled');
        }else{
            controlls.forEach((el) => {
                el.classList.remove('disabled');
            })
        }
    }
}

const filter__products = () => {
    const menu = document.querySelectorAll('#products .product__nav a');
    const items = document.querySelectorAll('#products .content .item');

   
    menu.forEach((el) => {
        el.addEventListener('click', function() {
            menu.forEach((el) => {el.classList.remove('active'); });
            this.classList.add('active');

            switch ( el.getAttribute('data--filter-inp') ) {
                case 'all':
                    restore('all');
                break;
                case 'cake':
                    restore('cake');
                break;
                case 'smallcake':
                    restore('smallcake');
                break;
                case 'cupcake':
                    restore('cupcake');
                break;
            }
        })
    })


    function restore(type) {

        items.forEach((el) => {
            if(type != 'all') {
                el.classList.remove('active');
                if( el.getAttribute('data-filter') == type ) {
                    console.log('123')
                    el.classList.add('active');
                }
            }else{
                el.classList.add('active');
            }
        })
    }

    restore('all');
}

const popap = () => {
    const popap__btn = document.querySelectorAll("a[data--popap-toggle]");
    const popap = document.querySelectorAll('.popap');
    const popap__close = document.querySelectorAll('.popap .btn--close, .popap .nobtn--close');
    
    popap__btn.forEach((el) => {
        el.addEventListener('click', function(e) {
            this.style = 'z-index: 200;';
            document.querySelector(`.popap[data--popap='${el.getAttribute('data--popap-toggle')}']`).classList.toggle('open');
            document.querySelector('html').classList.toggle('hidden');

            document.querySelectorAll('.section, .header').forEach((el) => el.style = `padding-right: ${getScrollbarWidth()}px`);
        })
    });

    popap.forEach((el) => {
        el.addEventListener('click', function(e) {
            if( !e.target.closest('.popap__inner') ) {
                el.classList.remove('open');
                document.querySelector('html').classList.toggle('hidden');
                document.querySelectorAll('.section, .header').forEach((el) => el.style = `padding-right: 0px`);
            }
        })
    })

    popap__close.forEach((el) => {
        el.addEventListener('click', function() {
            document.querySelector('.popap.open').classList.remove('open');
            document.querySelector('html').classList.remove('hidden');
            document.querySelectorAll('.section, .header').forEach((el) => el.style = `padding-right: 0px`);
        })
    })
}

const menu = () => {
    const bar = document.querySelector('.btn--bar');
    const menu = document.querySelector('.header');
    const items = document.querySelectorAll('.header .nav a');

    bar.addEventListener('click', function() {
        menu__restore();
    })

    items.forEach( (el) => {
        el.addEventListener('click', function () {
            if( menu.classList.contains('mobile--active') ) {
                menu__restore();
            }
        })
    })

    function menu__restore () {
        bar.classList.toggle('active');
        menu.classList.toggle('mobile--active');
        document.querySelector('html').classList.toggle('hidden');
    }
}

const totop = () => {
    const btn = document.querySelector('#btn--totop');

    btn.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('html').scrollTo(0, 0);
        history.pushState(null, null, '/index.html');
    })
}

function getScrollbarWidth() {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    outer.style.msOverflowStyle = 'scrollbar';
    document.body.appendChild(outer);
    const inner = document.createElement('div');
    outer.appendChild(inner);
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
    outer.parentNode.removeChild(outer);
    return scrollbarWidth;
}