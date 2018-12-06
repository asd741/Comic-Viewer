const indexSass=require('./index.sass');
window.onload=function(){
    aChapterList=document.querySelectorAll(".page-footer .chapter-box .chapter-list");
    oChapterNavBtn=document.querySelector(".chapter-nav .chapter");
    oPageNavBtn=document.querySelector(".chapter-nav .page");
    aGoIndexBtn=document.getElementsByClassName('go-index-btn');
    for(let i=-1;aGoIndexBtn[++i];){
        aGoIndexBtn[i].addEventListener('click',goIndexPage);
    }
    for(let i=-1;aChapterList[++i];){
        aChapterList[i].addEventListener('click',goChapterPage.bind("",i+1));
    }
    oChapterNavBtn.addEventListener('click',function(){
        this.getElementsByClassName('menu')[0].classList.toggle('none');
        oPageNavBtn.getElementsByClassName('menu')[0].classList.add('none');
        window.event?event.stopPropagation():cancelBubble=true;
    },true);
    oPageNavBtn.addEventListener('click',function(){
        this.getElementsByClassName('menu')[0].classList.toggle('none');
        oChapterNavBtn.getElementsByClassName('menu')[0].classList.add('none');
        window.event?event.stopPropagation():cancelBubble=true;
    },true);
    document.documentElement.addEventListener('click',function(){
        oChapterNavBtn.getElementsByClassName('menu')[0].classList.add('none');
        oPageNavBtn.getElementsByClassName('menu')[0].classList.add('none');
    })
    function goChapterPage(chapter){
        document.getElementsByClassName('index-footer')[0].style.display="none";
        document.getElementsByClassName('index-content')[0].style.display="none";
        document.getElementsByClassName('chapter-content')[0].style.display="block";
        document.getElementsByClassName('chapter-nav')[0].style.display="flex";
    }
    function goIndexPage(){
        document.getElementsByClassName('index-footer')[0].style.display="block";
        document.getElementsByClassName('index-content')[0].style.display="block";
        document.getElementsByClassName('chapter-content')[0].style.display="none";
        document.getElementsByClassName('chapter-nav')[0].style.display="none";
    }
}