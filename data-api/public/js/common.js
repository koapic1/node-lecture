//alert("Hello Node");
$("#cities").on("change", function () {
    console.log($(this).val());
    const sendData = {
        city: $(this).val(),
    };
    $.ajax({
        url: "/air",
        method: "GET",
        dataType: "json",
        data: sendData,
        success: function (res) {
            console.log(res.items);
            const itemList = res.items;
            let output = "";
            $.each(itemList, function (idx, item) {
                if (item.pm10Value < 30) {
                    output += `
                        <li>
                            <h2>${item.stationName}</h2>
                            <div class = "info">
                                <dl>
                                    <dt>미세먼지</dt>
                                    <dd>${item.pm10Value}</dd>
                                </dl>
                                <dl>
                                    <dt>초미세먼지</dt>
                                    <dd>${item.pm25Value}</dd>
                                </dl>
                                <p class = "emoji">&#129392;</p>
                            </div>
                        </li>
                    `;
                } else if (item.pm10Value < 80) {
                    output += `
                        <li>
                            <h2>${item.stationName}</h2>
                            <div class = "info">
                                <dl>
                                    <dt>미세먼지</dt>
                                    <dd>${item.pm10Value}</dd>
                                </dl>
                                <dl>
                                    <dt>초미세먼지</dt>
                                    <dd>${item.pm25Value}</dd>
                                </dl>
                                <p class = "emoji">&#128522;</p>
                            </div>
                        </li>
                    `;
                } else if (item.pm10Value < 150) {
                    output += `
                        <li>
                            <h2>${item.stationName}</h2>
                            <div class = "info">
                                <dl>
                                    <dt>미세먼지</dt>
                                    <dd>${item.pm10Value}</dd>
                                </dl>
                                <dl>
                                    <dt>초미세먼지</dt>
                                    <dd>${item.pm25Value}</dd>
                                </dl>
                                <p class = "emoji">&#128546;</p>
                            </div>
                        </li>
                    `;
                } else {
                    output += `
                        <li>
                            <h2>${item.stationName}</h2>
                            <div class = "info">
                                <dl>
                                    <dt>미세먼지</dt>
                                    <dd>${item.pm10Value}</dd>
                                </dl>
                                <dl>
                                    <dt>초미세먼지</dt>
                                    <dd>${item.pm25Value}</dd>
                                </dl>
                                <p class = "emoji">&#128557;</p>
                            </div>
                        </li>
                    `;
                }
            });
            $(".contents ul").html(output);
            gsap.from(".contents ul li", { opacity: 0, stagger: 0.1, duration: 0.2 });
        },
    });
});
