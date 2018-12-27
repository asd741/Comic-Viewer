const indexSass = require('./index.sass');
window.onload = function () {
    aIndexChapterList = document.querySelectorAll(".page-footer .chapter-box .chapter-list");
    oChapterBtn = document.querySelector(".options .chapter .chapter-btn");
    oPageBtn = document.querySelector(".options .page .page-btn");
    aGoHomePageBtn = document.getElementsByClassName('go-index-btn');
    oChapterMenuList = document.querySelector('.options .chapter .menu');
    oPageMenuList = document.querySelector('.options .page .menu');
    aChapterMenuListLi = document.querySelectorAll('.options .chapter .menu li');
    aPageMenuListLi = document.querySelectorAll('.options .page .menu li');
    oComicImg = document.getElementById('comic-img');
    aComicPrevBtn = document.getElementsByClassName("page-prev-btn");
    aComicNextBtn = document.getElementsByClassName("page-next-btn");
    aChapterPrevBtn = document.getElementsByClassName("chapter-prev-btn");
    aChapterNextBtn = document.getElementsByClassName("chapter-next-btn");
    aFooterImg = document.querySelectorAll('.chapter-footer .imgbox img');
    oSwitchBtn = document.querySelector('.chapter-nav .icons .switch-btn');
    aFas = document.querySelectorAll('.chapter-nav .icons .fas');
    oFooterImgScrollView = document.querySelector('.bottom-nav .container-footer');
    oFooterImgScroll = document.querySelector('.bottom-nav .container-footer .list');
    oFooterBarScrollBg = document.querySelector('.chapter-footer .bottom-scrollbar .scrollbar-bg');
    oFooterBar = document.querySelector('.chapter-footer .bottom-scrollbar .bar');

    state = {
        Chapter: 1,
        ChapterPage: 1,
        totalChapter: 2,
        totalPage: 12,
        nightMod: false,
        footerScroll: false,
        footerBar: false
    };
    footerScrollState = {
        nowX: 0,
        maxX: -60
    };
    footerBarState = {
        nowX: 0,
        minX: undefined,//0
        maxX: undefined//parseInt(getCss(oFooterBarScrollBg, 'width')) - parseInt(getCss(oFooterBar, 'width'));
    }

    oFooterImgScrollView.addEventListener('mousedown', handleClick = () => {
        let oldX = event.clientX,
            scale = Math.abs(footerBarState.maxX / footerScrollState.maxX);
        // console.log(footerBarState.maxX); 430
        // state.footerImgScrollInitX=parseInt(getCss(oFooterImgScroll,"transform").split(',')[4]);
        oFooterImgScrollView.addEventListener('mousemove', footerScrollState.handleMove = () => {
            const newX = event.clientX;
            vX = (newX - oldX) / 10;
            oldX = newX;

            oFooterImgScroll.style.transform = `translateX(${footerScrollState.nowX + vX}%)`;
            footerScrollState.nowX += vX;
            footerBarState.nowX -= vX * scale;
            if (footerBarState.nowX > footerBarState.maxX) {//太右邊了
                footerBarState.nowX=footerBarState.maxX;
                
            }
            if(footerBarState.nowX < footerBarState.minX){//太左邊了
                footerBarState.nowX=footerBarState.minX;
            }

            oFooterBar.style.left = `${footerBarState.nowX}px`;
        })
    })
    document.querySelector('.chapter-footer .bottom-nav .prev').addEventListener('click', () => {
        footerScrollState.nowX = 0;
        footerBarState.nowX = footerBarState.minX;
        oFooterBar.style.left = footerBarState.nowX + 'px';
        oFooterImgScroll.style.transform = `translateX(${footerScrollState.nowX}%)`;
    })

    document.querySelector('.chapter-footer .bottom-nav .next').addEventListener('click', () => {
        footerScrollState.nowX = footerScrollState.maxX;
        footerBarState.nowX = footerBarState.maxX;
        oFooterBar.style.left = footerBarState.nowX + 'px';
        oFooterImgScroll.style.transform = `translateX(${footerScrollState.nowX}%)`;
    })
    document.documentElement.addEventListener('mouseup', () => {
        if (!footerScrollState.handleMove) {
            return;
        }
        oFooterImgScrollView.removeEventListener('mousemove', footerScrollState.handleMove);
        if (footerScrollState.nowX <= footerScrollState.maxX || footerScrollState.nowX >= 0) {
            footerScrollState.nowX = Math.min(0, footerScrollState.nowX);
            footerScrollState.nowX = Math.max(footerScrollState.maxX, footerScrollState.nowX);
            oFooterImgScroll.style.transform = `translateX(${footerScrollState.nowX}%)`;
        }
    })

    function changeNightMod() {
        state.nightMod = !state.nightMod;
        if (state.nightMod === true) {
            document.querySelector('.page-header h2').classList.add('nightMod');
            document.getElementsByClassName('container')[0].classList.add('nightMod');
            for (i = -1; aFas[++i];) {
                aFas[i].classList.add('nightMod');
            }
            document.querySelector('.options .title').classList.add('nightMod');
            document.querySelector('.chapter-nav .icons .switch-bar').style.borderColor = 'white';
            document.querySelector('.chapter-nav .icons .switch-bar .bar').classList.add('nightMod');
            aFooterImg[state.ChapterPage - 1].classList.replace('active', 'nightMod-active');
            document.querySelector('.bottom-scrollbar').classList.add('nightMod');
            // document.querySelector('.bottom-scrollbar .scrollbar-bg').classList.add('nightMod');
            // document.querySelector('.bottom-scrollbar .scrollbar-bg .bar').classList.add('nightMod');
        } else {
            document.querySelector('.page-header h2').classList.remove('nightMod');
            document.getElementsByClassName('container')[0].classList.remove('nightMod');
            for (i = -1; aFas[++i];) {
                aFas[i].classList.remove('nightMod');
            }
            document.querySelector('.options .title').classList.remove('nightMod');
            document.querySelector('.chapter-nav .icons .switch-bar').style.borderColor = '';
            document.querySelector('.chapter-nav .icons .switch-bar .bar').classList.remove('nightMod');
            aFooterImg[state.ChapterPage - 1].classList.replace('nightMod-active', 'active');
            document.querySelector('.bottom-scrollbar').classList.remove('nightMod');
            // document.querySelector('.bottom-scrollbar .scrollbar-bg').classList.remove('nightMod');
            // document.querySelector('.bottom-scrollbar .scrollbar-bg .bar').classList.remove('nightMod');
        }
    }
    function closeNightMod() {
        state.nightMod = false;
        document.querySelector('.page-header h2').classList.remove('nightMod');
        document.getElementsByClassName('container')[0].classList.remove('nightMod');
        for (i = -1; aFas[++i];) {
            aFas[i].classList.remove('nightMod');
        }
        document.querySelector('.options .title').classList.remove('nightMod');
        document.querySelector('.chapter-nav .icons .switch-bar').style.borderColor = '';
        document.querySelector('.chapter-nav .icons .switch-bar .bar').classList.remove('nightMod');
        aFooterImg[state.ChapterPage - 1].classList.replace('nightMod-active', 'active');
        document.querySelector('.bottom-scrollbar').classList.remove('nightMod');
    }

    oSwitchBtn.addEventListener('click', changeNightMod);
    // const hash = window.location.hash;
    //特別注意這兩個位子的結果不一樣，因為DOM沒顯示出來前是calc(100%-100px)
    // var x=window.getComputedStyle(oFooterBarScrollBg)['width'];
    // console.log(x);
    function redirect() {
        if (window.location.hash === '') {
            goHomePage(false);
        } else {
            goChapter(window.location.hash.match(/\d/g)[0], false);
            changeComicPage(window.location.hash.match(/\d/g)[1], false);
        }
        window.history.pushState(state, `chapter${state.Chapter}/page${state.ChapterPage}`, `#chapter${state.Chapter}/page${state.ChapterPage}`);
    }
    redirect();
    window.onpopstate = function () {
        if (window.location.hash === '') {
            goHomePage(false);
        } else {
            goChapter(window.location.hash.match(/\d/g)[0], false);
            changeComicPage(window.location.hash.match(/\d/g)[1], false);
        }
    };

    //DOM出現在頁面中  此時獲取的w是520px
    // var x=window.getComputedStyle(oFooterBarScrollBg)['width'];
    // console.log(x);
    for (let i = -1; aGoHomePageBtn[++i];) {
        aGoHomePageBtn[i].addEventListener('click', goHomePage);
    }
    for (let i = -1; aIndexChapterList[++i];) {
        aIndexChapterList[i].addEventListener('click', goChapter.bind("", i + 1));
    }

    for (let i = -1; aChapterMenuListLi[++i];) {
        aChapterMenuListLi[i].addEventListener('click', changeComicChapter.bind("", i + 1));
    }
    for (let i = -1; aPageMenuListLi[++i];) {
        aPageMenuListLi[i].addEventListener('click', changeComicPage.bind("", i + 1));
    }
    for (let i = -1; aFooterImg[++i];) {
        aFooterImg[i].addEventListener('click', () => {
            changeComicPage(i + 1);
        });
    }
    for (let i = -1; aComicPrevBtn[++i];) {
        aComicPrevBtn[i].addEventListener('click', () => {
            if (state.ChapterPage - 1 > 0) {
                changeComicPage(state.ChapterPage - 1);
            }
        });
    }
    for (let i = -1; aComicNextBtn[++i];) {
        aComicNextBtn[i].addEventListener('click', () => {
            if (state.ChapterPage + 1 <= state.totalPage) {
                changeComicPage(state.ChapterPage + 1);
            }
        });
    }
    for (let i = -1; aChapterPrevBtn[++i];) {
        aChapterPrevBtn[i].addEventListener('click', () => {
            if (state.Chapter - 1 > 0) {
                changeComicChapter(state.Chapter - 1);
            }
        });
    }
    for (let i = -1; aChapterNextBtn[++i];) {
        aChapterNextBtn[i].addEventListener('click', () => {
            if (state.Chapter + 1 <= state.totalChapter) {
                changeComicChapter(state.Chapter + 1);
            }
        });
    }

    oChapterBtn.addEventListener('click', function () {
        oChapterMenuList.classList.toggle('none');
        oPageMenuList.classList.add('none');
        window.event ? event.stopPropagation() : cancelBubble = true;
    });
    oPageBtn.addEventListener('click', function () {
        oPageMenuList.classList.toggle('none');
        oChapterMenuList.classList.add('none');
        window.event ? event.stopPropagation() : cancelBubble = true;
    });
    document.documentElement.addEventListener('click', function () {
        oChapterMenuList.classList.add('none');
        oPageMenuList.classList.add('none');
    })
    function goChapter(i, pushState = true) {
        state.Chapter = i;
        oComicImg.src = `img/chapter${state.Chapter}/page${state.ChapterPage}.png`;
        oChapterBtn.innerText = "Chapter " + i;
        // window.history.pushState(state, `chapter${state.Chapter}/page1`, `#chapter${state.Chapter}/page1`);
        document.getElementsByClassName('index-footer')[0].style.display = "none";
        document.getElementsByClassName('index-content')[0].style.display = "none";
        document.getElementsByClassName('chapter-content')[0].style.display = "flex";
        document.getElementsByClassName('chapter-nav')[0].style.display = "flex";
        document.getElementsByClassName('chapter-footer')[0].style.display = "block";
        state.footerScroll = true;
        state.footerBar = true;
        footerBarState.minX = 0;
        footerBarState.maxX = parseInt(getCss(oFooterBarScrollBg, 'width')) - parseInt(getCss(oFooterBar, 'width'));

        for (i = -1; aFooterImg[++i];) {
            aFooterImg[i].src = `img/chapter${state.Chapter}/page${i + 1}.png`;
        }
        aFooterImg[state.ChapterPage - 1].classList.add(state.nightMod ? 'nightMod-active' : 'active');
        if (pushState) {
            window.history.pushState(state, `chapter${state.Chapter}/page${state.ChapterPage}`, `#chapter${state.Chapter}/page${state.ChapterPage}`);
        }
    }
    function changeComicPage(i, pushState = true) {
        aFooterImg[state.ChapterPage - 1].classList.remove(state.nightMod ? 'nightMod-active' : 'active');
        oPageBtn.innerText = "Page " + i;
        state.ChapterPage = i;
        oComicImg.src = `img/chapter${state.Chapter}/page${state.ChapterPage}.png`;
        aFooterImg[state.ChapterPage - 1].classList.add(state.nightMod ? 'nightMod-active' : 'active');
        if (pushState) {
            window.history.pushState(state, `chapter${state.Chapter}/page${state.ChapterPage}`, `#chapter${state.Chapter}/page${state.ChapterPage}`);
        }
    }
    function changeComicChapter(i, pushState = true) {
        //改變章節就從第一頁開始看
        aFooterImg[state.ChapterPage - 1].classList.remove(state.nightMod ? 'nightMod-active' : 'active');
        state.ChapterPage = 1;
        state.Chapter = i;
        oComicImg.src = `img/chapter${state.Chapter}/page${state.ChapterPage}.png`;
        oChapterBtn.innerText = "Chapter " + i;
        oPageBtn.innerText = "Page " + state.ChapterPage;
        aFooterImg[state.ChapterPage - 1].classList.add(state.nightMod ? 'nightMod-active' : 'active');
        window.history.pushState(state, `chapter${state.Chapter}/page1`, `#chapter${state.Chapter}/page1`);
        for (i = -1; aFooterImg[++i];) {
            aFooterImg[i].src = `img/chapter${state.Chapter}/page${i + 1}.png`;
        }
        if (pushState) {
            window.history.pushState(state, `chapter${state.Chapter}/page${state.ChapterPage}`, `#chapter${state.Chapter}/page${state.ChapterPage}`);
        }
    }
    function goHomePage(pushState = true) {
        if (pushState) {
            window.history.pushState(state, "index", 'index.htm');
        }
        document.getElementsByClassName('index-footer')[0].style.display = "block";
        document.getElementsByClassName('index-content')[0].style.display = "block";
        document.getElementsByClassName('chapter-content')[0].style.display = "none";
        document.getElementsByClassName('chapter-nav')[0].style.display = "none";
        document.getElementsByClassName('chapter-footer')[0].style.display = "none";
        state.footerScroll = false;
        state.footerBar = false;
        closeNightMod();
    }
}
function getCss(ele, attr) {
    return window.getComputedStyle ? window.getComputedStyle(ele)[attr] : ele.currentStyle[attr];
}
