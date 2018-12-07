const indexSass=require('./index.sass');
window.onload=function(){
    if(window.location.hash===''){
        goIndex();
    }else{
        goChapter(1);
    }
    
    // window.location.href.indexOf('#')
    // goIndex();
    aIndexChapterList=document.querySelectorAll(".page-footer .chapter-box .chapter-list");
    oChapterBtn=document.querySelector(".chapter-nav .chapter");
    oPageBtn=document.querySelector(".chapter-nav .page");
    aGoIndexBtn=document.getElementsByClassName('go-index-btn');
    aChapterMenuList=document.querySelectorAll('.options .chapter .menu li');
    aPageMenuList=document.querySelectorAll('.options .page .menu li');
    for(let i=-1;aGoIndexBtn[++i];){
        aGoIndexBtn[i].addEventListener('click',goIndex);
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
    },true);
    oPageBtn.addEventListener('click',function(){
        this.getElementsByClassName('menu')[0].classList.toggle('none');
        oChapterBtn.getElementsByClassName('menu')[0].classList.add('none');
        window.event?event.stopPropagation():cancelBubble=true;
    },true);
    document.documentElement.addEventListener('click',function(){
        oChapterBtn.getElementsByClassName('menu')[0].classList.add('none');
        oPageBtn.getElementsByClassName('menu')[0].classList.add('none');
    })
    function goChapter(i){
        window.history.pushState('','chapter'+i,"#chapter"+i);
        document.getElementsByClassName('index-footer')[0].style.display="none";
        document.getElementsByClassName('index-content')[0].style.display="none";
        document.getElementsByClassName('chapter-content')[0].style.display="flex";
        document.getElementsByClassName('chapter-nav')[0].style.display="flex";
        document.getElementsByClassName('chapter-footer')[0].style.display="block";
    }
    function changeComicPage(i){
        alert("!!!");
        window.history.pushState('','page'+i,"#chapter"+i+"/page"+i);
    }
    function changeComicChapter(i){
        alert("???");
        window.history.pushState('','chapter'+i,"#chapter"+i);
    }
    function goIndex(){
        window.history.pushState('',"index",'index.htm');
        document.getElementsByClassName('index-footer')[0].style.display="block";
        document.getElementsByClassName('index-content')[0].style.display="block";
        document.getElementsByClassName('chapter-content')[0].style.display="none";
        document.getElementsByClassName('chapter-nav')[0].style.display="none";
        document.getElementsByClassName('chapter-footer')[0].style.display="none";
    }
}