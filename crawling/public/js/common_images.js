let _start = 1;
let _searchWord;
let total = 0;
let itemNum = 0;
let grid = null;
function loadNews(pstart, psearchWord) {
  //console.log("ffff", psearchWord);
  const sendData = {
    start: pstart,
    searchWord: psearchWord,
  };
  $.ajax({
    url: "/naver/images",
    data: sendData,
    method: "GET",
    success: function (res) {
      itemNum++;
      console.log(res);
      const newsList = res.items;
      let output = "";
      total = res.total;
      $.each(newsList, function (idx, item) {
        //console.log("img===", item.image);
        // let img = item.image;
        // if (item.image === "" || item.image === null) {
        //   img = "../images/not-found.png";
        // }
        const img = item.thumbnail === "" || item.thumbnail === null ? "../images/not-found.png" : item.thumbnail;
        output += `
        <li class="item item${itemNum}">
          <a href="${item.link}" data-fancybox="item${itemNum}" data-caption="${item.title}">
            <div class="img"><img src="${img}"></div>
            <div class="info">
              <h2 class="title">${item.title}</h2>
            </div>
          </a>
        </li>
      `;
      });
      $(".contents ul").append(output);
      const addedItem = $(".imgList .item" + itemNum);
      if (grid !== null) {
        grid.append(addedItem).isotope("appended", addedItem);
      }
      $(".imgList").imagesLoaded(function () {
        grid = $(".imgList").isotope({
          // options
          itemSelector: ".item",
          layoutMode: "masonry",
        });
      });
    },
  });
}

function checkSearchWord() {
  if ($("#searchWord").val().trim() === "") {
    alert("뉴스 검색어를 입력해 주세요.");
    $("#searchWord").val("");
    return;
  }
}

$("#searchButton").on("click", function () {
  checkSearchWord();
  grid.isotope("destroy"); // destroy
  $(".contents ul").html("");
  _start = 1;
  itemNum = 0;
  _searchWord = $("#searchWord").val();
  loadNews(_start, _searchWord);
});
$("#searchWord").on("keyup", function (e) {
  if (e.keyCode === 13) {
    // $(".contents ul").html("");
    // _start = 1;
    // _searchWord = $("#searchWord").val();
    // loadNews(_start, _searchWord);
    //checkSearchWord();
    $("#searchButton").trigger("click");
  }
});

$(".more").on("click", function () {
  if (total < 10) return;
  _start += 10;
  loadNews(_start, _searchWord);
});

$(window).on("scroll", function () {
  //console.log("scrollTop===", $(window).scrollTop());
  // console.log("window===", $(window).height());
  //console.log("document===", $(document).height());
  if (total < 10) return;
  if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
    _start += 10;
    loadNews(_start, _searchWord);
  }
});

loadNews(_start, _searchWord);
