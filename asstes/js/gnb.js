/**
 * GNB (Global Navigation Bar) — 카테고리 탭 자동 주입
 * menu.js와 함께 로드됩니다.
 */
(function () {
    var gnbItems = [
        { label: 'HTML / CSS 기초',       href: './cat-html-css.html',  cat: 'cat1' },
        { label: 'JavaScript & jQuery',   href: './cat-js-jquery.html', cat: 'cat2' },
        { label: '스터디 커뮤니티',         href: './cat-community.html', cat: 'cat3' },
        { label: '디자인 → 코드',           href: './cat-design.html',    cat: 'cat4' }
    ];

    function buildGnb() {
        var currentPath = window.location.pathname.split('/').pop() || 'index.html';

        var tabsHtml = gnbItems.map(function (item) {
            var isActive = currentPath === item.href.replace('./', '') ? 'is-active' : '';
            return (
                '<li class="gnb-tab ' + item.cat + '">' +
                '<a href="' + item.href + '" class="' + isActive + '">' +
                '<span class="tab-dot"></span>' +
                item.label +
                '</a>' +
                '</li>'
            );
        }).join('');

        return (
            '<nav class="gnb" aria-label="카테고리 내비게이션">' +
            '<a class="gnb-logo" href="./index.html">in.me.kr</a>' +
            '<ul class="gnb-tabs">' + tabsHtml + '</ul>' +
            '</nav>'
        );
    }

    $(function () {
        var $gnbRoot = $('#gnb-root');
        if ($gnbRoot.length) {
            $gnbRoot.html(buildGnb());
            $('body').addClass('has-gnb');
        }
    });
})();
