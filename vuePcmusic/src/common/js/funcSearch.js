// 搜索歌曲功能函数

export function funcSearch() {
    // 显示搜索页 隐藏列表页
    $('#pageSearch .listcontainer').css('display','block').animate({top:"60px",opacity: 1},500)
    $('#pageMain .listcontainer').animate({top:"100%",opacity: 0},500).css('display','none')
    // 缩放歌曲详情页
    $("#pageSongDetail").css({
        "top":"100%",
        "right":"100%",
        "opacity":0
    });
};


export function funcMain() {
    // 显示搜索页 隐藏列表页
    $('#pageMain .listcontainer').css('display','block').animate({top:"60px",opacity: 1},500)
    $('#pageSearch .listcontainer').animate({top:"100%",opacity: 0},500).css('display','none')
}
