$.ajax({
    url: "/daum/news",
    method: "GET",
    success: function (res) {
        let output = "";
        const newsList = res;
        $.each(newsList, (idx, item) => {
            output += `
                <li>
                    <a href="${item.url}" target="_blank">
                        <p>${item.news}</p>
                        <img src="${item.img}">
                    </a>
                </li>
            `;
        });
        $(".newsList").html(output);
    },
});
