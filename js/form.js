$(document).ready(function() {
    $('#submit-form').click(function(e) {
        var ggFrm = $("#test-form");
        var name = ggFrm.find("#name").val();
        var location = ggFrm.find("#location").val();
        var wishes = ggFrm.find("#wishes").val();
        e.preventDefault();
        $.ajax({
            type: "GET",
            dataType: 'json',
            url: "https://script.google.com/macros/s/AKfycbwMJrYeTNmCkCOTPy0FarTyGP-gkTypYGiSFuaP2n_Ytl6rqBx6/exec",
            data: {
                name: name,
                local: location,
                wishes: wishes
            },
            success: function (data) 
          {
         if (data == 'false')
          {
                     alert('Thêm không thành công, bạn cũng có thể sử dụng để hiển thị Popup hoặc điều hướng');
           } else {
                     alert('Chúng tớ rất cảm ơn bạn đã điền form. Hẹn bạn ở ngày vui của chúng tớ nhé!💌');
           }
       }
   });
   return false;
  });
});