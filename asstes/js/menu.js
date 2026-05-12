(function () {
    var menuItems = [
        { title: "홈", href: "./index.html", desc: "학습 메인 페이지" },
        { title: "레이아웃", href: "./layout.html", desc: "그리드/정렬/간격" },
        { title: "인터랙션", href: "./interaction.html", desc: "동작/상태/피드백" },
        { title: "모달", href: "./modal.html", desc: "팝업/오버레이 UI" },
        { title: "팝업", href: "./popup.html", desc: "독립 브라우저 창 UI" },
        { title: "알럿", href: "./alert.html", desc: "경고/확인 인터페이스" },
        { title: "토스트", href: "./toast.html", desc: "비차단 알림 UI" },
        { title: "페이지네이션", href: "./pagination.html", desc: "목록 분할 네비게이션" },
        { title: "툴팁", href: "./tooltip.html", desc: "보조 설명 인터페이스" },
        { title: "드롭다운", href: "./dropdown.html", desc: "선택 리스트 UI" },
        { title: "카드 UI", href: "./card-ui.html", desc: "카드형 콘텐츠 레이아웃" },
        { title: "CTA", href: "./cta.html", desc: "행동 유도 인터페이스" },
        { title: "캐러셀", href: "./carousel.html", desc: "슬라이드 배너 UI" },
        { title: "라이트박스", href: "./lightbox.html", desc: "이미지 확대 감상 UI" },
        { title: "스텝퍼", href: "./stepper.html", desc: "다단계 진행 UI" },
        { title: "아코디언", href: "./accordion.html", desc: "접기/펼치기 UI" },
        { title: "픽커", href: "./picker.html", desc: "날짜/시간/색상 선택 UI" },
        { title: "브레드크럼", href: "./breadcrumb.html", desc: "계층 구조 네비게이션 UI" },
        { title: "코치마크", href: "./coachmark.html", desc: "사용자 가이드 및 온보딩 UI" },
        { title: "인풋 필드", href: "./input-field.html", desc: "사용자 데이터 입력 UI" },
        { title: "플레이스홀더", href: "./placeholder.html", desc: "입력창 힌트 문구 UI" },
        { title: "로딩 스피너", href: "./spinner.html", desc: "로딩 상태 표시 UI" },
        { title: "토글", href: "./toggle.html", desc: "켜기/끄기 스위치 UI" },
        { title: "프로그레스바", href: "./progress-bar.html", desc: "진행 상황 표시 UI" },
        { title: "문의하기", href: "./contact.html", desc: "서비스 문의 및 피드백" }
    ];

    function buildSidebar() {
        var currentPath = window.location.pathname.split("/").pop() || "index.html";
        var menuHtml = menuItems.map(function (item) {
            var activeClass = item.href.indexOf(currentPath) > -1 ? "is-active" : "";
            return (
                '<li class="menu-item">' +
                '<a class="menu-link ' + activeClass + '" href="' + item.href + '" data-menu-title="' + item.title.toLowerCase() + '">' +
                "<strong>" + item.title + "</strong>" +
                '<span class="menu-desc">' + item.desc + "</span>" +
                "</a>" +
                "</li>"
            );
        }).join("");

        return (
            '<div class="sidebar">' +
            '<div class="brand-area">' +
            '<img src="./asstes/images/menu-banner.svg" alt="사이드 메뉴 이미지" class="brand-image">' +
            '<h2 class="brand-title">UI/UX Study</h2>' +
            "</div>" +
            '<label class="search-label" for="menu-search">메뉴 검색</label>' +
            '<input id="menu-search" class="menu-search" type="search" placeholder="메뉴 이름을 입력하세요">' +
            '<ul id="menu-list" class="menu-list">' + menuHtml + "</ul>" +
            "</div>"
        );
    }

    function bindMenuSearch() {
        $("#menu-search").on("input", function () {
            var keyword = $(this).val().toLowerCase().trim();
            $(".menu-link").each(function () {
                var title = $(this).data("menu-title");
                var isMatched = title.indexOf(keyword) > -1;
                $(this).closest(".menu-item").toggle(isMatched);
            });
        });
    }

    function buildFooter() {
        var year = new Date().getFullYear();
        return (
            '<footer class="site-footer">' +
            '<div class="footer-inner">' +

            '<div class="footer-top">' +
            '<div class="footer-brand">' +
            '<p class="footer-logo">UI/UX Study</p>' +
            '<p class="footer-tagline">HTML · CSS · JavaScript · jQuery 3.7 기반<br>UI 컴포넌트 학습 사이트</p>' +
            '</div>' +
            '<nav class="footer-nav" aria-label="푸터 내비게이션">' +
            '<a href="./index.html">홈</a>' +
            '<a href="./contact.html">문의하기</a>' +
            '<a href="./privacy.html">개인정보처리방침</a>' +
            '<a href="./terms.html">이용약관</a>' +
            '</nav>' +
            '</div>' +

            '<hr class="footer-divider">' +

            '<div class="footer-bottom">' +
            '<p class="footer-copy">&copy; ' + year + ' UI/UX Study. All rights reserved.</p>' +
            '<div class="footer-badges">' +
            '<span class="footer-badge">jQuery 3.7</span>' +
            '<span class="footer-badge">HTML5</span>' +
            '<span class="footer-badge">CSS3</span>' +
            '</div>' +
            '</div>' +

            '</div>' +
            '</footer>'
        );
    }

    $(function () {
        var $root = $("#sidebar-root");
        if (!$root.length) {
            return;
        }

        $root.html(buildSidebar());
        bindMenuSearch();

        // 푸터를 .content-area 안 마지막에 주입
        var $contentArea = $(".content-area");
        if ($contentArea.length && !$contentArea.find(".site-footer").length) {
            $contentArea.append(buildFooter());
        }
    });
})();
