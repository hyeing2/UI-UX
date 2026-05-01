$(function () {
    $(".content-card").on("click", function () {
        $(this).toggleClass("is-highlighted");
    });

    // 모달 UX(탈출구/포커스/ESC/집중도)를 보강합니다.
    var $modalContainer = $("#modalContainer");
    if ($modalContainer.length) {
        var $openModal = $("#openModal");
        var $closeModal = $("#closeModal");
        var $modalContent = $("#modalContent");

        var lastFocusedEl = null;

        function getFocusableElements($scope) {
            // 접근 가능한 포커스 후보만 모읍니다.
            return $scope
                .find(
                    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
                )
                .filter(":visible");
        }

        function trapFocus(e) {
            if (e.keyCode !== 9) return; // Tab only
            var $focusables = getFocusableElements($modalContent);
            if (!$focusables.length) {
                e.preventDefault();
                return;
            }

            var first = $focusables.first()[0];
            var last = $focusables.last()[0];
            var current = document.activeElement;

            if (e.shiftKey) {
                // Shift + Tab: 첫 요소에서 마지막으로
                if (current === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                // Tab: 마지막 요소에서 첫 요소로
                if (current === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }

        function openModal() {
            if (!$modalContainer.hasClass("hidden")) return;

            lastFocusedEl = document.activeElement;

            // 백그라운드 스크롤 비활성화(집중도/UX 향상)
            $("body").data("modal_scrollY", $(window).scrollTop());
            $("body").data("modal_prevOverflow", $("body").css("overflow"));
            $("body").css("overflow", "hidden");

            $modalContainer.removeClass("hidden").attr("aria-hidden", "false");
            setTimeout(function () {
                // 닫기 버튼으로 포커스 이동(포커스 기준점 명확화)
                $closeModal.trigger("focus");
            }, 0);
        }

        function closeModal() {
            if ($modalContainer.hasClass("hidden")) return;

            $modalContainer.addClass("hidden").attr("aria-hidden", "true");

            // 스크롤 복구
            $("body").css("overflow", $("body").data("modal_prevOverflow") || "");
            var y = $("body").data("modal_scrollY");
            if (typeof y === "number") {
                window.scrollTo(0, y);
            }

            // 포커스 원복(사용자 흐름 유지)
            if (lastFocusedEl && $(lastFocusedEl).length) {
                $(lastFocusedEl).trigger("focus");
            }
            lastFocusedEl = null;
        }

        $openModal.on("click", function () {
            openModal();
        });

        $closeModal.on("click", function () {
            closeModal();
        });

        // 배경(스크림)을 클릭하면 닫기
        $modalContainer.on("click", function (e) {
            if (e.target === this) {
                closeModal();
            }
        });

        // 키보드 탈출구(ESC) + 포커스 트랩(Tab)
        $(document).on("keydown.modal", function (e) {
            if ($modalContainer.hasClass("hidden")) return;

            if (e.key === "Escape" || e.keyCode === 27) {
                e.preventDefault();
                closeModal();
                return;
            }

            if (e.keyCode === 9) {
                trapFocus(e);
            }
        });
    }

    function isPopupHiddenToday() {
        var savedDate = localStorage.getItem("popupHiddenDate");
        if (!savedDate) return false;
        var today = new Date().toISOString().slice(0, 10);
        return savedDate === today;
    }

    function openPopupWindow() {
        if (isPopupHiddenToday()) {
            alert("오늘 하루 보지 않기가 설정되어 있습니다.");
            return;
        }

        var width = 500;
        var height = 640;
        var left = Math.max(0, Math.floor((window.screen.width - width) / 2));
        var top = Math.max(0, Math.floor((window.screen.height - height) / 2));
        var options = [
            "width=" + width,
            "height=" + height,
            "top=" + top,
            "left=" + left,
            "scrollbars=yes",
            "resizable=yes"
        ].join(",");

        window.open("./popup-notice.html", "popupStudyWindow", options);
    }

    $("#btnPopup").on("click", function () {
        openPopupWindow();
    });

    var $customAlert = $("#customAlert");
    if ($customAlert.length) {
        function closeCustomAlert() {
            $customAlert.addClass("hidden");
        }

        $("#openBasicAlert").on("click", function () {
            window.alert("나는 기본 얼럿창 입니다!");
        });

        $("#openCustomAlert").on("click", function () {
            $customAlert.removeClass("hidden");
        });

        $("#closeCustomAlert, #cancelCustomAlert").on("click", function () {
            closeCustomAlert();
        });

        $("#confirmCustomAlert").on("click", function () {
            closeCustomAlert();
            window.alert("삭제가 진행되었습니다.");
        });

        $customAlert.on("click", function (e) {
            if (e.target === this) {
                closeCustomAlert();
            }
        });
    }

    var toastTimer = null;
    $("#showToast").on("click", function () {
        var $toast = $(".toast-message");
        if (!$toast.length) return;

        $toast.stop(true, true).fadeIn(400);

        if (toastTimer) {
            clearTimeout(toastTimer);
        }
        toastTimer = setTimeout(function () {
            $toast.fadeOut(400);
        }, 3000);
    });

    var $paginationDemo = $(".pagination-demo");
    if ($paginationDemo.length) {
        var $pageItems = $paginationDemo.find(".page-item[data-page]");
        var maxPage = $pageItems.length;
        var currentPage = Number($paginationDemo.find(".page-item.active").data("page")) || 1;

        function setPage(page) {
            if (page < 1) page = 1;
            if (page > maxPage) page = maxPage;
            currentPage = page;

            $paginationDemo.find(".page-item").removeClass("active");
            $paginationDemo.find('.page-item[data-page="' + page + '"]').addClass("active");
            console.log(page + "페이지로 이동합니다.");
        }

        $paginationDemo.find(".page-link").on("click", function (e) {
            e.preventDefault();
            var $link = $(this);

            if ($link.hasClass("first")) {
                setPage(1);
                return;
            }
            if ($link.hasClass("last")) {
                setPage(maxPage);
                return;
            }
            if ($link.hasClass("prev")) {
                setPage(currentPage - 1);
                return;
            }
            if ($link.hasClass("next")) {
                setPage(currentPage + 1);
                return;
            }

            var pageNum = Number($link.closest(".page-item").data("page"));
            if (pageNum) {
                setPage(pageNum);
            }
        });
    }

    var $dropdownDemo = $(".dropdown-demo");
    if ($dropdownDemo.length) {
        $dropdownDemo.find(".dropdown-toggle").on("click", function (e) {
            e.preventDefault();
            $dropdownDemo.toggleClass("active");
        });

        $dropdownDemo.find(".dropdown-menu li a").on("click", function (e) {
            e.preventDefault();
            var selectedText = $(this).text();
            $dropdownDemo
                .find(".dropdown-toggle")
                .html(selectedText + ' <span class="arrow">▼</span>');
            $dropdownDemo.removeClass("active");
            console.log("선택된 지역: " + selectedText);
        });

        $(document).on("click.dropdown", function (e) {
            if (!$(e.target).closest(".dropdown-demo").length) {
                $dropdownDemo.removeClass("active");
            }
        });
    }

    var $carouselDemo = $(".carousel-demo");
    if ($carouselDemo.length) {
        var $track = $carouselDemo.find(".carousel-track");
        var $slides = $carouselDemo.find(".slide-item");
        var $dots = $carouselDemo.find(".carousel-dot");
        var currentIndex = 0;
        var lastIndex = $slides.length - 1;

        function moveSlide() {
            var offsetPercent = -(currentIndex * 100);
            $track.css("transform", "translateX(" + offsetPercent + "%)");
            $dots.removeClass("is-active");
            $dots.eq(currentIndex).addClass("is-active");
        }

        $carouselDemo.find(".btn-next").on("click", function () {
            if (currentIndex < lastIndex) {
                currentIndex++;
                moveSlide();
            }
        });

        $carouselDemo.find(".btn-prev").on("click", function () {
            if (currentIndex > 0) {
                currentIndex--;
                moveSlide();
            }
        });

        $dots.on("click", function () {
            var idx = Number($(this).data("index"));
            if (!Number.isNaN(idx)) {
                currentIndex = idx;
                moveSlide();
            }
        });
    }

    var $lightboxOverlay = $("#lightboxOverlay");
    if ($lightboxOverlay.length) {
        var $triggers = $(".lightbox-trigger");
        var currentLightboxIndex = 0;

        function renderLightboxByIndex(index) {
            if (index < 0) index = $triggers.length - 1;
            if (index >= $triggers.length) index = 0;
            currentLightboxIndex = index;

            var $target = $triggers.eq(index);
            var fullImageUrl = $target.attr("data-full");
            var altText = $target.attr("alt") || "확대 이미지";

            $("#lightboxImage").attr("src", fullImageUrl).attr("alt", altText);
            $("#caption").text(altText);
            $("#lightboxCounter").text((index + 1) + " / " + $triggers.length);
        }

        function openLightbox(index) {
            renderLightboxByIndex(index);
            $lightboxOverlay.removeClass("hidden");
        }

        function closeLightbox() {
            $lightboxOverlay.addClass("hidden");
        }

        $triggers.on("click", function () {
            var idx = Number($(this).attr("data-index"));
            openLightbox(Number.isNaN(idx) ? 0 : idx);
        });

        $(".lightbox-prev").on("click", function (e) {
            e.stopPropagation();
            renderLightboxByIndex(currentLightboxIndex - 1);
        });

        $(".lightbox-next").on("click", function (e) {
            e.stopPropagation();
            renderLightboxByIndex(currentLightboxIndex + 1);
        });

        $("#lightboxOverlay, .close-btn").on("click", function (e) {
            if (e.target !== this && !$(e.target).hasClass("close-btn")) return;
            closeLightbox();
        });

        $(document).on("keydown.lightbox", function (e) {
            if ($lightboxOverlay.hasClass("hidden")) return;
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") renderLightboxByIndex(currentLightboxIndex - 1);
            if (e.key === "ArrowRight") renderLightboxByIndex(currentLightboxIndex + 1);
        });
    }
});
