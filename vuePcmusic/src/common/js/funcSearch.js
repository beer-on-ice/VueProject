// 搜索歌曲功能函数

export function funcSearch() {
    // 显示搜索页 隐藏列表页
    $('#pageSearch').css('display','block').animate({top:"0",opacity: 1},500)
    $('#pageMain').animate({top:"100%",opacity: 0},500).css('display','none')
    // 缩放歌曲详情页
    $("#pageSongDetail").css({
        "top":"100%",
        "right":"100%",
        "opacity":0
    });
};


export function funcMain() {
    // 显示搜索页 隐藏列表页
    $('#pageMain').css('display','block').animate({top:"0",opacity: 1},500)
    $('#pageSearch').animate({top:"100%",opacity: 0},500).css('display','none')
}
