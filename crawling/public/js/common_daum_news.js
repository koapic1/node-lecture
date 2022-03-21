$.ajax({
  url: "/daum/news",
  method: "GET",
  success: function (res) {
    let output = "";
    const newsList = res;
    $.each(newsList, (idx, item) => {
      output += `
        <li>
          <div class="txtBox">
            <div class="company">
              <img src="${item.company}">
              <span class="category">${item.category}</span> 
            </div>
            <a href="${item.url}" target="_blank">
              <h2>${item.news}</h2>
            </a>
          </div>
          <div class="img">
            <a href="${item.url}" target="_blank">
              <img  src="${item.img}">
            </a>
          </div>
        </li>
      `;
    });
    $(".newsList").html(output);
  },
});
