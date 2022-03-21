let _start = 1;
let _searchWord;
function loadNews(pstart, psearchWord) {
  //console.log("ffff", psearchWord);
  const sendData = {
    start: pstart,
    searchWord: psearchWord,
  };
  $.ajax({
    url: "/naver/news",
    data: sendData,
    method: "GET",
    success: function (res) {
      console.log(res);
      const newsList = res;
      let output = "";
      $.each(newsList, function (idx, item) {
        output += `
        <li>
          <a href="${item.link}" target="_blank">
            <h2 class="title">${item.title}</h2>
            <p class="desc">${item.description}</p>
            <p class="date">${item.pubDate}</p>
          </a>
        </li>
      `;
      });
      $(".contents ul").append(output);
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
  $(".contents ul").html("");
  _start = 1;
  _searchWord = $("#searchWord").val();
  loadNews(_start, _searchWord);
});
$("#searchWord").on("keyup", function (e) {
  if (e.keyCode === 13) {
    // $(".contents ul").html("");
    // _start = 1;
    // _searchWord = $("#searchWord").val();
    // loadNews(_start, _searchWord);
    checkSearchWord();
    $("#searchButton").trigger("click");
  }
});

$(".more").on("click", function () {
  console.log("more");
  _start += 10;
  loadNews(_start, _searchWord);
});

$(window).on("scroll", function () {
  //console.log("scrollTop===", $(window).scrollTop());
  // console.log("window===", $(window).height());
  //console.log("document===", $(document).height());
  if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
    _start += 10;
    loadNews(_start, _searchWord);
  }
});

loadNews(_start, _searchWord);
