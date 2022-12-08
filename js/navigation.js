// 返回顶部 显示网页阅读进度
// window.onmousewheel = percent; // 执行函数
// 页面百分比
function percent() {
    let a = document.documentElement.scrollTop || window.pageYOffset, // 卷去高度
        b =
            Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.offsetHeight,
                document.body.clientHeight,
                document.documentElement.clientHeight
            ) - document.documentElement.clientHeight, // 整个网页高度 减去 可视高度
        result = Math.round((a / b) * 100), // 计算百分比
        btn = document.querySelector("#percent"); // 获取图标
    document.getElementById("page-name").innerText = document.title.split(" | 清河")[0];
    result <= 99 || (result = 99), (btn.innerHTML = result);
}
function whenDOMready() {
    percent();

}
whenDOMready();
document.addEventListener("pjax:complete",whenDOMready);
/*
function addEvent(obj,xEvent,fn) {
    if(obj.attachEvent){
        obj.attachEvent('on'+xEvent,fn);
    }else{
        obj.addEventListener(xEvent,fn,false);
    }
}
window.onload = function () {
    //接着利用我们自己封装的函数给div绑定事件，
    var oDiv = window.document.body;
    addEvent(oDiv,'mousewheel',onMouseWheel);
    addEvent(oDiv,'DOMMouseScroll',onMouseWheel);
    // 当滚轮事件发生时，执行onMouseWheel这个函数
    function onMouseWheel() {
        percent();
    }
}
*/
// 存数据
// name：命名 data：数据
function saveData(name, data) {
    localStorage.setItem(name, JSON.stringify({ 'time': Date.now(), 'data': data }))
}

// 取数据
// name：命名 time：过期时长,单位分钟,如传入30,即加载数据时如果超出30分钟返回0,否则返回数据
function loadData(name, time) {
    let d = JSON.parse(localStorage.getItem(name));
    // 过期或有错误返回 0 否则返回数据
    if (d) {
        let t = Date.now() - d.time
        if (t < (time * 60 * 1000) && t > -1) return d.data;
    }
    return 0;
}

// 上面两个函数如果你有其他需要存取数据的功能，也可以直接使用

// 读取背景
try {
    let data = loadData('blogbg', 1440)
    if (data) changeBg(data, 1)
    else localStorage.removeItem('blogbg');
} catch (error) { localStorage.removeItem('blogbg'); }

// 切换背景函数
// 此处的flag是为了每次读取时都重新存储一次,导致过期时间不稳定
// 如果flag为0则存储,即设置背景. 为1则不存储,即每次加载自动读取背景.
function changeBg(s, flag) {
    let bg = document.getElementById('web_bg')
    if (s.charAt(0) == '#') {
        bg.style.backgroundColor = s
        bg.style.backgroundImage = 'none'
    } else
        bg.style.backgroundImage = s
        bg.style.opacity = 0.6
    if (!flag) { saveData('blogbg', s) }
}

// 以下为2.0新增内容

// 创建窗口
var winbox = ''

function createWinbox() {
    let div = document.createElement('div')
    document.body.appendChild(div)
    winbox = WinBox({
        id: 'changeBgBox',
        index: 999,
        title: "切换背景",
        x: "center",
        y: "center",
        minwidth: '300px',
        height: "60%",
        background: 'var(--leonus-blue)',
        onmaximize: () => { div.innerHTML = `<style>body::-webkit-scrollbar {display: none;}div#changeBgBox {width: 100% !important;}</style>` },
        onrestore: () => { div.innerHTML = '' }
    });
    winResize();
    window.addEventListener('resize', winResize)

    // 每一类我放了一个演示，直接往下复制粘贴 a标签 就可以，需要注意的是 函数里面的链接 冒号前面需要添加反斜杠\进行转义
    winbox.body.innerHTML = `
    <div id="article-container" style="padding:10px;">
    
    <p><button onclick="localStorage.removeItem('blogbg');location.reload();" style="background:#5fcdff;display:block;width:100%;padding: 15px 0;border-radius:6px;color:white;"><i class="fa-solid fa-arrows-rotate"></i> 点我恢复默认背景</button></p>
<!--    <h2 id="图片（手机）"><a href="#图片（手机）" class="headerlink" title="图片（手机）"></a>图片（手机）</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2021/12/2021122715170589.jpeg)" class="pimgbox" onclick="changeBg('url(https\://img.vm.laomishuo.com/image/2021/12/2021122715170589.jpeg)')"></a>
    </div>-->
    
    <h2 id="图片（电脑）"><a href="#图片（电脑）" class="headerlink" title="图片（电脑）"></a>图片（电脑）</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cn.bing.com/th?id=OHR.GBRTurtle_ZH-CN6069093254_1920x1080.jpg)" class="imgbox" onclick="changeBg('url(https\://cn.bing.com/th?id=OHR.GBRTurtle_ZH-CN6069093254_1920x1080.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://image.buretuzi.online/blog/%E9%85%8D%E7%BD%AE%E5%9B%BE%E7%89%87/back.jpg)" class="imgbox" onclick="changeBg('url(https://image.buretuzi.online/blog/%E9%85%8D%E7%BD%AE%E5%9B%BE%E7%89%87/back.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://image.buretuzi.online/blog/%E9%85%8D%E7%BD%AE%E5%9B%BE%E7%89%87/back1.jpg)" class="imgbox" onclick="changeBg('url(https://image.buretuzi.online/blog/%E9%85%8D%E7%BD%AE%E5%9B%BE%E7%89%87/back1.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://image.buretuzi.online/blog/%E9%85%8D%E7%BD%AE%E5%9B%BE%E7%89%87/back2.jpg)" class="imgbox" onclick="changeBg('url(https://image.buretuzi.online/blog/%E9%85%8D%E7%BD%AE%E5%9B%BE%E7%89%87/back2.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://image.buretuzi.online/blog/%E9%85%8D%E7%BD%AE%E5%9B%BE%E7%89%87/back3.jpg)" class="imgbox" onclick="changeBg('url(https://image.buretuzi.online/blog/%E9%85%8D%E7%BD%AE%E5%9B%BE%E7%89%87/back3.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://image.buretuzi.online/blog/%E9%85%8D%E7%BD%AE%E5%9B%BE%E7%89%87/back4.jpg)" class="imgbox" onclick="changeBg('url(https://image.buretuzi.online/blog/%E9%85%8D%E7%BD%AE%E5%9B%BE%E7%89%87/back4.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://image.buretuzi.online/blog/%E9%85%8D%E7%BD%AE%E5%9B%BE%E7%89%87/back5.jpg)" class="imgbox" onclick="changeBg('url(https://image.buretuzi.online/blog/%E9%85%8D%E7%BD%AE%E5%9B%BE%E7%89%87/back5.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://image.buretuzi.online/blog/%E9%85%8D%E7%BD%AE%E5%9B%BE%E7%89%87/back6.png)" class="imgbox" onclick="changeBg('url(https://image.buretuzi.online/blog/%E9%85%8D%E7%BD%AE%E5%9B%BE%E7%89%87/back6.png)')"></a>
    </div>
    
    
    
    <h2 id="渐变色"><a href="#渐变色" class="headerlink" title="渐变色"></a>渐变色</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #eecda3, #ef629f)" onclick="changeBg('linear-gradient(to right, #eecda3, #ef629f)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #07C89C, #F42752)" onclick="changeBg('linear-gradient(to right, #07C89C, #F42752)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #E5508A, #05BEA7)" onclick="changeBg('linear-gradient(to right, #E5508A, #05BEA7)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #02CB9F, #2623FA)" onclick="changeBg('linear-gradient(to right, #02CB9F, #2623FA)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #4356D6, #D632BB)" onclick="changeBg('linear-gradient(to right, #4356D6, #D632BB)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #442E9A, #05D1D3)" onclick="changeBg('linear-gradient(to right, #442E9A, #05D1D3)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #F22553, #0345EB)" onclick="changeBg('linear-gradient(to right, #F22553, #0345EB)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #FB704E, #0DCCED)" onclick="changeBg('linear-gradient(to right, #FB704E, #0DCCED)')"></a>
    
    </div>
    
    <h2 id="纯色"><a href="#纯色" class="headerlink" title="纯色"></a>纯色</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #f7f9fe" onclick="changeBg('#f7f9fe')"></a> 
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #fbecde" onclick="changeBg('#fbecde')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #eea6b7" onclick="changeBg('#eea6b7')"></a> 
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #05D1D3" onclick="changeBg('#05D1D3')"></a> 
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #D0BA0C" onclick="changeBg('#D0BA0C')"></a> 
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #7D9D9C" onclick="changeBg('#7D9D9C')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #048181" onclick="changeBg('#048181')"></a> 
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #9F365F" onclick="changeBg('#9F365F')"></a> 
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #038859" onclick="changeBg('#038859')"></a> 
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #332175" onclick="changeBg('#332175')"></a> 
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #30303c" onclick="changeBg('#30303c')"></a> 
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #7a7374" onclick="changeBg('#7a7374')"></a> 
    
    
    </div>
`;
}

// 适应窗口大小
function winResize() {
    var offsetWid = document.documentElement.clientWidth;
    if (offsetWid <= 768) {
        winbox.resize(offsetWid * 0.95 + "px", "90%").move("center", "center");
    } else {
        winbox.resize(offsetWid * 0.6 + "px", "70%").move("center", "center");
    }
}

// 切换状态，窗口已创建则控制窗口显示和隐藏，没窗口则创建窗口
function toggleWinbox() {
    if (document.querySelector('#changeBgBox')) winbox.toggleClass('hide');
    else createWinbox();
}


