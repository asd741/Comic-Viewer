const indexSass = require('./index.sass');
window.onload = function () {
    state = {
        Chapter: 1,
        ChapterPage: 1,
        totalChapter: 2,
        totalPage: 12,
        nightMod: false,
        footerImgScrollInitX: 0,
        oFooterImgScrollvX: 0
    };
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
    oFooterImgScroll = document.querySelector('.bottom-nav .container-footer .list');
    oFooterImgScroll.addEventListener('mousedown', handleClick = () => {
        // state.footerImgScrollInitX=state.footerImgScrollInitX+state.oFooterImgScrollvX;
        // console.log(state.footerImgScrollInitX, state.oFooterImgScrollvX);
        
        const startClientX = event.clientX;
        oFooterImgScroll.addEventListener('mousemove', handleMove = () => {
            const nowClientX = event.clientX;
            state.oFooterImgScrollvX = (nowClientX - startClientX) / 10;
            oFooterImgScroll.style.transform = `translateX(${state.footerImgScrollInitX + state.oFooterImgScrollvX}%)`;
        })
    })
    document.documentElement.addEventListener('mouseup', () => {
        oFooterImgScroll.removeEventListener('mousemove', handleMove);
        state.footerImgScrollInitX += state.oFooterImgScrollvX;
        state.footerImgScrollInitX=Math.min(0,state.footerImgScrollInitX);
        state.footerImgScrollInitX=Math.max(-100,state.footerImgScrollInitX);
        oFooterImgScroll.style.transform = `translateX(${state.footerImgScrollInitX + state.oFooterImgScrollvX}%)`;
        // console.log(state.footerImgScrollInitX, state.oFooterImgScrollvX);
        // state.footerImgScrollInitX
        // state.oFooterImgScrollvX
        // Math.min();
        // Math.max();
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
    const hash = window.location.hash;
    if (hash === '') {
        goHomePage();
    } else {
        goChapter(hash.match(/\d/g)[0]);
        changeComicPage(hash.match(/\d/g)[1]);
    }
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
    function goChapter(i) {
        state.Chapter = i;
        oComicImg.src = `img/chapter${state.Chapter}/page${state.ChapterPage}.png`;
        oChapterBtn.innerText = "Chapter " + i;
        window.history.pushState(state, `chapter${state.Chapter}/page1`, `#chapter${state.Chapter}/page1`);
        document.getElementsByClassName('index-footer')[0].style.display = "none";
        document.getElementsByClassName('index-content')[0].style.display = "none";
        document.getElementsByClassName('chapter-content')[0].style.display = "flex";
        document.getElementsByClassName('chapter-nav')[0].style.display = "flex";
        document.getElementsByClassName('chapter-footer')[0].style.display = "block";
        for (i = -1; aFooterImg[++i];) {
            aFooterImg[i].src = `img/chapter${state.Chapter}/page${i + 1}.png`;
        }
        aFooterImg[state.ChapterPage - 1].classList.add(state.nightMod ? 'nightMod-active' : 'active');
    }
    function changeComicPage(i) {
        aFooterImg[state.ChapterPage - 1].classList.remove(state.nightMod ? 'nightMod-active' : 'active');
        oPageBtn.innerText = "Page " + i;
        state.ChapterPage = i;
        oComicImg.src = `img/chapter${state.Chapter}/page${state.ChapterPage}.png`;
        aFooterImg[state.ChapterPage - 1].classList.add(state.nightMod ? 'nightMod-active' : 'active');
        window.history.pushState(state, `chapter${state.Chapter}/page${state.ChapterPage}`, `#chapter${state.Chapter}/page${state.ChapterPage}`);
    }
    function changeComicChapter(i) {
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
    }
    function goHomePage() {
        window.history.pushState(state, "index", 'index.htm');
        document.getElementsByClassName('index-footer')[0].style.display = "block";
        document.getElementsByClassName('index-content')[0].style.display = "block";
        document.getElementsByClassName('chapter-content')[0].style.display = "none";
        document.getElementsByClassName('chapter-nav')[0].style.display = "none";
        document.getElementsByClassName('chapter-footer')[0].style.display = "none";
        closeNightMod();
    }
}