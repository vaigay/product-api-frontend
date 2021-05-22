$(document).ready(function () {

    loadUser();
    loadBill();
   

    function loadUser() {
        var id = localStorage.getItem('id_bill');
        $.ajax({
            url: "http://localhost:8080/admin/userBill/" + id,
            method: 'GET',
            dataType: 'json',
            headers: {
                "Authorization": localStorage.getItem('token')
            },
            success: function (data) {
                console.log(data);
                $('#username').text(data.username);
                $("#name").text(data.name);
                $('#phoneNumber').text(data.phoneNumber);
                console.log(data.username);
                console.log(data.name);
                console.log(data.phoneNumber);
            }
        });
    };

    function loadBill() {
        var id = localStorage.getItem('id_bill');
        $.ajax({
            url: "http://localhost:8080/admin/bill/" + id,
            method: 'GET',
            dataType: 'json',
            headers: {
                "Authorization": localStorage.getItem('token')
            },
            success: function (data) {
                $.each(data.listProductHasSoldDTOs, function (key, value) {
                    addRowToTable(value);
                });
                var x = data.totalProductAmount.toLocaleString('en-US', {style : 'currency', currency : 'VND'});
                var total = '<tr class="total"><td></td><td></td>';
                total += '<td>Total: ';
                total += x;
                total += '</td>';
                $("#listProduct").append(total);
            }
        });
    };

    function billsAdd(product) {
        console.log("123123123123123123123")
        var row = "";
        row += '<tr class="item">';
        row += '<td>' + product.name+ '</td>';
        row += '<td>' + product.quantity + '</td>';
        row += '<td>' + product.price.toLocaleString('en-US', {style : 'currency', currency : 'VND'}) + '</td>';

        return row;
    }

    function addRowToTable(product) {
        var row = billsAdd(product);
        $("#listProduct").append(row);

    }

    // $(document).on('click', '.bill_detail', function () {
    //     id  = $(this).attr("value");
    //     localStorage.setItem("id_bill",$(this).attr("value"));
    //     window.location.href = "billDetail.html";
    // });

    
});