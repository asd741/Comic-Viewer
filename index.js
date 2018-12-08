const indexSass=require('./index.sass');
window.onload=function(){
    const state={
        Chapter:1,
        ChapterPage:1,
        totalChapter:2,
        totalPage:12
    };
    if(window.location.hash===''){
        goHomePage();
    }else{
        goChapter(1);
    }
    // window.location.href.indexOf('#')
    // goHomePage();
    aIndexChapterList=document.querySelectorAll(".page-footer .chapter-box .chapter-list");
    oChapterBtn=document.querySelector(".options .chapter .chapter-btn");
    oPageBtn=document.querySelector(".options .page .page-btn");
    goHomePageBtn=document.getElementsByClassName('go-index-btn');
    oChapterMenuList=document.querySelector('.options .chapter .menu');
    oPageMenuList=document.querySelector('.options .page .menu');
    aChapterMenuListLi=document.querySelectorAll('.options .chapter .menu li');
    aPageMenuListLi=document.querySelectorAll('.options .page .menu li');
    oComicImg=document.getElementById('comic-img');
    oComicPrevBtn=document.querySelector(".chapter-content .prev");
    oComicNextBtn=document.querySelector(".chapter-content .next");
    oComicPrevBtn.addEventListener('click',()=>{
        if(state.ChapterPage-1>0){
            changeComicPage(--state.ChapterPage);
        }
    });
    oComicNextBtn.addEventListener('click',()=>{
        if(state.ChapterPage+1<=state.totalPage){
            changeComicPage(++state.ChapterPage);
        }
    });
    for(let i=-1;goHomePageBtn[++i];){
        goHomePageBtn[i].addEventListener('click',goHomePage);
    }
    for(let i=-1;aIndexChapterList[++i];){
        aIndexChapterList[i].addEventListener('click',goChapter.bind("",i+1));
    }
    for(let i=-1;aChapterMenuListLi[++i];){
        aChapterMenuListLi[i].addEventListener('click',changeComicChapter.bind("",i+1));
    }
    for(let i=-1;aPageMenuListLi[++i];){
        aPageMenuListLi[i].addEventListener('click',changeComicPage.bind("",i+1));
    }
    oChapterBtn.addEventListener('click',function(){
        oChapterMenuList.classList.toggle('none');
        oPageMenuList.classList.add('none');
        window.event?event.stopPropagation():cancelBubble=true;
    });
    oPageBtn.addEventListener('click',function(){
        oPageMenuList.classList.toggle('none');
        oChapterMenuList.classList.add('none');
        window.event?event.stopPropagation():cancelBubble=true;
    });
    document.documentElement.addEventListener('click',function(){
        oChapterMenuList.classList.add('none');
        oPageMenuList.classList.add('none');
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
        oPageBtn.innerText="Page "+i;
        state.ChapterPage=i;
        window.history.pushState(state,`chapter${state.Chapter}/page${state.ChapterPage}`,`#chapter${state.Chapter}/page${state.ChapterPage}`);
    }
    function changeComicChapter(i){
        //改變章節就從第一頁開始看
        oComicImg.src='img/page'+i+'.png';
        state.ChapterPage=i;
        oChapterBtn.innerText="Chapter "+i;
        state.Chapter=i;
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