const indexSass=require('./index.sass');
window.onload=function(){
    aChapterList=document.querySelectorAll(".page-footer .chapter-box .chapter-list");
    for(let i=-1;aChapterList[++i];){
        aChapterList[i].addEventListener('click',goChapterPage.bind("",i+1));
    }
    function goChapterPage(chapter){
        document.getElementsByClassName('index-footer')[0].style.display="none";
        document.getElementsByClassName('index-content')[0].style.display="none";
        document.getElementsByClassName('chapter-content')[0].style.display="block";
        document.getElementsByClassName('chapter-nav')[0].style.display="flex";
    }
}