"use strict"
// строгий режим


// прокрутка при клике
const menuLinks = document.querySelectorAll('a[data-goto]');
if(menuLinks.length > 0) {
        menuLinks.forEach(menuLink => {
                menuLink.addEventListener("click", onMenuLinkClick);
        });

        function onMenuLinkClick(e) {
                const menuLink = e.target;
                // проверка на наличие нужного блока
                if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
                        const gotoBlock = document.querySelector(menuLink.dataset.goto);
                        // высчитывание размеров экрана и прокрутки
                        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

                        window.scrollTo({
                                top: gotoBlockValue,
                                behavior: "smooth"
                        });
                        e.preventDefault();
                }
        }
}
// ************************бургер************************************************



// Get Modal
var modal = document.getElementById('myModal');
    
// Get pseudoelement to open Modal
var btn = document.getElementById("sized");

// Get the <span> element to close Modal
var span = document.getElementsByClassName("close")[0];

const closeLinks = document.querySelectorAll(".gray");
if(closeLinks.length > 0) {
        closeLinks.forEach(closeLink => {
                closeLink.addEventListener("click", onMenuCloseLink);
        });

        function onMenuCloseLink (e) {
                e.preventDefault();
                modal.style.display = "none";
                };
}
// When user clicks button, open Modal
btn.onclick = function() {
   modal.style.display = "block";
   };

// When user clicks Close (x), close Modal
span.onclick = function() {
   modal.style.display = "none";
   };


// When user clicks anywhere outside of the Modal, close Modal
 window.onclick = function(event) {
    if (event.target == modal) {
       modal.style.display = "none";
       }
    }

// ************************АНИМАЦИЯ************************************************
const animItems = document.querySelectorAll('._anim-items');

if(animItems.length > 0){
        // событие на окно браузера
        window.addEventListener('scroll', animOnScroll);
        function animOnScroll(){
                for(let i=0; i<animItems.length; i++){
                        const animItem = animItems[i];
                        // определяем высоту объекта
                        const animItemHeight = animItem.offsetHeight;
                        // получаем позицию объекта относительно верха
                        const animItemOffset = offset(animItem).top;
                        // устанавливаем коэффициент
                        const animStart = 4;

                        // настраиваем старт анимации
                        // опред. высоту окна браузера
                        let animItemPoint = window.innerHeight - animItemHeight / animStart;

                        // если высота анимированного объекта больше окна браузера
                        if (animItemHeight > window.innerHeight){
                                animItemPoint = window.innerHeight - window.innerHeight / animStart;
                        }

                        // для того, чтобы мы могли повторно анимировать объект
                        if((pageYOffset > animItemOffset-animItemPoint) && pageYOffset < (animItemOffset+animItemHeight)){
                                animItem.classList.add('_active');
                        }else{
                                animItem.classList.remove('_active');
                        }
                }
        }
        function offset(el){
                const rect = el.getBoundingClientRect(),
                // получаем данные о прокрученных пикселях
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
        }
        setTimeout(() => {animOnScroll();}, 300);
}


// ************************СЛАЙДЕР НА ГЛАВНОМ ЭКРАНЕ****************************
const nextButton = document.querySelector('.next');
const nextMobileButton = document.querySelector('.next_mobile');
const prevMobileButton = document.querySelector('.previous_mobile');
const prevButton = document.querySelector('.prev');
const pointNextButton = document.querySelector('.point-next');
var slides = document.querySelectorAll(".item");
var slideIndex = 1;
showSlides(slideIndex);

/* Функция увеличивает индекс на 1, показывает следующий слайд*/
function plusSlide() {
    showSlides(slideIndex += 1);
}
nextButton.addEventListener('click', plusSlide);
prevButton.addEventListener('click', minusSlide);
pointNextButton.addEventListener('click', plusSlide);
nextMobileButton.addEventListener('click', plusSlide);
prevMobileButton.addEventListener('click', minusSlide);
/* Функция уменьшяет индекс на 1, показывает предыдущий слайд*/
function minusSlide() {
    showSlides(slideIndex -= 1);  
}
/* Устанавливает текущий слайд */
function currentSlide(n) {
    showSlides(slideIndex = n);
}
/* Основная функция слайдера */
function showSlides(n) {
    var i;
    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "flex";
}

setInterval(plusSlide, 4000);


// ******************ПОП-АП Записаться на консультацию**********************
let body = document.querySelector ('body');

let popupBg = document.querySelector('.popup__bg'); // Фон попап окна
let popup = document.querySelector('.popup'); // Само окно
let openPopupButtons = document.querySelectorAll('.open-popup'); // Кнопки для показа окна
let closePopupButton = document.querySelector('.close-popup'); // Кнопка для скрытия окна

var form = document.querySelector("#form");


var personName = document.querySelector("#form-name");
var personMessage = document.querySelector("#form-message");

// инициализируем маску и intlTelInput (флаги стран)
const inputPhone = document.querySelector("#phone");
const orderBtn = document.querySelector(".order-btn");

intlTelInput(inputPhone, {
        initialCountry: "ru",
        preferredCountries: ['ru', 'by', 'ua'],
        separateDialCode: true,
        nationalMode: false,
        // hiddenInput: "full",
        // utilsScript: "//cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.3/js/utils.js"
});


const mask = new IMask(inputPhone,  {
        mask: '(000)000-00-00',
        lazy: false,
})
inputPhone.addEventListener("click", () => {
        mask.updateValue("");
      }); 

personName.addEventListener("input", inputPhoneHandler);
inputPhone.addEventListener("input", inputPhoneHandler);
personMessage.addEventListener("input", inputPhoneHandler);
// включение-отключение кнопки 
function inputPhoneHandler(){
        if(personName.value.length > 0 && mask.masked.unmaskedValue && personMessage.value.length > 0) {
                orderBtn.classList.add('order-btn--active');
        }else {orderBtn.classList.remove('order-btn--active');}
}

// оформление заказа
orderBtn.addEventListener("click", sendEmailTelegram);
// отправка формы  в бот
const TELEGRAM_BOT_TOKEN = '5937729381:AAEaLNAOPgViFHp573hqj4WT4_J9TucRNRQ';
const TELEGRAM_CHAT_ID = '@ForSiteGritsenko';
const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

// запрет на отправку формы при нажатии на клавишу Enter
form.addEventListener('keydown', function(event) {
        if(event.keyCode == 13) {
                event.preventDefault();
        }
});

async function sendEmailTelegram(event) {
        event.preventDefault();
        // console.log(form)

        const formSendResult = document.querySelector('.form__send-result')
        formSendResult.textContent = '';

        // деструктуризация {...}
        const { name, phone = mask.masked.unmaskedValue, message } = Object.fromEntries(new FormData(form).entries());
        console.log( { name, phone, message } )

        const text = `Заявка от ${name}\nТелефон: ${phone} \nСообщение: ${message}`;
        console.log(text)

        try {
                orderBtn.textContent = 'Отправляем заявку...';

                const response = await fetch(API, {
                method: "POST",
                headers: {
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        chat_id: TELEGRAM_CHAT_ID,
                        text,
                })
                })
                
                if (response.ok) {
                formSendResult.textContent = 'Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.';
                form.reset()

                } else {
                throw new Error(response.statusText);
                }

        } catch (error) {
                console.error(error);
                formSendResult.textContent = 'Анкета не отправлена! Попробуйте позже.';
                formSendResult.style.color = 'red';

        } finally {
                orderBtn.textContent = 'Записаться на прием';
                orderBtn.classList.remove('order-btn--active');
                form.reset()
        }
}




// открытие поп-апа
openPopupButtons.forEach((button) => { // Перебираем все кнопки
  button.addEventListener('click', (e) => { // Для каждой вешаем обработчик событий на клик
        e.preventDefault(); // Предотвращаем дефолтное поведение браузера
                popupBg.classList.add('active'); // Добавляем класс 'active' для фона
                popup.classList.add('active'); // И для самого окна
                body.classList.add('modal-open');
                // document.getElementById('dialog').classList.add('show')
                const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
                // const body = document.body;
                body.style.position = 'fixed';
                body.style.top = `-${scrollY}`;

        })
});
// закрытие поп-апа с крестика
closePopupButton.addEventListener('click',() => { // Вешаем обработчик на крестик
        popupBg.classList.remove('active'); // Убираем активный класс с фона
        popup.classList.remove('active'); // И с окна
        body.classList.remove('modal-open'); // включаем прокрутку
        // const body = document.body;
        const scrollY = body.style.top;
        body.style.position = '';
        body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        // document.getElementById('dialog').classList.remove('show');

});

// закрытие поп-апа с фона
document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
        if(e.target === popupBg) { // Если цель клика - фон, то:
                popupBg.classList.remove('active'); // Убираем активный класс с фона
                popup.classList.remove('active'); // И с окна
                body.classList.remove('modal-open'); // включаем прокрутку
                const scrollY = body.style.top;
                body.style.position = '';
                body.style.top = '';
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
                // document.getElementById('dialog').classList.remove('show');

        }
});
window.addEventListener('scroll', () => {
        document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
      });




// *************************ПОП-АП Отзывы**********************************
let openCommentsPopupBtn = document.querySelectorAll('.openCommentsPopupBtn'); // Кнопки для показа окна
let closeCommentsPopupBtn = document.querySelector('.closeCommentsPopupBtn'); // Кнопки для закрытия окна
let containerCommentsPopup = document.querySelector('.container-commentsPopup'); // Само окно
let commentsPopup = document.querySelector('.commentsPopup'); // Фон попап окна

// открытие поп-апа
openCommentsPopupBtn.forEach((button) => { // Перебираем все кнопки
        button.addEventListener('click', (e) => { // Для каждой вешаем обработчик событий на клик
              e.preventDefault(); // Предотвращаем дефолтное поведение браузера
              containerCommentsPopup.classList.add('active'); // И с окна
              commentsPopup.classList.add('active'); // И с окна
              body.classList.add('modal-open'); // убираем прокрутку основного окна
        });
});

// закрытие поп-апа с крестика
closeCommentsPopupBtn.addEventListener('click',() => { // Вешаем обработчик на крестик
        commentsPopup.classList.remove('active'); // И с окна
        containerCommentsPopup.classList.remove('active'); // И с окна
        body.classList.remove('modal-open'); // включаем прокрутку

});

// // *************************ПОП-АП Публикации**********************************
// let openPostsPopupBtn = document.querySelector('.openPostsPopupBtn'); // Кнопки для показа окна
// let closePostsPopupBtn = document.querySelector('.closePostsPopupBtn'); // Кнопки для закрытия окна

// let containerPostsPopup = document.querySelector('.container-postsPopup'); // Само окно
// let postsPopup = document.querySelector('.postsPopup'); // Фон попап окна

// // открытие поп-апа
// openPostsPopupBtn.addEventListener('click', (e) => { // Для каждой вешаем обработчик событий на клик
//               e.preventDefault(); // Предотвращаем дефолтное поведение браузера
//               containerPostsPopup.classList.add('active'); // И с окна
//               postsPopup.classList.add('active'); // И с окна
// });

// // закрытие поп-апа с крестика
// closePostsPopupBtn.addEventListener('click',() => { // Вешаем обработчик на крестик
//         containerPostsPopup.classList.remove('active'); // И с окна
//         postsPopup.classList.remove('active'); // И с окна
// });


// ************************кнопка НАВЕРХ*****************
const btnUp = {
        el: document.querySelector('.btn-up'),
        show() {
          // удалим у кнопки класс btn-up_hide
                this.el.classList.remove('btn-up_hide'); 
        },
        hide() {
          // добавим к кнопке класс btn-up_hide
                this.el.classList.add('btn-up_hide');
        },
        addEventListener() {
          // при прокрутке содержимого страницы
                window.addEventListener('scroll', () => {
            // определяем величину прокрутки
                const scrollY = window.scrollY || document.documentElement.scrollTop;
            // если страница прокручена больше чем на 400px, то делаем кнопку видимой, иначе скрываем
                scrollY > 400 ? this.show() : this.hide();
                });
          // при нажатии на кнопку .btn-up
                document.querySelector('.btn-up').onclick = () => {
            // переместим в начало страницы
                window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
                });
                }
        }
}
btnUp.addEventListener();

// ************************СЛАЙДЕР в ПРАЙСЕ****************************

// const priceNextButton = document.querySelector('.slider-button-next');
// const pricePrevButton = document.querySelector('.slider-button-prev');
// var priceSlides = document.querySelectorAll(".price-slide");
// showSlides(slideIndex);

// priceNextButton.addEventListener('click', plusSlide);
// pricePrevButton.addEventListener('click', minusSlide);

// var priceSlider = new Swiper('.price-slider', {
//         initialSlide: 0,
//         watchOverflow: true,
//         breakpoints:{
//                 320: {
//                         slidesPerView: 1,
//                         spaceBetween: 10,
//                         scrollbar: {
//                                 el: 'swiper-scrollbar',
//                                 draggable: true
//                         },
//                 },
//                 660: {
//                         slidesPerView: 2,
//                         spaceBetween: 40,
//                 },
//                 1024: {
//                         slidesPerView: 2,
//                         spaceBetween: 20,
//                 },
//                 1200: {
//                         slidesPerView: 3,
//                         spaceBetween: 50,
//                         scrollbar: false,
//                 }
//         },
//         slidesPerView: 'auto',
//         spaceBetween: 30,
        
// });


// var test = new Swiper ('.test',{
//         scrollbar: {
//                 el: 'swiper-scrollbar',
//                 draggable: true
//         },
// });

// ************************СЛАЙДЕР СЕРТИФИКАТЫ****************************
var diplomSlides = new Swiper('.diplom-slides', {
        navigation:{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
        },
        pagination:{
                el: '.swiper-pagination',
                type: "bullets",
                clickable: true,
                dynamicBullets: true,
                dynamicMainBullets: 3,
        },

        // slideToClickedSlide: true,
        // loop: true,
        // loopedSlice: 3,
        spaceBetween: 50,

        // переключение клавиатурой
        keyboard:{
                enabled: true,
                onlyInViewport: true,
                pageUpDown:true,
        },
        // мышкой
        mousewheel:{
                sensitivity: 1,
        },

        // slidesPerGroup: 3,
        autoHeight: true,
        initialSlide: 0,

        breakpoints:{
                480: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                },
                pagination:{
                        dynamicMainBullets: 3,
                },
        },
        breakpoints:{
                780: {
                        slidesPerView: 1.5,
                        spaceBetween: 10,
                }
        },
        breakpoints:{
                1098: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                }
        },
        breakpoints:{
                1200: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                }
        },


});




// ************************ПУБЛИКАЦИИ****************************
