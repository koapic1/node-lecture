const socket = io();
console.log(socket);
//emit()을 통해서 이벤트 보낼 수 있음
//socket.emit("chatting", { name: "장성호", msg: "안녕" });
socket.on("chatting", (data) => {
    //console.log(data);
    const { name, msg, time } = data; // 구조 분해 할당 {}
    const attachClass = name === $("#nickName").val() ? "me" : "other";
    const img = name === $("#nickName").val() ? "man" : "woman";
    /*
  $(".chattingBox .list").append(
    `
    <li class="${attachClass}">
      <div class="profile">
        <img src="../images/${img}.png" alt="" />
        <span class="nickName">${data.name}</span>
      </div>
      <div class="msgBox">
        <div class="msg">${data.msg}</div>
        <span class="time">${data.time}</span>
      </div>
    </li>
    `
  );
  */
    $(".chattingBox .list").append(
        `
    <li class="${attachClass}">
      <div class="profile">
        <img src="../images/${img}.png" alt="" />
        <span class="nickName">${name}</span>
      </div>
      <div class="msgBox">
        <div class="msg">${msg}</div>
        <span class="time">${time}</span>
      </div>
    </li>
    `
    );

    $(".chattingBox").scrollTop($(".chattingBox .list").height());
    //console.log($(".chattingBox .list").height());
});

function sendMsg() {
    const chattingItem = { name: $("#nickName").val(), msg: $("#msg").val() };
    socket.emit("chatting", chattingItem);
    $("#msg").val("");
    $("#msg").focus();
    $(".btnSend").removeClass("on");
    console.log("send");
}

$(".btnSend").on("click", function (e) {
    //socket.emit("chatting", { name: "버튼 클릭 장성호", msg: " 버튼 클릭 안녕" });
    //조건 걸어서...
    //버튼 비활성화 / 엔터 쳐도 넘어가게....
    sendMsg();
});

// special thanks jjang hyuck
$("#msg").on("keydown", function (e) {
    if (($(this).val().trim() === "" || null) && e.keyCode === 13) {
        e.preventDefault();
    }
});
$("#msg").on("keyup", function (e) {
    if ($("#msg").val() !== "") {
        $(".btnSend").addClass("on");
    }
    if (e.keyCode === 13) {
        if ($("#msg").val().trim() === "" || null) {
            e.preventDefault();
            $("#msg").val("");
            $(".btnSend").removeClass("on");
            return;
        } else {
            sendMsg();
        }
    }
});

/*
function send() {
  const chattingItem = { name: $("#nickname").val(), msg: $("#msg").val() };
  socket.emit("chatting", chattingItem);
  $(".sendBox button").removeClass("on");
  $("#msg").val("");
  $("#msg").focus();
}

$(".btnSend").on("click", () => {
  //socket.emit("chatting", { name: $("#nickname").val(), msg: $("#msg").val() });
  send();
});

$("#msg").on("keydown", function (e) {
  if (e.keyCode === 13) {
    if ($(this).val().trim() === "" || null) {
      $(this).val("");
      return;
    }
    //send();
  }
});
*/
