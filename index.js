const indexSass=require('./index.sass');
window.onload=function(){
    const state={
        Chapter:1,
        ChapterPage:1
    };
    if(window.location.hash===''){
        goHomePage();
    }else{
        goChapter(1);
    }
    // window.location.href.indexOf('#')
    // goHomePage();
    aIndexChapterList=document.querySelectorAll(".page-footer .chapter-box .chapter-list");
    oChapterBtn=document.querySelector(".chapter-nav .chapter");
    oPageBtn=document.querySelector(".chapter-nav .page");
    agoHomePageBtn=document.getElementsByClassName('go-index-btn');
    aChapterMenuList=document.querySelectorAll('.options .chapter .menu li');
    aPageMenuList=document.querySelectorAll('.options .page .menu li');
    oComicImg=document.getElementById('comic-img');
    oComicPrevBtn=document.querySelector(".chapter-content .prev");
    oComicNextBtn=document.querySelector(".chapter-content .next");
    oComicPrevBtn.addEventListener('click',changeComicPage.bind('',--state.ChapterPage));
    oComicNextBtn.addEventListener('click',changeComicPage.bind('',++state.ChapterPage));
    for(let i=-1;agoHomePageBtn[++i];){
        agoHomePageBtn[i].addEventListener('click',goHomePage);
    }
    for(let i=-1;aIndexChapterList[++i];){
        aIndexChapterList[i].addEventListener('click',goChapter.bind("",i+1));
    }
    for(let i=-1;aChapterMenuList[++i];){
        aChapterMenuList[i].addEventListener('click',changeComicChapter.bind("",i+1));
    }
    for(let i=-1;aPageMenuList[++i];){
        aPageMenuList[i].addEventListener('click',changeComicPage.bind("",i+1));
    }
    oChapterBtn.addEventListener('click',function(){
        this.getElementsByClassName('menu')[0].classList.toggle('none');
        oPageBtn.getElementsByClassName('menu')[0].classList.add('none');
        window.event?event.stopPropagation():cancelBubble=true;
    });
    oPageBtn.addEventListener('click',function(){
        this.getElementsByClassName('menu')[0].classList.toggle('none');
        oChapterBtn.getElementsByClassName('menu')[0].classList.add('none');
        window.event?event.stopPropagation():cancelBubble=true;
    });
    document.documentElement.addEventListener('click',function(){
        oChapterBtn.getElementsByClassName('menu')[0].classList.add('none');
        oPageBtn.getElementsByClassName('menu')[0].classList.add('none');
    })
    function goChapter(i){
        window.history.pushState(state,'chapter'+i,"#chapter"+i);
        document.getElementsByClassName('index-footer')[0].style.display="none";
        document.getElementsByClassName('index-content')[0].style.display="none";
        document.getElementsByClassName('chapter-content')[0].style.display="flex";
        document.getElementsByClassName('chapter-nav')[0].style.display="flex";
        document.getElementsByClassName('chapter-footer')[0].style.display="block";
    }
    function changeComicPage(i){
        oComicImg.src='img/page'+i+'.png';
        state.ChapterPage=i;
        window.history.pushState(state,`chapter${state.Chapter}/page${state.ChapterPage}`,`#chapter${state.Chapter}/page${state.ChapterPage}`);
    }
    function changeComicChapter(i){
        state.Chapter=i;
        console.log(state.ChapterPage);

        window.history.pushState(state,`chapter${state.Chapter}/page1`,`#chapter${state.Chapter}/page1`);
    }
    function goHomePage(){
        window.history.pushState(state,"index",'index.htm');
        document.getElementsByClassName('index-footer')[0].style.display="block";
        document.getElementsByClassName('index-content')[0].style.display="block";
        document.getElementsByClassName('chapter-content')[0].style.display="none";
        document.getElementsByClassName('chapter-nav')[0].style.display="none";
        document.getElementsByClassName('chapter-footer')[0].style.display="none";
    }
}