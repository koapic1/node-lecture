$.ajax({
    url: "/gmarket/superdeal",
    method: "GET",
    success: function (res) {
        let output = "";
        const productList = res;
        $.each(productList, (idx, item) => {
            output += `
        <li>
            <div class="thumb">
            <a href="${item.url}"><img src="${item.thumb}"></a>
            </div>
            <div class="info">
            <h2>${item.title}</h2>
            <div class="priceBox">
                <span class="sale">${item.sale}%</span>
                <span class="price"><strong>${item.price}</strong>원</span>
                <span class="discount">${item.discount}원</span>
            </div>
            <div class="buy">
                <span class="num">${item.buy}</span>
                <span>구매</span>
            </div>
            </div>
        </li>
        `;
        });
        $(".productList").html(output);
    },
});
